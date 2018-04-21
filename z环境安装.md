CentOS6.5搭建LNMP  php5.4 
1：查看环境：
[root@10-4-14-168 html]# cat /etc/redhat-release
CentOS release 6.5 (Final)

2：关掉防火墙
[root@10-4-14-168 html]# chkconfig iptables off

3：配置CentOS 6.0 第三方yum源（CentOS默认的标准源里没有nginx软件包）
#wget http://www.atomicorp.com/installers/atomic
#sh ./atomic
#yum check-update

4：安装开发包和库文件　
#yum -y install ntp make openssl openssl-devel pcre pcre-devel libpng libpng-devel libjpeg-6b libjpeg-devel-6b freetype freetype-devel gd gd-devel zlib zlib-devel gcc gcc-c++ libXpm libXpm-devel ncurses ncurses-devel libmcrypt libmcrypt-devel libxml2 libxml2-devel imake autoconf automake screen sysstat compat-libstdc++-33 curl curl-devel

5：卸载已安装的apache、mysql、php
# yum remove httpd
# yum remove mysql
# yum remove php

6：安装nginx
# yum install nginx
# service nginx start
# chkconfig --levels 235 nginx on
//设2、3、5级别开机启动

7：安装mysql
# yum install mysql mysql-server mysql-devel
# service mysqld start
# chkconfig --levels 235 mysqld on

登陆MySQL删除空用户，修改root密码
mysql>select user,host,password from mysql.user;
mysql>drop user ''@localhost;
mysql>update mysql.user set password = PASSWORD('111111') where user='root';
mysql>flush privileges;
　　

8：安装php
# yum install php lighttpd-fastcgi php-cli php-mysql php-gd php-imap php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-mcrypt php-mssql php-snmp php-soap
//安装php和所需组件使PHP支持MySQL、FastCGI模式
# yum install php-tidy php-common php-devel php-fpm php-mysql
# service php-fpm start
# chkconfig --levels 235 php-fpm on

9：配置nginx支持php
# mv /etc/nginx/nginx.conf /etc/nginx/nginx.confbak
//将配置文件改为备份文件
 
# cp /etc/nginx/nginx.conf.default /etc/nginx/nginx.conf
//由于原配置文件要自己去写因此可以使用默认的配置文件作为配置文件
 
//修改nginx配置文件，添加fastcgi支持
# vi /etc/nginx/nginx.conf
index index.php index.html index.htm;
//加入index.php
 
location ~ \.php$ {
            root           /usr/share/nginx/html;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  /usr/share/nginx/html$fastcgi_script_name;
            include        fastcgi_params;
        }
//将以上代码注释去掉，并修改成nginx默认路径
　　
 
10：配置php
//编辑文件php.ini，在文件末尾添加cgi.fix_pathinfo = 1
//解析图片代码
[root@CentOS ~]# vi /etc/php.ini

11：重启nginx php-fpm
# service nginx restart
# service php-fpm restart

12：建立info.php文件
# vi /usr/share/nginx/html/info.php
<?php
   phpinfo();
?>


13：测试nginx是否解析php
本地浏览器输入：192.168.1.105/info.php
显示php界面  环境搭建成功



