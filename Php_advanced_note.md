
debug_backtrace			回溯跟踪函数的调用信息
debug_print_backtrace	与之不同的是它会直接打印回溯信息。


php gearman
https://www.cnblogs.com/jkko123/p/6493282.html

PHP的新特性
	php7
	运算符
		$a <=> $b 			当$a小于、等于、大于than $b时 分别返回一个小于、等于、大于0的integer 值。 PHP7开始提供.
		$a ?? $b ?? $c 		从左往右第一个存在且不为 NULL 的操作数。如果都没有定义且不为 NULL，则返回 NULL。PHP7开始提供。

	强制限制入参类型,以及返回值类型
		function a(int ...$ints){return $ints;}

	可以强制指定返回值类型 		//如果类型不匹配将会返回异常
		function a() : array{return [];}

	类型声明有2种模式,强制模式(默认)和严格模式
		严格模式: 使用Declare(Strict_types=1);声明

	优化命名空间引用
		// php5
    	use a\b\c\d;
    	use a\b\c\e;
    	use a\b\c\f;
    	// php7
    	use a\b\c\{d,e,f};


	php5.5
	finally关键字
		这个和java中的finally一样，经典的try ... catch ... finally 三段式异常处理

	foreach 支持list()
		foreach ($array as list($a, $b)) {echo "A: $a; B: $b\n";}

	empty() 支持自定义函数了
		empty(foo())

	非变量array和string也能支持下标获取了
		echo array(1, 2, 3)[0];
		echo [1, 2, 3][0];
		echo "foobar"[2];

	类名通过::class可以获取
		class ClassName {}
 		echo ClassName::class;

 	增加了opcache扩展
 		使用opcache会提高php的性能，你可以和其他扩展一样静态编译（--enable-opcache）或者动态扩展（zend_extension）加入这个优化项



Iterator


php的APC特性

把所有不是.php的请求都分配给CDN (内容分发网络)

切勿将PHP代码里的链接指向其它的服务器

使用 Varnish

使用更大的服务器实例


企业自由数据中心  vpc专有网络 阿里云公网



php命令行


依赖注入 DI
 aClass->bClass->cClass
a b c 都依赖与 注入容器
 a可以不用直接依赖与b的实体 到a需要用到b的实体的时候 由b把a的实例直接注入进来
 把依赖的关系翻转过来了  所以这个叫 控制翻转(Ioc)

 好处
  解耦





php 模拟 tail -f
	$handle = popen("tail -f /var/log/nginx/access.log 2>&1", 'r');
	     while(!feof($handle)) {
	     $buffer = fgets($handle);
	     echo "$buffer\n";
	     flush();
	}
	pclose($handle);


Facebook
Xdebug
	1 IDE（比如 PhpStorm ，下文所述的客户端）中已经集成了一个遵循 BGDp 的 Xdebug 插件。当要 debug 的时候，点击一些 IDE 的某个按钮，启动这个插件。该插件会启动一个 9000 的端口监听远程服务器发过来的 debug 信息
		phpstorm 中，开启 / 关闭的位置为：工具栏 > Run > Start / Stop Listening for PHP Xdebug Connetions
	2 浏览器向 Httpd 服务器发送一个带有 XDEBUG_SESSION_START 参数的请求, 服务器收到这个请求之后交给后端的PHP (已开启xdebug模块) 进程处理
	3 Php 看到这个请求是带了 XDEBUG_SESSION_START 参数，就告诉 Xdebug，“嘿，我要debug喔，你准备一下”。这时，Xdebug 会向来源 ip 客户端的9000端口（默认是 9000 端口）发送一个debug请求，然后客户端的 9000 端口响应这个请求，那么 debug 就开始了
		这里通知客户端其实有两种方式，根据 xdebug 的配置 xdebug.remote_connect_back = 0 | 1
		第一种，静态绑定客户端 host#
			xdebug.remote_connect_back = 0 ，也是 xdebug 的默认方式，这种情况下，xdebug 在收到调试通知时会读取配置 xdebug.remote_host 和 xdebug.remote_port ，默认是 localhost:9000，然后向这个端口发送通知可以看到，remote_host 的 IP 是固定的，这种方式只适合单一客户端开发调试
		第二种，不绑定 IP，根据请求来源通知
			xdebug.remote_connect_back = 1，这种方式和上面基本相同，唯一不同的是，php 在 接受 http 请求后，xdebug 会将请求来源的 IP 绑定，并通知

	4 Php 知道 Xdebug 已经准备好了，那么就开始开始一行一行的执行代码，但是每执行一行都会让 Xdebug 过滤一下，Xdebug 在过滤每一行代码的时候，都会暂停代码的执行，然后向客户端的 9000 端口发送该行代码的执行情况，等待客户端的决策（是一句代码还是下一个断点待）
	5 相应，客户端（IDE）收到 Xdebug 发送过来的执行情况，就可以把这些信息展示给开发者看了，包括一些变量的值等。同时向 Xdebug 发送下一步应该什么

	配置
	# 必填项
	zend_extension=xdebug.so
	xdebug.remote_enable = 1
	xdebug.idekey = PHPSTORM （这个值是作为 XDEBUG_SESSION_START 的值，是通知 PHP 开启调试的标识）

	# 可选项
	xdebug.remote_connect_back = 1 （如原理篇介绍的，如果开启，将会忽视 remote_host 的配置，以请求来源的 IP 作为 xdebug 响应的 IP）
	xdebug.remote_log="/tmp/xdebug_php71.log" （记录日志）
	#xdebug.remote_autostart = 1 （如果开启，则无论什么请求都会进行调试响应）

	# 默认的 remote_host 和 remote_port 如果不做更改可以省略


