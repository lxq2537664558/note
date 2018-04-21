server{
    listen 80;
    server_name  my.com;
    root /var/www/; # 该项要修改为你准备存放相关网页的路径
    location / {
        index  index.php index.html index.htm;
         #如果请求既不是一个文件，也不是一个目录，则执行一下重写规则
         if (!-e $request_filename)
         {
            #地址作为将参数rewrite到index.php上。
            rewrite ^/(.*)$ /index.php/$1;
            #若是子目录则使用下面这句，将subdir改成目录名称即可。
            #rewrite ^/subdir/(.*)$ /subdir/index.php/$1;
         }
    }
    #proxy the php scripts to php-fpm
    location ~ \.php {
            include fastcgi_params;
            ##pathinfo支持start
            #定义变量 $path_info ，用于存放pathinfo信息
            set $path_info "";
            #定义变量 $real_script_name，用于存放真实地址
            set $real_script_name $fastcgi_script_name;
            #如果地址与引号内的正则表达式匹配
            if ($fastcgi_script_name ~ "^(.+?\.php)(/.+)$") {
                    #将文件地址赋值给变量 $real_script_name
                    set $real_script_name $1;
                    #将文件地址后的参数赋值给变量 $path_info
                    set $path_info $2;
            }
            #配置fastcgi的一些参数
            fastcgi_param SCRIPT_FILENAME $document_root$real_script_name;
            fastcgi_param SCRIPT_NAME $real_script_name;
            fastcgi_param PATH_INFO $path_info;
            ###pathinfo支持end
        fastcgi_intercept_errors on;
        fastcgi_pass   127.0.0.1:9000;
    }
}