###阿里云 centOS 7.2 PHP7 LNMP配置
**[作者:thinkcmf.com](http://thinkcmf.com)**
经测试 腾讯云CentOS7.2 已成功

####更新系统软件
> yum update

####安装编译工具:
> yum install gcc automake autoconf libtool gcc-c++

####安装nginx

######1. 安装nginx源
> yum localinstall http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

######2. 安装nginx
> yum install nginx

######3. 启动nginx
> service nginx start

成功显示:Redirecting to /bin/systemctl start  nginx.service

######4. 访问http://你的ip/

如果成功安装会出来nginx默认的欢迎界面

####安装MySQL5.7.*
######1. 安装mysql源
> yum localinstall  http://dev.mysql.com/get/mysql57-community-release-el7-7.noarch.rpm

######2. 安装mysql
> yum install mysql-community-server

`确认一下mysql的版本，有时可能会提示mysql5.6`

######3. 安装mysql的开发包，以后会有用
> yum install mysql-community-devel

######4. 启动mysql
> service mysqld start

成功返回Redirecting to /bin/systemctl start  mysqld.service

######5. 查看mysql启动状态
> service mysqld status

出现pid证明启动成功

######6. 获取mysql默认生成的密码
> grep 'temporary password' /var/log/mysqld.log

2017-02-10T14:59:42.328736Z 1 [Note] A temporary password is generated for root@localhost: `s/giN9Vo>L9h`
`冒号后面的都是密码(没有空格)  复制就好`

######7. 换成自己的密码
> mysql -uroot -p
> Enter password:输入上面复制的密码

######8. 更换密码
> mysql>  ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';

`这个密码一定要足够复杂，不然会不让你改，提示密码不合法`

######9. 退出mysql;
> mysql> quit;

######10. 用新密码再登录，试一下新密码
> mysql -uroot -p
> Enter password:输入你的新密码

######11. 确认密码正确后，退出mysql;
> mysql> quit;

####编译安装php7.0.0
######1. 下载php7源码包
> cd /root & wget -O php7.tar.gz http://cn2.php.net/get/php-7.0.1.tar.gz/from/this/mirror

######2. 解压源码包
源码包的位置可以使用 `find / -name php7` 查找 并进入所在文件夹
> tar -xvf php7.tar.gz

######3. 打开解压好的包
> cd php-7.0.1

######4. 安装php依赖包


> yum install libxml2 libxml2-devel openssl openssl-devel bzip2 bzip2-devel libcurl libcurl-devel libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel gmp gmp-devel libmcrypt libmcrypt-devel readline readline-devel libxslt libxslt-devel

######5. 编译配置 
`(这一步可能我们会遇到很多configure error，我们一一解决，基本都是相关软件开发包没有安装导致)`

> ./configure \
--prefix=/usr/local/php \
--with-config-file-path=/etc/php \
--enable-fpm \
--enable-pcntl \
--with-fpm-user=nginx  \
--with-fpm-group=nginx \
--enable-inline-optimization \
--enable-debug \
--disable-rpath \
--enable-shared  \
--enable-soap \
--with-libxml-dir \
--with-xmlrpc \
--with-openssl \
--with-mhash \
--with-pcre-regex \
--with-sqlite3 \
--with-zlib \
--enable-bcmath \
--with-iconv \
--with-bz2 \
--enable-calendar \
--with-curl \
--with-cdb \
--enable-dom \
--enable-exif \
--enable-fileinfo \
--enable-filter \
--with-pcre-dir \
--enable-ftp \
--with-gd \
--with-openssl-dir \
--with-jpeg-dir \
--with-png-dir \
--with-zlib-dir  \
--with-freetype-dir \
--enable-gd-jis-conv \
--with-gettext \
--with-gmp \
--with-mhash \
--enable-json \
--enable-mbstring \
--enable-mbregex \
--enable-mbregex-backtrack \
--with-libmbfl \
--with-onig \
--enable-pdo \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--with-zlib-dir \
--with-pdo-sqlite \
--with-readline \
--enable-session \
--enable-shmop \
--enable-simplexml \
--enable-sockets  \
--enable-sysvmsg \
--enable-sysvsem \
--enable-sysvshm \
--enable-wddx \
--with-libxml-dir \
--with-xsl \
--enable-zip \
--enable-mysqlnd-compression-support \
--with-pear \
--enable-opcache



`如有有出现错误可查找一下 (没有发生过)`
```
configure error:

1. configure: error: xml2-config not found. Please check your libxml2 installation.
    解决：
    $ yum install libxml2 libxml2-devel

2. configure: error: Cannot find OpenSSL's <evp.h>
    解决：
    $ yum install openssl openssl-devel

3. configure: error: Please reinstall the BZip2 distribution
    解决：
    $ yum install bzip2 bzip2-devel

4. configure: error: Please reinstall the libcurl distribution - easy.h should be in <curl-dir>/include/curl/
    解决：
    $ yum install libcurl libcurl-devel

5. If configure fails try --with-webp-dir=<DIR> configure: error: jpeglib.h not found.
    解决：
    $ yum install libjpeg libjpeg-devel

6. If configure fails try --with-webp-dir=<DIR>
   checking for jpeg_read_header in -ljpeg... yes
   configure: error: png.h not found.
    解决：
    $ yum install libpng libpng-devel

7. If configure fails try --with-webp-dir=<DIR>
   checking for jpeg_read_header in -ljpeg... yes
   checking for png_write_image in -lpng... yes
   If configure fails try --with-xpm-dir=<DIR>
   configure: error: freetype-config not found.
    解决：
    $ yum install freetype freetype-devel

8. configure: error: Unable to locate gmp.h
    解决：
    $ yum install gmp gmp-devel

9. configure: error: mcrypt.h not found. Please reinstall libmcrypt.
    解决：
    $ yum install libmcrypt libmcrypt-devel

10. configure: error: Please reinstall readline - I cannot find readline.h
    解决：
    $ yum install readline readline-devel

11. configure: error: xslt-config not found. Please reinstall the libxslt >= 1.1.0 distribution
    解决：
    $ yum install libxslt libxslt-devel
```
######6. 编译与安装
> make && make install

这里要make好久，要耐心一下

######7. 添加 PHP 命令到环境变量
> vim /etc/profile

在末尾加入

    PATH=$PATH:/usr/local/php/bin
    export PATH

要使改动立即生效执行
> source /etc/profile

查看环境变量
> echo $PATH

查看php版本
> php -v

######8. 配置php-fpm

> cp php.ini-production /etc/php/php.ini

> cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf

> cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf

> cp sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm

> chmod +x /etc/init.d/php-fpm

######9.启动php-fpm
> /etc/init.d/php-fpm start

	配置nginx虚拟机,绑定域名
	1. 
		$ vim /etc/nginx/conf.d/php7.thinkcmf.com.conf
		这里可以把php7.thinkcmf.com.conf改成自己的域名
		把下面的内容复制到php7.thinkcmf.com.conf里
		server{
		    listen 80;
		    server_name  php7.thinkcmf.com;
		    root /var/www/html/php7.thinkcmf.com; # 该项要修改为你准备存放相关网页的路径
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
	2.重启nginx
		$ service nginx reload
	3.
		$ vim /var/www/html/php7.thinkcmf.com/index.php
		把下面的代码复制到这个文件 里
		<?php
			phpinfo();

	4.查看访问http://php7.thinkcmf.com

Ubuntu16.04
安装lnmp
	首先添加nginx_signing.key(必须，否则出错)
		wget http://nginx.org/keys/nginx_signing.key
		sudo apt-key add nginx_signing.key
	添加[Nginx](http://nginx.org/)官方提供的源
		echo "deb http://nginx.org/packages/ubuntu/ trusty nginx" >> /etc/apt/sources.list
		echo "deb-src http://nginx.org/packages/ubuntu/ trusty nginx" >> /etc/apt/sources.list
	更新源并安装Nginx
		sudo apt-get update
	安装nginx
		sudo apt-get install nginx
		sudo vi /etc/nginx/sites-available/default
			location ~ \.php$ {
				fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
				fastcgi_pass unix:/run/php/php7.0-fpm.sock;
				fastcgi_index index.php;
				include fastcgi_params;
			}
		启动
		service nginx start
	php
		安装
		sudo apt-get install php7.0-fpm php7.0-mysql php7.0-common php7.0-curl php7.0-cli php7.0-mcrypt php7.0-mbstring php7.0-dom
		配置
		sudo vim /etc/php/7.0/fpm/php.ini
			cgi.fix_pathinfo = 0;
			;报错
			error_reporting = E_ERROR
			display_errors = On

		安装gd库
		sudo apt-get install php-gd
	
	sudo systemctl restart php7.0-fpm nginx
	mysql
		安装
		apt-get -y install mysql-server mysql-client
		配置mysql
		mysql_secure_installation
			更改密码
			Change the password for root 		
			删除匿名用户
			Remove anonymous users?
			远程禁止root用户登录
			Disallow root login remotely? 
			删除测试数据库并访问他
			Remove test database and access to it? 
			现在重新加载特权表？
			Reload privilege tables now?

		mysql允许远程连接
			配置mysql文件
				/etc/mysql/my.cnf 						//老版本
				/etc/mysql/mysql.conf.d/mysqld.cnf 		//新版本
					bind-address = 127.0.0.1 			//允许登录mysql的host 注销
			设置权限
				连接mysql		mysql (hPup)  root登录	
				方法1
					2 use mysql
					3 update user set host='%' where user='root';
					4 select host,user from user;
				方法2
					grant all privileges on "." to 'root'@'%' identified by '密码';
			flush privileges;
			重启mysql


centOS 7.2
yum update

# 安装编译工具:
yum install gcc automake autoconf libtool gcc-c++

# 安装基础库
yum install gd zlib zlib-devel openssl openssl-devel libxml2 libxml2-devel libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libmcrypt libmcrypt-devel


安装nginx

	1安装nginx源
	$ yum localinstall http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

	2.安装nginx
	$ yum install nginx

	3.启动nginx
	$ service nginx start

	Redirecting to /bin/systemctl start  nginx.service

	4.访问http://你的ip/

	如果成功安装会出来nginx默认的欢迎界面

安装MySQL5.7.*

	1.安装mysql源</str></str>
	$ yum localinstall  http://dev.mysql.com/get/mysql57-community-release-el7-7.noarch.rpm
	
	2.安装mysql
	$ yum install mysql-community-server
	
	确认一下mysql的版本，有时可能会提示mysql5.6

	3.安装mysql的开发包，以后会有用
	$ yum install mysql-community-devel

	4.启动mysql
	$ service mysqld start
	
	Redirecting to /bin/systemctl start  mysqld.service

	5.查看mysql启动状态
	$ service mysqld status
	出现pid
	证明启动成功

	6.获取mysql默认生成的密码
	$ grep 'temporary password' /var/log/mysqld.log
		2015-12-05T05:41:09.104758Z 1 [Note] A temporary password is generated for root@localhost: %G1Rgns!dD!v</str></str>
		加粗的就是生成的密码

	7.换成自己的密码
	$ mysql -uroot -p
	Enter password:输入上面的密码

	成功输入后进入一下步，这里你估计会输入 好几次才进去

	8. 更换密码
	mysql>  ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
	这个密码一定要足够复杂，不然会不让你改，提示密码不合法;

	9.退出mysql;
	mysql> quit;
	
	10.用新密码再登录，试一下新密码
	$ mysql -uroot -p
	
	Enter password:输入你的新密码

	11.确认密码正确后，退出mysql;
	mysql> quit;

# 安装mysql
yum install mysql mysql-server

#编译nginx
cd /usr/local/src

wget http://nginx.org/download/nginx-1.8.0.tar.gz
tar zxf nginx-1.8.0.tar.gz

cd nginx-1.8.0
./configure --prefix=/usr/local/nginx --with-pcre=/usr/local/src/pcre-8.37
make && make install

# 编译PHP
cd /usr/local/src
wget http://cn2.php.net/get/php-7.0.0.tar.bz2/from/this/mirror
mv mirror php-7.0.0.tar.bz2
tar jxf php-7.0.0.tar.bz2

cd php-7.0.0

./configure --prefix=/usr/local/php \
--with-gd \
--with-freetype-dir \
--enable-gd-native-ttf \
--enable-mysqlnd \
--with-pdo-mysql=mysqlnd \
--with-openssl \
--with-mcrypt \
--enable-mbstring \
--enable-zip \
--enable-fpm

make && make install

# 复制配置文件
cp /usr/local/src/php-7.0.0/php.ini-development /usr/local/php/lib/php.ini
cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf

# 整合nginx+php
location ~ \.php$ {
    root           html;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $DOCUMENT_ROOT$fastcgi_script_name;
    include        fastcgi_params;
}

# 启动php 和nginx
/usr/local/php/sbin/php-fpm
/usr/local/nginx/sbin/nginx
写测试PHP页面

<?php
# /usr/local/nginx/html/a.php
phpinfo();





fastestmirror
其大概意思是fastestmirror不能使用，fastestmirror是yum的一个加速插件，具体我也没有仔细了解过，可能是系统不支持或者缺少组建导致的。处理办法就是禁用这个插件，方法如下：
root@www.ctohome.com]# vi  /etc/yum/pluginconf.d/fastestmirror.conf   
  
[main]   
enabled=0  //把1改为0  
verbose=0  
socket_timeout=3  
hostfilepath=/var/cache/yum/timedhosts.txt   
maxhostfileage=10  
maxthreads=15  
#exclude=.gov, facebook
------------------------------------------------------------
修改以下配置文件
 #vi /etc/yum.conf

[main]
cachedir=/var/cache/yum/$basearch/$releasever
keepcache=0
debuglevel=2
logfile=/var/log/yum.log
exactarch=1
obsoletes=1
gpgcheck=1
plugins=1                 #将plugins的值修改为0
installonly_limit=5

epel 
yum install epel-release //扩展包更新包
yum update //更新yum源
yum search libmcrypt 查看下名字
在yum install 搜出的名字 安装就行了



windows

安装apache
	解压Apache压缩包到指定的位置
	管理员运行命令窗口 cmd.exe
	httpd -k install       //安装
	设置apache的配置文件
	Define SEVROOT "d:/wamp/Apache24"   //38行 设置apache文件夹所在路径
	开启 apache服务
	httpd -k start
	访问localhost 检查是否安装成功
安装php
	把下载好的php文件放在要安装的位置	

	php.ini-development 开发模式下的配置文件
	php.ini-production 生产模式下的配置文件
	将php.ini-development 重命名为php.ini 加载到apache的配置文件中	
	开启需要的扩展
		extension=php_bz2.dll
				  php_curl.dll
				  php_gd2.dll
				  php_mysql.dll
				  php_mysqli.dll
				  
	配置apache 把apache和php整合在一起
		#在这里添加几句话
			LoadModule php5_module "D:/wamp/php/php5apache2_4.dll"
		#这里说明在遇到.php文件时交给php处理
			<FilesMatch \.php$>
				SetHandler application/x-httpd-php
			</FilesMatch>
		#这里写清php路径
			PHPIniDir "D:/wamp/php/"
	php配置文件
		; 指定php扩展目录
		extension_dir = "D:/wamp/php/ext"
安装mysql
	运行mysql.mis文件进行安装
	custom为自定义
安装phpmyadmin
	把phpmyadmin移动到apache/htdocs
	在php.ini配置文件中开启扩展
		extension=php_mbstring.dll
		
	
	
配置apache
1 在apache中加载php模块 httpd.conf中加入
LoadModule php5_module d:/server/php/php5apache2_2.dll

2 在apache中指定将php文件交给php模块处理 httpd.conf中加入
AddType application/x-httpd-php .php


配置php：让php能够充当mysql的客户端去链接mysql服务器
php本身没有能力去操作mysql，需要借助外部扩展才可以。在php中，提供一套mysql的扩展，能够连接mysql服务器

php.ini-development 开发模式下的配置文件
php.ini-production 生产模式下的配置文件
将php.ini-development 重命名为php.ini 加载到apache的配置文件中
PHPIniDir d:/server/php

php.ini 开启对mysql的扩展
extension = php_mysql.dll

指定扩展文件所在的目录
extension_dir = d:/server/php/ext

php.ini开启GD库
extension=php_gd2.dll

bz2 curl  gettext mysqli pdo_mysql

修改php的时区
子php的配置文件中去修改。php.ini
date.timezone = PRC

用php独立执行php文件
php.exe -f 文件路径

file_uploads = On			php配置 是否支持文件上传
upload_tmp_dir =			文件上传到服务器后产生的临时文件路径,如果没有指定临时文件目录,那么使用系统的临时目录.一般会修改配置文件,指定临时目录
upload_max_filesize = 2M	允许上传单个文件的最大值
max_file_uploads = 20		一次上传文件允许的最大数目