xdebug.idekey=PHPSTORM
xdebug.remote_enable=1
xdebug.remote_host=localhost
xdebug.remote_port=10000
xdebug.profiler_enable=1
xdebug.profiler_output_dir="/var/log/Xdebug"

.在php7之前的foreach其实是复制出一个副本出来，然后进行循环的。这个时候我还是建议使用array_map(), array_walk(), array_filter()等函数来处理你的问题。


stream_socket_server
创建一个 socket，绑定服务器端口（bind），监听端口（listen），在PHP中用stream_socket_server一个函数就能完成上面3个步骤，当然也可以使用更底层的sockets扩展分别实现

stream_socket_accept
pcntl_fork
fread


workerman
	workerman 是一款纯PHP开发的开源高性能的PHP socket 服务器框架.

obchach

openresty.org

linux 2.6 epoll

检测
	是否开起扩展
		var_dump(extension_loaded('curl'));
	查看函数
		get_defined_function
	查看curl版本
		curl_version()


内存
	memory_limit=integer		设置脚本可以分配到的最大内存,以MB为单位.这可以防止失控的脚本独占服务器内存
	memory_get_usage([bool]) 	返回当前分配给你的 PHP 脚本的内存量, 单位是字节
		如果设置为 true, 获取系统分配的内存尺寸, 包括未使用的页. 如果未设置或者设置为 false, 仅仅报告实际使用的内存量
		Note: 不跟踪非 emalloc() 分配的内存


1. 使用 ip2long() 和 long2ip() 以整型(integer)方式储存IP地址到数据库，而非字符串方式。这将几乎减少一半的储存空间（char(15)15个字节，integer则是8个字节），而且也更容易计算某一IP地址是否在一个范围之内。同时也加速搜索和排序。

2. 应用checkdnsrr()检查域名是否存在，来验证email地址的一部分。这个checkdnsrr()内建函数可以通过相应的域名或者IP地址查询DNS记录。有PHP开发者利用这个函数编写了一个自定义函数，能验证email地址的一部分，点击查看。请注意，此函数在windows平台尚未实现！请用 PEAR 程序库的 Net_DNS 代替。

3. 如果你使用PHP 5 + MySQL 4.1 版本组合或其版本以上，得试试改进的 mysqli_* 函数，而不用 mysql_* 函数。mysqli_* 函数的一个优越的特点是可以使用 prepared 语句。如果你维护一个对数据库依赖性很大的网站，这个函数将大大提升数据库的查询速度。不信你可以看看这篇性能测试文章—MySQLi vs MySQL。最终结果是 mysqli_stmt > mysql_query > mysqli_query > mysqli_multi_query 。mysqli_stmt最佳。

4. 学会、爱用三元操作符( ternary operator )。也就是if/else条件语句的代替，用 “?:” 表示。

5. 不必重造车轮，先看看PEAR 程序库有没有人已经发明这个轮子了。

6. highlight_file()能格式化你的代码，美观漂亮。

7. 使用 error_reporting(0) 函数，阻止潜在的敏感错误信息显示给用户。最好的情况是能在服务器上配置php.ini文件，直接屏蔽错误报告的显示。但是如果使用虚拟主机就没那么幸运能够编辑修改php.ini文件了，得使用另外的方法：在php代码首行添加error_reporting(0); 语句。这样的好处是使得SQL查询语句和服务器的物理路径等这些敏感错误信息完全不显示给用户。

8. 大量字符串文本储存入数据库之前，使用 gzcompress() 和 gzuncompress() 进行压缩和解压缩的转换。这个内建函数使用gzip算法，对文本的压缩率达90％以上。当然，经过压缩就无法进行全文搜索了。

9. 在函数的参数传递中使用”引用传递”，可以返回多个值。有编程语言基础的程序员在其它语言就知道这个用法了；然而一些只会html语言的网页设计者就感到困惑了。答案就是使用 “&” 符号处理变量，并以引用传递而非按值传递。

10. 完全理解 “magic quotes”和SQL注入攻击的危险性。如果你从未听过SQL注入攻击[ SQL injection] ，你得花点时间了解一下了。



swoole
	PHP的异步, 并行, 高性能网络通信引擎, 使用纯C 语言编写


PHP 从诞生到现在已经有20多年历史，从Web时代兴起到移动互联网退潮，互联网领域各种编程语言和技术层出不穷， Node.js 、 GO 、 Python 不断地在挑战 PHP 的地位。这些技术的推动者非常热衷于唱衰 PHP ， PHP 语言的未来在哪里？PHP 程序员当如何应对未来的变革？
作为老牌的Web后端编程语言，PHP 在全球市场占有率非常高，仅次于 Java ，从各个招聘网站的数据上来看PHP 开发的职位非常多，薪资水平也非常不错。实际在中小企业、互联网创业公司PHP的市场地位是高于 Java 的。Java 在超大型企业、传统软件行业、金融领域优势更大。目前来看 Node.js、 GO 、 Python 、 Ruby 等语言还难以企及PHP和Java。

PHP 语言之所以能有今天的地位，得益于PHP语言设计者一直遵从实用主义，将技术的复杂性隐藏在底层。PHP 语言入门简单，容易掌握，程序健壮性好，不容易出现像 Java 、 C++ 等其他语言那样复杂的问题，如内存泄漏和 Crash ，跟踪调试相对轻松很多。PHP 官方提供的标准库非常强大，各种功能函数都能在官方的标准库中找到，包括MySQL、Memcache、Redis、GD图形库、CURL、XML、JSON等等，免除了开发者到处找库的烦恼。PHP 的文档非常棒，每个函数都有详细的说明和使用示例。第三方类库和工具、代码、项目也很丰富。开发者可以快速、高效地使用 PHP 编写开发各类软件。到目前为止市面上仍然没有出现比 PHP 更简单易用的编程语言。所以 PHP 的前景还是很广阔的，与其纠结于编程语言的选择，不如好好地深入学习使用 PHP 。
作为一个资深的 PHP 开发者，在技术上给各位 PHP 程序十点未来的建议，希望对大家有所帮助。

1. Composer
第一点就要提 Composer ，自从 Composer 出现后，PHP 的依赖管理可以变得非常简单。程序内依赖一些类库和框架，直接使用 Composer 引入即可，通过使用 composer update安装依赖的包。解决了过去加载外部库的各种难题。Composer 也有国内镜像，速度非常快。现在绝大部分PHP开源的项目都提供了 Composer 的支持，建议大家在项目中使用 Composer 来解决 PHP 代码包管理的问题，不要再使用下载源码、手工 include 的原始方法。

2. PHP7
PHP7 版本对 Zend 引擎做了大量修改，大幅提升了 PHP 语言的性能，使用 PHP7 可以使你的程序性能瞬间翻倍。即使是 WordPress 这样重量级的软件运行在 PHP7 都能有上千 QPS ，相当于一台服务器每天就能处理 8000 万次请求。使用 PHP7 ，做好 MySQL 优化，使用 Memcache 和 Redis 进行加速，这套技术架构完全可以应对相当大规模的系统。除了某些亿级用户的平台之外，一般规模的系统完全没有压力。

3. PSR
PSR 是 http://www.php-fig.org/ 组织制定的PHP语言开发规范，约定了很多方面的规则，如命名空间、类名、规范、编码风格标准、Autoload、公共接口等。现在已经成为PHP技术社区事实上的标准了。很多知名的 PHP 框架和类库都遵守了 PSR 规范。PHP 开发者应当学习掌握 PSR 规范，在开发程序时应当尽量遵循 PSR 规范。

4. Swoole   重新定义PHP
2017 年 PHP 还局限于做 Web 网站吗？No ，如果你还不知道 Swoole ，赶快去了解一下吧。Swoole 的口号是重新定义 PHP 语言，Swoole 是一个异步并行的通信引擎，作为 PHP 的扩展来运行。Node.js 的异步回调 Swoole 有，Go语言的协程 Swoole 也有，这完全颠覆了对 PHP 的认知。使用 Swoole PHP 可以实现常驻内存的 Server 程序，可以实现 TCP 、 UDP 异步网络通信的编程开发。过去PHP只能做一个 Web 网站，现在使用 Swoole 可以做 Java 、C++ 才能实现的通信服务，比如 WebSocket 即使通信、聊天、推送服务器、RPC 远程调用服务、网关、代{过}{滤}理、游戏服务器等。如果你想用 PHP 做点 Web 系统之外的东西，Swoole 是最好的选择。

5. Laravel
最近几年最火热的 PHP 框架，官网号称是为 Web 艺术家设计的框架，可见这套框架有多优雅。Laravel 提供的功能模块丰富，API 设计简洁，表达力强。而且它的社区非常活跃，代码贡献者众多，第三方的插件非常多，生态系统相当繁荣。 Laravel 底层使用了很多 symfony2 组件，通过 composer 实现了依赖管理。如果还在纠结使用什么PHP框架，不如选择 Laravel 。 Laravel 提供的命令行工具基于 symfony.console 实现，功能强大，集成了各种项目管理、自动生成代码的功能。

6. Phar
PHP5.3 之后支持了类似 Java 的 jar 包，名为 phar。用来将多个 PHP 文件打包为一个文件。这个特性使得 PHP 也可以像 Java 一样方便地实现应用程序打包和组件化。一个应用程序可以打成一个 Phar 包，直接放到
PHP-FPM 中运行。配合 Swoole ，可以在命令行下执行 php server.phar 一键启动服务器。PHP 的代码包可以用 Phar 打包成组件，放到 Swoole 的服务器容器中去加载执行。

7. C/C++/GO
任何技术有优点就有缺点，PHP 作为一门动态脚本语言，优点是开发方便效率高。缺点就是性能差。在密集运算的场景下比 C 、 C++ 相差几十倍甚至上百倍。另外 PHP 不可以直接操作底层，需要依赖扩展库来提供 API 实现。PHP 程序员可以学习一门静态编译语言作为补充实现动静互补，C/C++/Go 都是不错的选择。而且静态语言的编程体验与动态语言完全不同，学习过程可以让你得到更大的提升。
掌握 C/C++ 语言后，还可以阅读 PHP 、 Swoole 、 Nginx 、Redis 、 Linux内核 等开源软件的源码，了解其底层运行原理。
现在最新版本的Swoole提供了C++扩展模块的支持，封装了Zend API，用C++操作PHP变得很简单，可以用C++实现PHP扩展函数和类。

8. HTML5
作为 Web 前端新一代标准，HTML5 未来前景非常广阔，市场需求量非常大。从 PC 网站、B/S 企业软件、移动端网页、APP，这些领域都在拥抱 HTML5，掌握了 HTML5 才能在下一波互联网技术大潮中存活下来。

9. Vue.js
PHP 程序员除了写后台程序之外，还有很大一部分工作在展现层，和浏览器前端打交道。2017 年你还在用 jQuery 操作 DOM 实现界面渲染吗？已经完全 out 了。现在用 Vue.js 可以非常方便地实现数据和 DOM 元素的绑定。通过 Ajax 请求后台接口返回数据后，更新前端数据自动实现界面渲染。2017 年再不学 Vue 就晚了。
如果你不光要写 Web 程序，同时还希望兼顾 Android 、IOS 、PC 客户端等平台，React Native 是一个不错的选择。

10. 深度学习/人工智能
互联网的未来属于人工智能，如果你还不了解机器学习、深度学习、人工智能这些概念，那你需要尽快学习了解一下。现在互联网巨头们都在布局人工智能，包括 Google 、 Facebook 、微软、亚马逊 和国内的百度。虽然现在还处于科学研究的阶段，但未来互联网的各个领域都会应用到人工智能，包括自动驾驶、大数据分析、网络游戏、图像识别、语言处理等。当然现在普通的工程师可能还无法参与到人工智能产品中，但至少应该理解深度学习/人工智能的基本概念和原理。
