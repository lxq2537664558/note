// 随机数  0 补位
str_pad(mt_rand(0, 999999), 6, "0", STR_PAD_BOTH);

错误日志
1. error_reporting  =  E_ALL             ;将会向PHP报告发生的每个错误   
2. display_errors = Off                 ;显示错误  
3. log_errors = On                    ;开启错误日志   
4. log_errors_max_len = 1024               ;设置每个日志项的最大长度   
5. error_log = /var/php_errors.log            ;指定产生的 错误报告写入的日志文件位置


PHP合并数组 + 与 array_merge
1）键名为数字时，array_merge()不会覆盖掉原来的值，但＋合并数组则会把最先出现的值作为最终结果返回，而把后面的数组拥有相同键名的那些值“抛弃”掉（不是覆盖） 

2）键名为字符时，＋仍然把最先出现的值作为最终结果返回，而把后面的数组拥有相同键名的那些值“抛弃”掉，但array_merge()此时会覆盖掉前面相同键名的值 



get_object_vars

file_get_contents();

http_build_query();

var_export()  输出或返回一个变量的字符串表示
	您可以通过将函数的第二个参数设置为 TRUE，从而返回变量的表示。

serialize()
unserialize()

session_register()

set_error_handler()

forward_static_call()

spl_autoload_register()

get_called_class()

preg_replace_callback — 执行一个正则表达式搜索并且使用一个回调进行替换

is_callable — 检测参数是否为合法的可调用结构

function_exists — 如果给定的函数已经被定义就返回 TRUE

call_user_func — 把第一个参数作为回调函数调用
	> call_user_func(array($classname, 'say_hello'));
	> call_user_func($classname .'::say_hello'); // As of 5.2.3
	> call_user_func(array($myobject, 'say_hello'));
	> call_user_func(function($arg) { print "[$arg]\n"; }, 'test');

call_user_func_array — 调用回调函数，并把一个数组参数作为回调函数的参数
	> call_user_func_array(array($foo, "bar"), array("three", "four"));

get_loaded_extensions — 返回所有编译并加载模块名的 array
zend_extensions -- 只返回 Zend 扩展，并非类似 mysqli 的普通扩展。默认是 FALSE (返回普通扩展)。

set_error_handler — 设置一个用户定义的错误处理函数
error_reporting — 设置应该报告何种 PHP 错误
php.ini track_errors 如果开启，最后的一个错误将永远存在于变量
$php_errormsg 中

shell_exec — 通过 shell 环境执行命令，并且将完整的输出以字符串的方式返回

is_a — 如果对象属于该类或该类是此对象的父类则返回 TRUE
get_class — 返回对象的类名

php.ini include_path 文件默认路径  require, include, fopen(), file(), readfile() and file_get_contents()
set_include_path('')	设置路径
set_include_path(get_include_path() . PATH_SEPARATOR . '路径'); 把路径添加到了现有的 include_path 的尾部
PATH_SEPARATOR			路径分隔符

get_include_path()	获取路径
restore_include_path() - 还原 include_path 配置选项的值

pathinfo(path[,options])
	options
    	PATHINFO_DIRNAME  返回 dirname  	路径
        PATHINFO_BASENAME 返回 basename 	文件名
        PATHINFO_EXTENSION返回 extension	文件格式
DIRECTORY_SEPARATOR		目录分隔符


如果你需要得到脚本执行时的时间，$_SERVER['REQUSET_TIME']优于time();

ini_get('display_errors');获取配置参数，
ini_set('display_errors',0);设置配置参数

ini_get_all()获取所有配置信息

ini_restore()恢复配置信息到原始值

预定义常量
	PHP_INT_SIZE-int类型所占的字节数
	PHP_INT_MAX-int类型能表示的最大值




post_max_size


func_num_args()		返回传入的参数个数
func_get_args()		返回一个包含函数参数列表的数组
func_get_arg(int)	一次获得一个参数,该函数需要一希望访问的参数个数作为参数(参数从0开始)


| column | column |
|--------|--------|
|const						|定义常量|
|constant()					|返回一个常量值|
|static $i=0;				|定义静态变量|
|||
|unset()					|释放变量|
|define(name,value[,flag])	|定义常量|
|defined					|检查常量是否存在|
|get_defined_constants()	|返回已定义的常量数组|
|||
|var_export()				|输出或返回一个变量的字符串表示|
|eval($code)				|把字符串作为PHP代码执行|
|ini_get()					|获取配置文件信息|
|ini_set()					|设置php.ini|
|||
|error_reporting(E_ALL or 0)|设置应该报告何种PHP错误|
|version_compare(ver1,ver2[,operator])|对比两个 PHP规范化 的版本数字字符串 `operator`比较符	定义后返回true or false|
|||
|echo()						|把结果返回给浏览器|
|print_r()					|打印变量的信息|
|var_dump()					|把变量的类型及长度还有数据值都输出|
|&							|引用传递		在参数被传递一个函数的时候,函数不会再创建一个新变量,而是函数u获得一个原来变得引用.这个引用有一个变量名称,它以美元符号开始,可以像另一个变量哪样使用它.其区别在于他不是获得变量本身的值,而是志向原来的值.任何对该引用的修改都会影响到原始变量值.可以通过子啊函数定义的参数名前面加一个地址符(&)来指定参数的引用传递.在函数调用处不用修改.|

#####get_defined_vars()
	> 这个函数在代码调试时十分重要，它会返回一个包括所有已定义的变量的多维数组.
	> print_r(get_defined_vars());


`` `` ``						执行操作符是一对操作符,他是一对反向单引号(\`\`).反向引号不是一个单引号.
  ==PHP将试着将反向单引号之间的命令当做服务器端的命令来执行==


phpinfo()					查看php环境
crc32()			循环冗余算法

报错
启用了PHP配置文件中的track_errors特性,错误信息将会被保存在全局变量$php_errormsg中

parse error					解析错误
fatal error					致命错误
warning						警告
notice						提示
undefined					未定义
variable					变量
syntax						语法

数据类型的判断



in_array(当前,$arr)			判断当前元素是否在数组中
isset()						判断 不为null  变量是否存在
empty()						判断变量值是否为空或0


settype($i,'类型')			设置变量的类型
getenv()	获取一个环境变量的值


数学函数
abs					绝对值
floor				向下取整
round				四舍五入
ceil				进一取整
rand				随机数
mt_rand				随机数 比rand效率高
intval()			获取变量的整数值
floatval()			获取变量的浮点值
stringval()
number_format($num[,$n,'小数点','千位分隔符'])	金额格式化
uniqid()

字符串函数
字符串整理
trim($str[,'*'])	去除字符串两边的空白字符 或指定字符
chop()				删除字符串末端的空白字符 或指定字符
ltrim()				删除字符串开头的空白字符 或指定字符
字符串格式化
nl2br()				\n替换为<br/>
sprintf($str)		返回一个格式化了的字符串
printf("字符串 %.2f %.3f",$v1,$v2)	输出格式化字符串
	格式 %[ 'padding_character][-][width][.precision]type
	//所有转化说明都以%开始 如果想打印一个%符号 必须使用%%
		参数padding_character是可选的.他将被用来填充变量直至所有指定的宽度.该参数的作用就像使用计算器哪样在数字前面加零.默认的填充字符是一个空格,如果指定了一个空格或0,就不需要使用"'"作为前缀.对于人格其他的填充字符,必须指定"'"作为前缀
		字符"-"是可选的.他指明该域中的数据应该左对齐,而不是默认的右对齐
		参数width告诉printf()函数在这里为将被替换的变量留下多少空间(按字符计算)
		参数precision表示必须是以一个小数点开始.它指明了小数点后面要显示的位数.
		转化说明的最后一部分是一个类型码
			b 	解释为整数并作为二进制数输出
			c 	解释为整数并作为字符输出
			d 	解释为整数并作为小数输出
			f 	解释为双精度并作为浮点数输出
			o 	解释为整数并作为八进制数输出
			s 	解释为字符串并作为字符串输出
			u 	解释为整数并作为非指定小数输出
			x 	解释为整数并作为带有小写字母a~f的十六进制数输出
			X 	解释为整数并作为带有大写字母A~F的十六进制数输出

addslashes()		给特殊字符加斜杠			加入mysql时进行转义
stripslashes()		去除addslashes加的斜杠		将mysql里的数据取出来
//magic_quotes_gpc配置开启将自动添加或去除反斜杠
htmlentities()		转换所有字符
htmlspecialchars()	转换特殊字符		将html标签转换为实体字符 & ' " < >
strip_tags()		去掉html标签
urlencode($str)		编码url字符串
urldecode($url)		解码


字符串大小写
strtolower()		将字符串变成小写
strtoupper()		将字符串变成大写
ucfirst()			如果字符串第一字符是字符 就将该字母大写
ucwords()			将每个单词第一个字母转换为大写

字符串连接 分隔
array explode('',$str[,limit])	将字符串分割为数组		limit字符串小块的数量
string implode('',$arrayrr)			将一个数组里的所有的元素按照某个分隔符进行拼接,变成一个字符串
join()			implode别名
strtok($str,'分隔')			字符串分割		多种字符
preg_split('/正则/'),$str[,limit,flags]  通过一个正则表达式分隔字符串
preg_split('/\s*,\s*/',trim($str),-1,PREG_SPLIT_NO_EMPTY)

strcmp($str1,$str2) 二进制安全字符串比较(区分大小写) 相等返回0 $1>$2 返回正数 $1<$2 返回负数 2>12
strcasecmp()		不区分大小写
strnatcmp()			使用'自然顺序'算法比较字符串(不区分大小写)  2<12
strlen()			字符串的长度，字节
strrev				将字符串反转		中文不能反转

substr(目标字符串,截取起始位置[,截取长度]) 字节		起始位置为0 负数将得到字符串尾部的一个子字符串

strstr($str,''[,TRUE])	查找某个字符在字符串中首次出现的位置,并返回该位置到字符串最后的整个字符串 第三参数为true 向字符前面截取
stristr()			不区分大小写
strrchr($str,'')	反向搜索
strchr				是strstr函数别名,

strpos($str,''[,int])查找字符串首次出现的位置  第三个参数表示开始索引的位置
stripos()			查找字符串首次出现的位置(不区分大小写)
strrpos($str,'')	字符串在目标字符串中最后一次出现的位置
strripos()			不区分大小写

strtr($str,$from,$to)			该函数返回str的一个副本, 并将在from 中指定的字符转换为to中相应的字符  如果form与to长度不相等,那么多余的字符部分江北忽略.
strtr($str,$replace_pairs)		可以来取代to和from参数,因为他是以array('from'=>'to',...)   如果包含的是一个空的字符串 那么会返回false
str_replace('old','new','$str'[,int&count])		子字符串替换[$count] 替换的次数
substr_replace($str,'',起始位置[,长度])			替换字符

substr_count($str,'',[,开始位置,搜索长度])	计算字符在字符串中出现的次数
str str_repeat($str,$int)	重复一个字符串

str_pad()			将字符串用指定个数的字符填充字符串
php
ip2long($ip_address)		 将ipv4的字符串互联网协议装换成数字格式
long2ip($ip_int)			将ip2long生成的整数转换为 ipv4

mb_strlen($str[,encoding])				获取字符串的长度
mb_substr($str,$start[,$length,charset])获取部分字符串
	$length 为空 或 忽略 则是获取整个字符串
	encoding 默认为 mb_internal_encoding()

mb_internal_encoding()		获取/设置 内部编码

正则表达式
	[[:alnum:]]		文字数字字符
	[[:alpha:]]		字母字符
	[[:lower:]]		小写字母
	[[:upper:]]		大写字母
	[[:digit:]]		小数
	[[:xdigit:]]	十六进制数字
	[[:punct:]]		标点符号
	[[:blank:]]		制表符和空格
	[[:space:]]		空白字符
	[[:cntrl:]]		控制符
	[[:print:]]		所有可打印的字符
	[[:graph:]]		出空格外所有可打印的字符

	ereg(pattern,sraech[,matches]);
		该函数搜索字符串search,在pattern 中寻找与正则表达式相匹配的字符串.如果发现了与pattern 的字表达是相匹配的字符串,这些字符串将会存储在数组matches中,每个数组元素对应一个子表达式
	eregi()				函数eregi()除了不区分大小写外,其他功能与ereg()一样.
	ereg_replace(pattern,erplacement,search);
		该函数在字符串nsearch中查找正则表达式pattern 的字符串,并且用字符串replacement来替换.
	eregi_replace()		除了不区分大小写外,其他与ereg_replace()相同.
	split(pattern,search[,max])
		将字符串search分割成符合正则表达式模式的子字符串,然后将子字符串返回到一个数组中,整数max指定进入数组中的元素个数.

数组函数
array_unique				移除数组中重复的值
foreach($arr as $key=>$val){}	遍历数组
array each($arr)			 每次从数组中获取当前数组指针所指向的元素,返回一个有四个元素的数组(关联+索引),并且将数组的指针下移一位
list($a,$b)=$arr			是一个语法结构,将得到的数组里的元素,必须是以0开始的索引元素,对应的赋值给list所指定的变量里
current($arr)				获取当前数组指针所指向的元素的值
pos()						current的别名
next($arr)					返回数组当前指针所指向的下一位的元素的值,并指针下移一位
prev($arr)					返回当前指针所在位置的前一个元素的值,并且将指针向前移动一位
key($arr)					获取当前数组当前指针所指向元素的下标
end($arr)					获取数组最后一个元素的值,指针也会指向最后一个元素
reset($arr)					重置数组的指针,让数组指针指向第一个元素,如果成功返回第一个元素的值
//需要再次对一个数组使用each  需要重置数组指针
	数组排序
	sort($arr[,mode])			字母,数字 升序排序 A<Z<a
		mode SORT_REGULAR(默认值) SORT_NUMERIC SORT_STRING(12<2)
	asort($arr)					根据数组的每个元素值进行排序
	ksort($arr)					根据数组的关键字来进行排序
	rsort($arr)					降序排序
	arsort($arr)
	krsort($arr)
	usort($arr,callable)		用户自定义比较函数来排序
	shuffle($arr)				将数组各元素进行随机排序
	array_reverse()				反向排序
array_walk($arr,func[,userdata])	使用func函数处理$arr数组里的每一个元素
	function fun($value,$key,userdata){}
int count($arr)				数组长度
sizeof($arr)				数组元素个数
array_count_values($arr)	返回一个包含频率表的关联数组
extract($arr)				把数组里的键作为变量名 值作为变量值

array array_keys($arr)		获取数组的所有下标,返回一个索引数组,数组元素的值都是目标数组的下标
array array_values($arr)	获取数组所有的值,返回一个索引数组
array_pop($arr)				删除最后一个元素  并返回
	 _push($arr,'')			添加到最后 可以是多个数组
	 _shift()				删除第一
	 _unshift() 			添加第一


range(1,9[,步幅])			按照ASCII码能够指定范围,自动生成数组元素的函数
range(10,1,-1)				创建10到1的数组
array_rand($arr,4)			从数组中随机取出指定个数的元素下标


array_key_exists($key,$search)	检查给定的键名或索引是否存在于数组中		$key 要检查的键 $search 一个数组,包含带检查的键
array_search(mixed,$arr)	在数组中搜索给定的值,如果成功则返回相应的键名
array_diff()				数组差集

array_map('函数名',$arr)		数组里每个值都调用函数


时间函数
date('Y-m-d H:i:s')			格式化一个本地时间/日期
time()						返回当前的Unix时间戳
strtotime					将一个字符串格式时间转化成时间戳
microtime()					微秒

sleep(1)	执行到该 语句的时候,等待1秒钟,在执行下面的代码
usleep()	以微秒为单位

文件加载
require ''		引入文件  出错就不会往下面执行,报致命的错误
require_once	第二次包含不会引入
include 		出错了会警告 任然执行下面代码
include_once
int readfile($filename[,$use_include_path,$res])	读入一个文件并写入到输出缓冲(不会进行PHP解析)
php.ini 配置	每个页面设置页眉和页脚
	auto_prepend_file = 'url'		页眉
	auto_append_file = 'url' 	 	页脚
还可以对apache web服务器设置 在需要自动加入页面的文件夹中 创建一个名为 .htaccess的文件 这个文件需要以下两行代码
	php_value auto_prepend_file 'url'		页眉
	php_value auto_append_file 'url'		页脚

header('Content-type:text/html;charset=utf-8')	浏览器用utf-8来解析
header('refresh:3,url=privilege.php')			3秒后跳转到privilege.php页面
header('Cache-Control:no-cache')				禁止缓存
相对路径表示方式：
./		表示当前目录
../		上级目录
/		网站根目录

dirname()			返回路径中的目录部分
basename()			返回路径中的文件名部分
pathinf()			返回文件路径的信息
realpath()			返回规范化的绝对路径名

文件夹操作
res opendir($dir)			打开一个目录,需要一个路径参数,返回一个资源
str readdir($o)				读取,从资源里读取一个对应文件,当前文件指针所指向的文件,将文件指针下移一位.返回当前文件的文件名字或则false.可以显示的使用资源参数,也可以不提供,因为系统会向上自动寻找文件路径资源
rewinddir($o)				重置目录资源的指针,回到第一个文件(.文件)
closedir($o)				释放目录资源
scandir($dir)				浏览器目录,吧所有的文件都获得,并存放到一个数组返回

is_dir()					判断给定的路径是否是一个目录,如果是路径返回true,否则返回false
is_file()					判断给定的路径是否是一个文件,如果是文件返回true,否则返回false
mkdir()						创建文件夹,不能创建同名文件夹(linux下:必须保证当前文件夹有php所在组有权限进行写操作)
rmdir()						删除文件夹
getcwd()					获取当前操作目录 绝对路径
chdir()						改变当前操作目录,代表进入到目标目录

文件操作
file_get_contents()			取文件全部内容	path 读取的文件/或网站 [include_path] 如果想在incliude_path中搜寻文件的话,可把该参数设为1 [context] 文件句柄的环境.context是一套可以修改流的行为的选项.若使用null则忽略 [start] 开始读取的位置 [max_length] 读取的字节数
file_put_contents()			向文件写入内容	file 要写入数据的文件 [deta] 要写入文件的数据.可以是字符串,数组或数据流 [mode]如何打开/写入文件 FILE_USE_INCLUDE_PATH表示会覆盖原来的数据|FILE_APPEND表示追加数据|LOCK_EX在写入时获得一个独占锁 [context] 文件句柄的环境.context是一套可以修改流的行为的选项.若使用null则忽略

fopen($file,mode)			打开一个文件,返回一个资源
	mode[r,r+ 只读和读写 w,w+写入和读写 a,a+写入和读写 追加到文件最后]
fclose($fr)					关闭文件资源
fwrite($fr,str[,length])	往文件里写入内容
fputs()						就是fwrite的替身
feof($fr)					测试文件指针是否到了文件结束的位置

fgets($fp,999)				s代表string,一次获取一行(直到读到一个换行符\n 或者文件结束符EOF 或者是从文件中读取了998B 可以读取的最大长度为指定长度减去1B)
fgetss($fp,length[,allowable_taes])	过滤字符串中包含的PHP和HTML标记,如果它要过滤任何特殊的标记,可以将他们包含在allowable_tags字符串中
fgetsv($fp,length[,'\t','默认为"']) 可以把定界符分成多行 封闭每一个域的字符"

readfile(filename[,include_path[,ccontext]]) 打开文件并将文件内容输出到标准输出(浏览器)中,然后关闭这个文件 第二个参数指定了PHP是否应该在include_path中查找文件,可选的context参数只有在文件被远程打开时才使用
fpassthru($fp)				输出文件内容 成功返回true
file($fp)					把整个文件读入一个数组中,返回一个数组(数组的每一个元素都是文件中的一行数据)

fgetc($fp)					c代表charcater,一次获取一个字符,指针下移一位 缺点会返回文件结束符EOF 而fgets()则不会
fread($fr,int)				读取指定长度是数据

file_exists(url)			判断文件是否存在.存在返回true,不存在返回false
filesize(url)				获取文件的长度		可以结合fread()函数一次读取整个文件
unlink(url)					删除文件

rewind($fp)					将文件指针复位到文件开始
ftell($fp)					以字节为单位报告文件当前在文件中的位置
fseek($fp,offset[,whence])	将文件指针fp从whence位置移动offset个字节
//如果所涉及的数据文件具有一定的复杂程度,在必须完成这些操作时,使用数据库可以使得这些工作变得更加简单


fgetcsv()					从文件指针中读入一行并解析csv字段
fputcsv()					将行格式化为csv并写入文件指针

array glob("*.txt")			寻找与模式匹配的文件路径
touch($filename)			设定文件的访问和修改时间(如果文件不存在,则会被创建)

copy()						拷贝,会保存原文件
rename()					重命名文件
filemtime()					m代表modify,修改的意思,获取文件最后被修改的时间
fileperms()					获取文件的权限(主要针对linux),返回是一个八进制结果

clearstatcache(true,$filename)		清除文件状态缓存


文件上传
上传配置 php.ini
	file_uploads = on|off		确定服务器上的PHP脚本是否可以接受文件上传
	max_exeution_time=integer	PHP脚本在注册一个致命错误之前可以执行的最长时间,以秒为单位
	upload_max_filesize=integer	设置上传文件最大大小,以MB为单位.此指令必须小于post_max_size
	upload_tmp_dir=string		设置上传文件在处理之前必须存放在服务器的临时一个位置,直到文件移动到最终的目的地位置.
	post_max_size=integer		确定通过POST方法可以接受的信息的最大大小,以MB为单位.
HTML上传固定设置
	ENCTYPE="multipart/form-data"	这里是固定写法,否则上传失败
	ACTION="upload.php"				定义要处理上传的程序文件路径
	METHOD="post"					定义传输方式为POST,一般情况下Form提交数据都设置为POST
	<input type="hidden" name="MAX_FILE_SIZE" value="1000000">	定义上传文件的大小上限 注:这只是对浏览器的建议,实际上他可以被简单的绕过,但最好还是加上,这样可以避免用户在花时间等待上传大文件之后才发现该文件太大了的麻烦
	<input type="file" name="userfile"> 这是文件上传域,Type属性必须设置为file,但Name属性可以自定义,这个值会在代码文件中使用
全局变量$_FILES
	$_FILES['userfile']				上传文件时定义的name
	$_FILES['userfile']['name']		文件名
	$_FILES['userfile']['type']		文件类型
	$_FILES['userfile']['tmp_name']	文件保存的临时路径
	$_FILES['userfile']['size']		文件大小
	$_FILES['userfile']['error']	错误代码
		0	没有错误
		1 	上传文件大小超出服务器允许大小
		2 	上传文件大小超出浏览器允许大小
		3	文件上传不完整
		4	没有上传任何文件
		6	找不到服务器文件的临时目录
		7	没有权限将文件上传到目标文件
上传函数
is_uploaded_file($_FILES['userfile']['tmp_name'])	判断文件是否是通过HTTP POST 上传的
move_uploaded_file(临时文件路径,存放的路径)			将文件直接移动到目标路径,不会保留原文件
move_uploaded_file($_FILES['file']['tmp_name'],'./uploads/'.$_FILES['file']['name']);
copy()						将文件复制到目标路径,会保留原文件

文件下载
header("Content-type:application/octet-stream")				当前PHP输出给浏览器的数据是流式文件，浏览器不要解析(其实就是下载的意思)
header("Content-Disposition:attachment; filename=filename")	对文件进行伪装，文件变成一个普通的附件并进行重命名
echo file_get_contents('文件路径');

httpd.conf 		MaxClients		参数限制同时链接apache的连接数
my.conf 		max_connections	参数限制同时链接mysql的链接数

mysql操作
链接mysql数据库服务器
	$link = mysql_connect($db_host,$db_user,$db_pwd);
	返回值：如果链接mysql成功，将返回一个资源标识符$link;如果链接失败，返回false

选择当前要操作的数据库
	mysql_select_db(string $databaes_name[,resource $ link_identifier])
		$database_name:指定当前要操作数据库的名称
		[$link_identifier]:是可选项，制定当前的活动链接标识符.当前活动链接只有一个.如果省略，则使用上一次连通数据库的标识符

设置mysql返回 的数据的	字符集
	mysql_query("set names utf8");

mysql查询
	resource mysql_query(string $query[,resource $link_identifier = NULL])
	如果执行select、show、describe语句成功返回资源标识符，失败返回false
	其他sql语句(delete,update,insert)执行成功将返回true，失败返回false

从结果集中取出一行作为枚举数组返回
array mysql_fetch_row($result[,$link])	返回一个索引数组(表的记录字段作为元素的值,元素下标从0开始系统生成)
array mysql_fetch_assoc()				返回一个关联数组(表的字段名作为数组下标,而对应记录字段作为元素值)
arryrow mysql_fetch_array($result[,$type])		取得一行数据作为回合数组返回
$type:指数组的类型，取值：MYSQL_BOTH,MYSQL_NUM,MYSQL_ASSOC
	MYSQL_NUM:是一个常数，必须大写，返回的数据是枚举数组
	MYSQL_ASSOC:返回的是关联数组，数组下标是字符
	MYSQL_BOTH:同时返回回合数组

mysql_errno()				出现错误的错误编号
mysql_error()				错误信息
mysql_close($conn)			关闭资源
mysql_free_result($sql)
mysql_data_seek()			用来设置结果集指针的位置
int mysql_num_rows($result)	取得返回的结果集中记录总数
mysql_affected_rows()		返回当前操作所受影响的行数
mysql_insert_id()			返回当前插入数据所得到的自增长id

oop(object oriented programming)
php面向对象编程的三大特征
1 封装	形成类的过程
	将某类数据的共同特性抽离出来,形成计算机可以识别的代码的过程称之为分装(抽象),将数据(属性)以及对数据的操作(方法)捆绑到一起,形成一个整体(class),对外隐藏技术实现(外部不知道内部具体是如何实现的),只提供调用的接口(public修饰的外部访问:属性和方法)
2 继承		继承允许我们使用子类在类之间创建层次关系.子类将从他的超类继承属性和操作
	如果某个类基本上功能差不多,然后稍微会多出一点功能.将这个多出功能的类定义为一个子类,然后基本功能的类定义为父类,然后将子类继承父类.子类的对象能够拥有子类和父类的所有属性(public和protected)以及方法的使用.
3 多态	多种形态,面向对象,要有继承,重写  多态性与其说是对象的特性,不如说是行为的特性
	php中不支持多态
	重写:override在子类中有与父类同名的方法,内容不一样,子类重写父类的方法.
	重载:overload,php又不支持,因为php是弱类型语言,php不支持同名函数或方法
		重载就是在一个类中可以根据方法的返回值或则参数列表的不一样,形成不同的方法,方法的方法名字却相同.


类定义
	class ClassName{
		public $name;					//成员属性
		/*	修饰符
				var			老版本的面向对象的属性修饰符,表示在类的内部和类的外部都能够被访问
				public		默认.公有,类内部,外部和子类都可以访问
				protected	表示受保护的 只有本类或子类可以访问
				private		表示私有,只有在本类可以只用

			如果没有给成员属性赋值,默认为null
			成员属性必须给修饰符 否则报错
		*/
		public function func(){			//成员方法
		//	成员方法可以不用给修饰符 默认为public
			//code
		}
	}


	$className 是小驼峰法,别名 驼峰命名
	$ClassName 是大驼峰法,别名 帕斯卡命名	类名一般以大驼峰命名


成员属性|方法访问
	$对象名->成员属性名;
	$对象名->成员方法名();

类与对象的关系
	类是抽象的,概念的,代表一类事物,比如人类,猫类
	对象是具体的,实际的,代表一个具体事物
	类是对象的模板,对象是类的一个个体实例

对象的传递方式	地址传值
	当把一个对象已经创建的实例赋给一个新变量时，新变量会访问同一个实例，就和用该对象赋值一样.此行为和给函数传递入实例时一样.可以用克隆给一个已创建的对象建立一个新实例.

魔术方法	系统已经定义好,但是需要用户在类里面显示的写出来才会被执行的方法.一旦定义了魔术方法,那么在某些特定的情况下会自动触发.
	function __construct(形参列表){		//构造方法
		__construct是一个关键字,表示这是一个构造函数,__是两个下划线组成
		形参列表 这里可以有多个形参,就是你在创建对象时传入的初始化值
		构造函数适用于完成对成员属性的初始化
		构造函数是创建对象时,由系统自动调用的
		构造函数没有返回值
		一个函数中只能有一个构造函数,不能有多个
	}
	__destruct()		析构方法	在销毁一个类之前执行一些操作或完成一些功能,这些操作或功能通常在所有对该类的引用都被重置或超出作用域时自动发生	不能带任何参数
	__call($fun,$arr)	在对象中调用一个不可访问方法时调用
	__callStatic($f,$a)	用静态方式中调用一个不可访问方法时调用此静态方法
	__get($name)		读取不可访问属性的值时调用
	__set($key,$value)	在给不可访问属性赋值时调用
	__isset()			当对不可访问属性调用isset()或empty()时调用
	__unset()			但对不可访问属性调用unset()时
	__sleep()			执行serialize()时先调用	返回一个包含对象中所有应被序列化的变量名称的数组
	__wakeup()			执行unserialize()时先调用	重建数据库连接,或其他初始化操作
	__toString()		一个类被当成字符串时调用
	__invoke()			当尝试以调用函数的方式调用一个对象时调用
	__set_state()		调用var_export()导出类时调用此静态方法
	__clone()			克隆方法	当一个对象被clone的时候会自动调用的方法
		$c = clone $b;
	__debugInfo()

$this 在类中class里面(方法里面),可以使用$this代表当前调用该方法的对象
	当一个方法在类定义内部被调用时，有一个可用的伪变量 $this
	$this 是一个到主叫对象的引用(通常是该方法所从属的对象，但如果是从第二个对象静态调用时也可能是另一个对象)


->	对象运算符
::	范围解析操作符

$p1->name1=100;					对象赋值

内置标准类						stdClass
$obj = new stdClass()			创建一个stdClass的实例

SPL，PHP 标准库(Standard PHP Library)

	__autoload()	自动调用		使用尚未被定义的类时调用
	spl_autoload_register(回调函数)

静态变量
static $val=0		定义静态变量
self::$val 			类中访问
类名::$val 			类外访问

静态方法
static function v al(){}		定义
类名::function val()
对象名->val()					类外
self::val()					类内

对象克隆	对象的另外一种产生方式,不是从类产生对象,从对象本身产生对象
	性对象(变量) = clone 对象(变量)
	把__clone()该为 private 将会阻止对象克隆

设计模式	设计某个程序的方式.php中涉及模式不多,主要两个:单例模式和工厂
	单例模式	一个类只能最多创建出一个对象
		不让克隆(私有化克隆魔术方法)
		不让创建对象(私有化构造方法),不能在类外部使用new关键字创建对象.
		进入到类中,创建对象(静态方法)
		要在类中使用静态属性来保存已经产生的对象,用于判断


对象保存	将得到的对象保存到文件中
serialize()		序列化	将一个数据类型按照其结构变成对应的字符串的过程
unserialize()	反序列化	将对应的字符串,反过来构成原来的数据类型

iterator接口		重写foreach对对象的访问机制
iterator接口所要求的一系列函数
	结构函数并不是必须的,但是很明显,他是设置将要迭代的项数和当前数据项链接的地方
	rewind()函数将内部数据指正设置会数据开始处
	valid()函数将判断年数据真身的当前位置是否还存在更多数据
	key()函数将返回数据指针的值
	value()函数将返回保存在当前数据指针的值
	next()函数在数据中移动数据指针的位置


对象函数
is_object()									判断一个变量是否是一个对象
objname instanceof classname				判断一个对象是否属于一个类
	bool is_a($object,'class_name'[,bool $allow_string = FALSE ] )
is_subclass_of($object,'classname') 		如果此对象是该类的子类，则返回 TRUE

class_exists()				类是否存在
class_exists ( string $class_name [, bool $autoload = true ] )
interface_exists()			接口是否存在
method_exists(obj,'fun')	方法是否存在
property_exists('$class','property')  检查对象或类是否具有该属性
trait_exists				检查指定的 trait 是否存在

get_declared_classes() - 返回由已定义类的名字所组成的数组
get_class_methods — 返回由类的方法名组成的数组

get_class()					得到对象类名
get_parent_class()			得到父类的类名

trait 				 实现代码复用的一个方法
trait traitName{
    function getReturnType() { /*1*/ }
    function getReturnDescription() { /*2*/ }
}
class C{
	usr traitName;
}


反射		反射就是将其他类的结构反应出来,从而可以对类的结构进行了解便于对类的使用
	new ReflectionClass();


	ReflectionExtension::getINIEntries()
	$ext = new ReflectionExtension('类名');
		$ext->getConstants();	//获取所有常量
			  getProperties();	//获取所有属性
			  getMethods();		//获取所有方法
			  getFunctions();	//获取所有函数名
			  getINIEntries();	//获取配置信息

	$obj = new Class;		实例化一个定义好的类
	$med = new ReflectionMethod($obj,'fn名');
	$med->invoke($obj)					对象方法调用(无参数)
	$med->invokeArgs($obj,array(1,2))	对象方法调用(有参数)

命名空间		一种封装事务的方法 5.3以上版本
	命名空间中可以出现 类,函数,常量		只有const定义的常量才有效
	名为PHP或php的命名空间,以及以这些名字开头的命名空间被保留用作语言内核使用
		namespace Name; 	定义Name空间
		在声明命名空间之前唯一合法的代码是用于定义源文件编码方式的declare语句
		namespace Name\Son	定义子命名空间
		一个文件中可以定义多个命名空间 用大括号包起来 (不建议)
		使用命名空间
			非限定名			foo()
			限定名称			Son\foo()
			完全限定名称		\Name\Son\foo()
		use Name\Son		导入命名空间
		use Name\Son as son	别名
		\foo()				使用全局空间 \
		__NAMESPACE__	当前命名空间名称的字符串

		命名是虚拟的空间，不是真实存在的目录，但是ThinkPHP的命名空间是真实的地址路径.
		当前文件中include具有命名空间的文件，不会改变当前文件的命名空间.

	ClassName::class      			ClassName类的完全限定名称 php5.5 返回string


异常处理		Exception
	异常处理的基本思想是代码在try代码块被调用执行
	try{
		//throw new Rxception('message',code);		//throw关键字将处理异常处理机制.
		throw new \Exception();
	}catch(Exception $e){
		$e->getCode() //可以讲多个catch 代码块与一个try代码块进行关联.如果
		每个catch代码块可以捕获一个不同类型的异常,那么使用多个catch代码块是有意义的
	}
		getCode()			返回传递个结构函数的代码
		getMessaage()		返回传递给结构函数的消息
		getFile()			返回产生异常的代码文件的完整路径
		getLine()			返回代码文件中产生异常的代码行号
		getTrace()			返回一个包含了产生异常的代码回退路径的数组
		getTraceAsString()	返回与getTrace()反向相同的信息,该信息将被格式化成一个字符串
		_toString()			允许简单第显示一个Exception对象,并且给出以上所有方法可以提供的信息

mysql扩展
	win
	在mysql扩展库是一个dll文件 php_mysql.dll,该文件提供了操作mysql数据库的方法
	linux
	so文件

mysqli(i表示改进)
	@ $db = new mysqli('localhost','root','111111','dbName');			//返回对象
	$db->select_db(dbName)												//对象 选择库

	@ $db = mysqli_connect('localhost','root','111111','dbName');		//返回资源
	mysqli_select_db(db_res,db_name)									//资源 选择库


	$db->connect_errno()
	$db->connect_error()
	$result = $db->query($sql)											//发送sql语句
	$num_results = $result->num_rows;									//查询返回的行数
	$row = $result->fetch_assoc()										//每次返回一行数据
	$row = $result->fetch_row()											//返回一行数据的数组 0下标为键名 1下标为值
	$row = $result->object()											//将一行数据返回到一个对象里 以$eow->字段名 访问
	$row = $result->
	$result->free()														//释放结果集
	$db->close()

	mysql_connect_errno() 												//链接错误时返回一个错误号,如果成功返回0
	mysql_connect_error() 												//链接错误时返回一个错误提示
	$result = mysqli_query($sql)										//发送给mysql的查询不需要再后面加;号
	$num_results = $mysql_num_rows($result);							//查询返回的行数
	$row = mysqli_fetch_assoc($result);									//每次返回一行数据
	$row = mysqli_fetch_row($result);									//返回一行数据的数组 0下标为键名 1下标为值
	$row = mysqli_fetch_object($result);								//将一行数据返回到一个对象里 以$eow->字段名 访问
	mysqli_free_result($result);										//释放结果集
	mysqli_close($db);

PDO PHP Data Object php数据对象(数据抽象层)
作用:能够解决用户在需要使用不同的数据库的时候进行来回切换,PDO能够自动的进行数据库的切换,而且还能将所有的可能存在的不兼容的语法进行兼容性处理
使用PDO之前必须在php.ini中开启PDO扩展

PDO这一套不单只是一个类,有三个类
	PDO类:负责数据库的连接,分发还生气了语句的发送
		PDO::beginTransaction		开启事务
		PDO::rollBack				事务回滚
		PDO::commit					提交事务
		PDO::errorCode				获取错误信息
		PDO::errorInfo				获取错误信息
		PDO::exec					执行一条SQL语句,并返回受影响的行数
		PDO::lastInsertId			返回最后插入行的ID或序列值
		PDO::prepare				准备预处理
		PDO::query					有结果集的查询

	PDOStatement类:结果集类,专门用来查询出来的结果,还有其他功能(预处理)
		PDOStaerment::bindColumn	绑定一列到一个PHP变量
		PDOStatement::columnCount	返回结果集中的列数
		PDOStatement::fetch			从结果集中获取下一行
		PDOStatement::fetchAll		返回一个包含结果集中所有行的数组
		PDOStatement::fetchColumn	从结果集中的下一行返回单独的一列
		PDOStatement::fetchObject	获取下一行并作为一个对象返回
		PDOStatement::rowCount		返回受上一个SQL语句影响的行数
		PDOStatement::setFetchMode	为语句设置默认的获取模式
	PDOException类:用异常机制处理PDO类所碰到的问题
		PDOException::getMessage	获取异常消息内容
		PDOException::getPrevious	返回异常链中的前一个异常
		PDOException::getCode		获取异常代码
		PDOException::getFile		获取发生异常的程序文件名称
		PDOException::getLine		获取发生异常的代码在文件中的行号
		PDOException::getTrace		获取异常追踪信息
		PDOException::getTraceAsString	获取字符串类型的异常追踪信息
		PDOException::__toString	将异常对象转换为字符串
		PDOException::__clone		异常不允许被克隆

PDO::__construct($dsn,$user,$pass)
	$dsn 两个部分构成 数据源,数据库信息
  例$dsn mysql:host=localhost;port=3306;dbname=project

PDO预处理	可以使用多种方式实现预处理:指的是在绑定数据进行执行的时候,可以有多种方式
准备预处理语句(发送给服务器,让服务器准备预处理语句)
sta PDO::prepare 将一条SQL语句发送给MYSQL服务器
执行预处理 将要操作的数据发送给预处理语句,在执行预处理语句
PDOStatement::execute();
数组绑定
$sta->execute([$array]);
通过绑定变量
bindParam 在执行预处理之前,将之前预处理语句所指定的变量进行赋值 只能通过变量的形式进行赋值(引用传值)
bindValue 与bindParam一样 可以直接赋值(值传递)  执行新的预处理时需使用该函数重新定义值
不管是数组,还是变量绑定 都应和prepaer里需要匹配的变量 配对  :为关联下标(:变量名) ?为索引下标

PDO事务处理
PDO::beginTransaction	开启事务
POD::commit				成功提交数据
PDO::rollback			失败后回滚数据

PDO属性设置	设置PDO在处理数据的过程中采用什么方式去处理
PDO::setAttrbute	设置属性
PDO::getAttribute	获取属性
常用属性
PDO::ATTR_AUTOCOMMIT:设置当前连接MYSQL服务器的客户端的SQL语句是否自动执行,默认是自动提交
PDO::ATTR_CASE:当PDO从结果集中获取数据的时候,如何处理对应的字段的名字
	PDO::CASE_LOWER:将所有字段都小写显示
	PDO::CASE_UPPER:所有字段都大写显示
	PDO::CASE_NATURAL:原本什么样就什么样
PDO::ATTR_ERRMODE:错误模式,当pdo出现错误的时候到底使用那种模式进行处理
	PDO::ERRMODE_SILENT:静默模式,默认的出错不管
	PDO::ERRMODE_WARNING:警告模式,如果出错了就会报出警告
	PDO::ERRMODE_EXCEPTION:异常模式,如果出错会采用异常来处理(PDOException)
PDO::ATTR_PERSISTENT:当前对MYSQL服务器的连接是否是长连接
	TRUE:是长连接(长连接的使用必须要配合:apache(connection:keepAlive),mysqld)
	FALSE:默认的,非长连接
	不同的脚本的执行间距非常短,同时每个脚本都需要操作数据库 时使用长连接 (mysql:mysql_pconnect())

PDO异常处	当PHP碰到错误的时候,会直接报错,错误处理会变得相当麻烦.后来,当错误发生之后,会将错误信息不再直接输出,放到一个类的对象里(PDOExcption)
使用PDO异常处理需要将错误处理模式变成异常模式,所有可能出错的语句都不许放到错误捕捉语句块里
try{
	//错误捕捉语句块 凡是有可能错误的语句都放在这
	//一旦出错会立即进入catch语句,把所有的错误信息放到PDOexception $e里面
}catch(PDOException $e){
	//将错误信息进行处理
	$e->getLine() //错误的行数
}
业务逻辑错误是捕捉不到的

$lifetime = $this->rememberMe ? 24*3600 : 0;
session_set_cookie_params($lifetime);
会话技术
	会话技术指的是当一个浏览器与服务器在进行对话的期间(浏览器没有关闭),各个请求不同的脚本间可以共享一些数据,这种技术就称之为会话技术.
	一次会话技术就是浏览器请求某个网站知道浏览器关闭
	会话技术有两种:session,cookie

	seesion 技术指的是将数据保存在服务器端,然后在不同的脚本之间可以共享服务器端的session数据
		session_start()		是session机制的开始,它有一定概率开启垃圾回收,因为session是存放在文件中,但是有的系统是session.gc_provability=0,这也就是说概率是0,而是通过cronin脚本来实现垃圾回收
		session_destroy()	销毁session文件
		$_SESSION[]			获取session数据
		session_name([$name])	读取/设置会话名称 指定name参数,会更新会话名称,并返回原来的会话名称
		session_id([$id])		读取/设置当前会话ID
		session配置 php.ini
			session.save_handler	定义了来储存和获取与会话关联的数据的处理器的名字.默认为files
			session.save_path		session文件存储路径 N;/path 这是随机分级存储,这样的话,垃圾回收将不起作用,需要自己写脚本
			session.name			指定会话名以用做cookie的名字 只能由字母数字组成,默认为PHPSESSID
			session.auto_start		指定会话模块是否在请求开始时自动启动一个会话.默认为0(不启动)
			session.gc_probability	被除数 默认为1
			session.gc_divisor		除数 默认为100
			session.gc_maxlifetime	过期时间 默认1440(24分钟)
			session.use_cookies		指定是否在客户端用cookie来存放会话ID 默认为1
			session.ues_only_cookies指定是否在客户端仅仅使用cookie来存放会话ID 启用此设定可以防止有关通过URL传递会话ID的攻击.默认值为1
			session.cookie_lifetime	以秒数指定了发送到浏览器的cookie的生命周期.值为0表示直到关闭浏览器.默认为0
			session.cookie_path		默认/ 表示sessionID能够在整个网站中都有效
			session.cookie_domain	cookie的跨域,默认为空不能跨域
			session.use_trans_sid	指定是否启用透明SID支持 默认为0 禁用
		禁用cookie之后只用session
			session.use_cookies = 0 		//不使用cookie保存sessionID
			session.use_only_cookies = 0	//将sessionID只允许cookie进行数据传输改变
			session.use_trans_sid = 1		//将SID透明 sessionID放到a标签后面
		自定义session机制
			session_set_save_handler(开启session机制函数,关闭session机制函数,读取session数据函数,写入session函数,销毁session函数,回收过期session函数)
			
	cookie  技术指的是将数据保存在浏览器上,也可以在不同的脚本之间共享浏览器上的cookie数据
		setcookie(name,value,[expire],[path],[domain],[secure])	将服务器端的数据保存到浏览器端
			name		名称
			value		值
			expire		有效期		0为关闭浏览器到期	(UNIX时间戳减去当前的UNIX时间戳才是cookie变量保存的时间)
			path 		有效范围 	/为根目录下的文件都可以访问 默认时父目录不能访问子目录cookie 子目录可以访问父目录
			domain		域名			设置一级域名 那一级域名以下的域名都可以访问该cookie
			secure		是否通过安全的HTTPS连接来传输cookie	 值为1,则cookie只能在https连接上有效,默认值为0,表示cookie在http和https连接上都有效

图像处理		PHP本身不具备图片处理能力,但是可以通过扩展GD扩展来实现对图片的处理.
	gd_info				取得当前安装的GD库的信息
	array getimagesize	取得图像大小
	imagesx				取得图像宽度
	imagesy 			取得图像高度
	$im = imagecreatetruecolor(宽,高)		新建一个真彩图像
	int imagecolorallocate(资源,红,绿,蓝)		为一副图像分配颜色
	bool imagefill(资源,x,y,颜色)					填充背景色
	bool imagestring(资源,字号,x,y,目标字符串,颜色) 水平的画一行字符串
	imageline(资源,x,y,x,y,颜色)				画一条线
	imagesetpixel(资源,x,y,颜色)				画点
	bool imagepng|gif|jpeg($im,[$filename])	将图像输出到浏览器或文件
	imagedestroy(资源)						释放资源
	header('Content-type:image/png');		设置响应头

	imagecreatefromgif|png|jpg()			获取原图资源

	imagecopyresampled(目标资源,原图资源,0,0,0,0,目标大小100,100,原图大小160,160)	采样复制

	imagecopymerge(目标图片资源,水印资源,目标x坐标,目标y坐标,水印x坐标,水印y坐标,水印采样宽,水印采样高,透明°)
缩略图补白
	当原图的宽高比比缩略图的宽高比大的时候,以缩略图的宽为基准边,缩略图高乘以原图宽高比得到高
	当原图的宽高比比缩略图的宽高比小的时候,以缩略图的高为基准边,缩略图宽除以原图宽高比得到宽

在线编辑器	Ckeditor&Ckfinder
使用Ckeditor
<script src="ckeditor/ckeditor.js"><script/>
	1	<textarea id="myck" class="ckeditor"></textarea>
	2 	<textarea id="myck"></textarea>
		<script>CKEDITOR.replace('myck');</script>
	3	<script src="jquery.min.js"></script>
		<script src="ckeditor/adapters/jquery.js"></script>
		<textarea id="myck"></textarea>
		<script>$('#myck').ckeditor();</script>
配置Ckeditor
	1	修改系统提供的配置文件 config.js
	2 	新建一个用户配置文件,格式与config.js一致 在需要使用地方加载 CKEDITOR.replace('myck',{customConfig:'config_user.js'});
	3 	in-page(页内)配置 CKEDITOR.replace('myck',{width:500,height:300,uiColor:'#aabbcc'});
使用Ckfinder
	要在Ckeditor的配置项中加载ckfinder的使用,加载几个静态页,用户文件的管理在客户化的配置文件中加载
	config.filebrowserBrowseUrl =	'./ckfinder/ckfinder.html';
	config.filebrowserImageBrowseUrl = './ckfinder/ckfinder.html?Type=Images';
	config.filebrowserFlashBrowseUrl = './ckfinder/ckfinder.html?Type=Flash';
	config.filebrowserUploadUrl = './ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';
	config.filebrowserImageUploadUrl = './ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images';
	config.filebrowserFlashUploadUrl = './ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash';
	找到config.php修改权限 CheckAuthentication return true;

处理XML

//接收 xml 及其它数据
$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
//php7 代替  $GLOBALS["HTTP_RAW_POST_DATA"]
$postStr = file_get_contents("php://input");

//安全防护
libxml_disable_entity_loader(true);
//把接受到的xml  装换为对象
$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);

DOMDocument函数
	$dom = new DOMDocument()		创建DOMDocument对象
	$dom->load(URI)				加载xml文件
	$dom = XMLload($str)			加载xml字符串
	$root= $doc->documentElement	获取根节点(可读写)
	$root = $dom->createElement()	新建节点
	$p->removeChild() 		从父节点中删除指定的子节点
	replaceChild($new,$old)	替换节点
	$name = $dom->createAttribute()	新建属性
	$value = $dom->createTextNode()	新建text值
	$name->appendChild()	为当前节点添加子节点,属性为添加值
	$a = $dom->getElementsByTagName("") 获取指定名字节点集合
	item(*)			选择第几个元素
	attributes		获取属性列表
	nodeValue		获取值(只读)
	nodeName		获取名字(只读)
	nodeType 		获取类型(可读写)
	nodeTypedValue	存储节点值(可读写)
	$new->getAttribute()					获取属性值
	$new->hasAttribute()					判断属性返回bool
	$new->setAttribute('title', $_title)	设置属性
	$new->nodeValue = $_content				修改节点值
	header("Content-type: text/xml")
	echo $dom->saveXML();					//在页面上输出xml
	$dom->save()				//将xml保存成文件
simpleXML函数
	__construct($data)			创建一个新的SimpleXMLElement对象
	simplexml_load_file()		从xml文档获取simpleXMLElement对象
	simplexml_load_string()		从xml字符串获取simpleXMLElement对象
	children()					获取子节点
	addChild([$name[,$value]])	给对象增加子节点 节点名,节点值
	addAttribute($name,$value)	给对象增加属性 属性名,属性值
	asXML([file])				规定了file会保存文件,而不是返回它
	xpath(path)					对XML数据运行XPath查询
		节点名字		选取此节点的所有子节点
		/			从根节点选取
		//			从匹配选择的当前节点选择文档中的节点,而不考虑他们的位置
		.			选取当前节点
		..			选取当前节点的父节点
		@			选取属性
		[] 谓语	用来查找某个特定的节点或者包含某个指定的值的节点
		[1]			第一个节点
		[last()]	最后一个节点
		*			匹配任何元素节点
		@*			匹配任何属性节点
		|			选取若干路径
		text()		匹配   文本节点
		node()		匹配任何类型的节点

smarty模板		基于PHP开发的PHP模板引擎.它提供了逻辑与外在内容的分离
	常量
		SMARTY_DIR		代表包含Smarty.class.php文件的路径
	常用的变量
		$template_dir		模板文件夹
		$compile_dir		定义编译目录
		$config_dir			配置文件夹
		$cache_dir			缓存文件夹
		$left_delimiter		{
		$right_delimiter	}
		$debugging			开启调试
		$php_handling		主要应用就是{php}{/php} 在3.0版本之前,想使用php标签,那么必须开启php_handling=true
	常用方法
		assign($name,$value)		分配变量到模板文件
		assignByRef					分配变量到模板文件(引用传值)
		append($name,$value)		追加数据到数组中 并分配变量到模板文件中
		appendByRef					引用传值
		clearAllAssign				清除所有赋值的变量
		clearAssign($name)			清除指定变量的值
		configLoad					载入配置文件
		clearConfig					清除配置文件信息
		display($file)				执行输出并显示指定页面
		fetch						载入文件到字符串
		templateExists				判断模板是否存在
		常用路径设置
		setTemplateDir()
		setCompileDir()
		setConfigDir('config/')
		setCacheDir()				设置缓存目录
	注释 {* 注释内容 *}
	从配置文件中读取变量
		{config_load file="file.conf"}
		{#变量名称#}或{$smarty.config.变量名}
	在模板中创建变量
		{变量=变量值}或{assign var='变量名' value='变量值'}
	smarty保留变量
		{$smarty.get}
		{$smarty.post}
		{$smarty.cookies}
		{$smarty.env}
		{$smarty.session}
		{$smarty.request}
		{$smarty.server}
		{$smarty.now} 			取得当前时间戳
		{$smarty.const}			访问PHP常量
		{$smarty.capture}		获取capture模板输出
		{$smarty.config}		获取配置变量
		{$smarty.section} 		指向{section}循环的属性
		{$smarty.template}		返回经过处理的当前模板名(不包括目录)
		{$smarty.current_dir}	返回经过处理的当前模板目录名
		{$smarty.version}		返回经过编译的Smarty模板版本号
		{$smarty.block.child}	返回子模板文本块
		{$smarty.block.parent}	返回父模板文本块
	变量调节器		调节器可以组合使用
		{$var|capitalize}			首字母大写
		{$var|lower}				字符串小写
		{$var|upper}				大写
		{$var|cat:var2}				链接字符
		{$var|date_format:"%Y%m%d"}	时间格式化
		{$var|regex_replace:"正则":""}	正则替换
		{$var|replace:"":""}		字符替换
		{$var|count_characters:true}字符计数
		{$var|count_paragraphs}		段落计数
		{$var|count_sentences}		句子计数
		{$var|count_words}			计算词数
		{$var|default:"value"}		如果一个变量为空或未定义,那么采用默认值
		{$var|escape}				编码转义
		{$var|indent:10:"!"}		缩进10个!字符
		{$var|nl2br}				/n转br
		{$var|spacify:"!"}			在字符之间插入相应字符
		{$var|string_format:"%d"}	字符串格式化
		{$var|strip:"!"}			去除重复空格
		{$var|strip_tags}			去除HTML标签
		{$var|truncate:30:"!!"}		字符截取, 对中文不友好
		{$var|wordwrap:30:"<br>"}	行宽约束
	自定义变量调节器
		plugins 插件文件夹类  新建 modifier.名字.php
		//param $str 传入模板的值  param $v 传入模板的参数
		function Smarty_modifier_名字($str,$v){return 返回的值}
	内置函数
		{$var=}						变量赋值
		{append 'name' 'value' [index='新数组元素的下标'] [scope='分配的范围']}	追加
		{assign 'name' 'value' [scope]}	在模板运行时间变量赋值
		{capture 'name' [assign='分配到哪里'] [append='追加到数组']}{/capture}	捕获
		{config_load 'file' [section='加载节块'] [scope]}						加载config变量到模板
		{for $f=1 to 3|[max='迭代的最大次数']},{forelse}{/for}	循环 $f每次加1 大于3输出forelse
		{foreach name='循环名' from=$arr as [$key=>]$value},{foreachelse}{/foreach} 循环数组 数组为空时输出foreachelse
			附加属性 $value@index或$smarty.foreach.name.index
			@index		下标
			@iteration	迭代 默认1开始
			@first		第一次循环为true
			@last		最后一次循环为true
			@show 		数据显示true 不显示false
			@total		循环总次数
		{include file='包含路径'}	包含文件
		{section name='名称' loop='循环数组' [start='开始(0)' step='步阶(1)' max='最大循环次数']},{sectionelse}{/section}	遍历数组
			.index
			.index_prev
			.index_next
			.iteration
			.first
			.last
			.rownum		.iteration别名
			.loop		上次循环时的最后索引值
			.show
			.total
		{strip}{/strip}		去除标记中数据的首尾空格和回车
		{if},{elseif},{else}
		{ldelim},{rderlim}		用来转义模板定界符
		{literal}{/literal}		忽略smarty解析

		{while}{/while}	循环
		{block}			块
		{extends}		继承
		{debug}			调试
		{function name='函数名' [var='函数变量值']}{/function}
		{call}			调用
		{insert name='xxx'}		插入函数insert_xxx
		{include_php}	不建议
		{php}			不建议
	自定义函数
		{counter [name='名称' start='开始(1)' skip='步长(1)' direction='增/减(up)' print='输出(true)' assign='赋值变量']}	计数
		{cycle values='轮显的值' [print='输出(true)' advance='是否使用下一个值(true)' delimiter='分隔符(,)' assign='赋值变量']}	轮显效果
		{fatch file='file|http|ftp' assign='变量'}	载入文件赋值给变量
		{html_image file='path' [border='(0)' height='' width='' basedir='相对路径' alt='描述' href='url' path_prefix='输出路径的前缀']} 产生一个图像的HTML标签
		{html_table loop=$arr cols='' table_attr='属性'} 表格
		{html_radios name='名称' values='值的数组' output='显示值的数组' checked='已选元素' options='包含值和显示的关联数组' separator='分隔字符串' assign='数组'}	单选框
		{html_checkboxes name='名称' values='值的数组' output='显示值的数组' selected='已选数组' options='包含值和显示的关联数组' separator='分隔字符串' assign='数组' labels='label标签'}	复选
		{html_options values='值的数组' output='显示值的数组' selected='已选数组' options='包含值和显示的关联数组' name='名称'} 下拉框
		{html_select_date} 创建日期下拉框
		{html_select_time} 创建时间下拉框
		{mailto} 自动生成电子邮件链接
		{math}	允许模板设计者在模板中进行数学表达式运算
		{textformat}	格式化文本
	缓存
		$caching			开启缓存		bool类型的值, 默认为false
		$cache_lifetime		缓存过期时间 单位为秒	-1	永不过期		0	立即过期
		clearCache('file')			清除缓存
		clearAllCache('file')		清除所有缓存
		isCached('file')			缓存检测
		局部缓存  判断缓存是否存在时要加上id
			assign('','',true)		指定变量为局部不缓存
			{$var nocache=true}		模板指定局部不缓存
			{nocache}{/nocache}
		单页面多缓存
			display('','id')		此id必须唯一才能区别出所有不同的链接
		缓存集合
			display('',$id1.'|'.$id2)	用字符'|'分隔
	命名空间
		$data = $smarty->createDate()	创建一个数据对象
		$data->assign('',$v)			把值放到空间里面
		$smarty->display('',$data)

	过滤器
		registerFilter($type,$callback)
			$type	定义过滤器的类型
				pre 	预过滤器
				post 	后过滤器
				output	输出过滤器
			$callback	自定义函数

json
	json_encode(数组或对象)		返回一个json形式 string字符串
	json_decode(json对象[,true])	解析json对象 数组(true)或对象



静态化
	OB output_buffering 输出缓冲
	存储PHP锁生成的相应主体内容
	ob_start()			开启缓冲
	ob_get_contents()	读取缓冲
	ob_get_length() 	长度
	ob_clean()			清空
	ob_flush()			输出
	ob_get_clean()		获取清空
	ob_get_flush()		获取输出
	ob_end_clean()		清空
	ob_end_flush()

	ob_gzhandler() 		压缩
	后台添加时完成静态化网页保存文件地址到数据库 前台直接调用
	扩展问题
		静态页面中动态(即时)数据问题		AJAX
		静态化内容,一旦改动,都需要重新生成静态页面
		整站静态化,内容聚合页和内容详细页.其中详细页适合做静态化
		管理大量静态化文件.简单的分子目录存储.甚至分硬盘,分文件服务器存储
伪静态	不是优化效率的方案
	指的是URL优化的一种方式
	静态URL 动态URL主要取决于查询参数(queryString)
	静态化url的目的,是为了SEO(搜索引擎优化) 简化URL 美化URL
	优化URL
		利用web服务器提供的重写URL功能
		利用PHP自身对URL进行分析处理
			URL路由是TP(几乎所有主流框架)提供的,一种自定义分析URL,并解析到指定指定的方法

文件锁
	$fp = fopen('a.lock',r);		//打开锁文件
	flock($fp,LOCK_EX);			//开启锁 EX 写锁 SH 读锁
	flock($fp,LOCK_UN);			//释放锁
	fclose($fp);

文件锁定
bool flock($fp,operation[,int & woldblock])	//无法在NFS或其他网络文件系统中使用.他还无法在其他更早不支持文件锁定的文件系统中使用,例如FAT.在某些操作系统中,他是在进程级别上实现的,因此,如果你在多线程服务器API中使用,该函数也无法正确使用
	operation
		LOCK_SH			读操作锁定.这意味着文件可以共享,其他人可以读该文件
		LOCK_EX			写操作锁定.这是互斥额.该文件不能被共享
		LOCK_UN			释放已有的锁定
		LOCK_NB			防止在请求加锁时发生阻塞
//如果有两个脚本同时申请一个文件加锁无法确定哪一个进程会成功,这样就会导致更多的问题.使用数据库管理系统(DBMS),可以很好的解决这个问题
使用普通文件的几个问题
	当文件变大时,使用普通文件将会变得非常慢.
	在一个普通文件中查找特定的一个或者一组记录将会非常困难.如果记录是按顺序保存,亦可以使用某种二分法并结合按定长记录来搜索一个关键字域.如果你希望查找模式信息(例如,需要查找所有生活在Smalltown的客户),就不得不读入每一个记录并且进行逐个检查
	处理并发访问可能会遇到问题.已经了解了如何锁定文件,但是锁定可能导致我们前面介绍的竞争条件.它也可以导致一个瓶颈.如果一个站点具有太多的访问量,大量的用户就可能在能够创建订单之前必须等待该文件解锁.如果该等待时间太长,人们可能会到其他地方购买
	到目前为止,我们所看到的文件处理都是顺序的文件处理--也就是我们从文件开始处一直读到文件的结束.如果我们希望在文件中间插入记录或者删除记录(随机访问),这可能会比较困难--你将必须将整个文件读入到内存中,在内存中修改他,然后再讲整个文件写回去.如果这是一个很大的数据文件,这可能会带来巨大的开销
	除了使用文件访问权限作为限制外,还没有一个简单的方法可以区分不同级别的数据访问



PHP系统信息
获取系统类型及版本号：		php_uname() (例：Windows NT COMPUTER 5.1 build 2600)
只获取系统类型：			php_uname('s') (或：PHP_OS，例：Windows NT)
只获取系统版本号：			php_uname('r') (例：5.1)
获取PHP运行方式：         php_sapi_name() (PHP run mode：apache2handler)
获取前进程用户名：			Get_Current_User()
获取PHP版本：				PHP_VERSION
获取Zend版本：			Zend_Version()
获取PHP安装路径：         DEFAULT_INCLUDE_PATH
获取当前文件绝对路径：		__FILE__
获取Http请求中Host值：	$_SERVER["HTTP_HOST"]    (返回值为域名或IP)
获取服务器IP：            GetHostByName($_SERVER['SERVER_NAME'])
接受请求的服务器IP：		$_SERVER["SERVER_ADDR"] (有时候获取不到，推荐用：GetHostByName($_SERVER['SERVER_NAME']))
获取客户端IP：			$_SERVER['REMOTE_ADDR']
获取服务器解译引擎：		$_SERVER['SERVER_SOFTWARE']
获取服务器CPU数量：		$_SERVER['PROCESSOR_IDENTIFIER']
获取服务器系统目录：		$_SERVER['SystemRoot']
获取服务器域名（主机名）：	$_SERVER['SERVER_NAME'] (建议使用：$_SERVER["HTTP_HOST"])
获取用户域名：			$_SERVER['USERDOMAIN']
获取服务器语言：			$_SERVER['HTTP_ACCEPT_LANGUAGE']
获取服务器Web端口：		$_SERVER['SERVER_PORT']
获取请求页面时通信协议的名称和版本：  $_SERVER['SERVER_PROTOCOL']    例如，“HTTP/1.0”

echo @get_cfg_var('mysql.max_links')
echo function_exists(mysql_close)?'是':'否';  //是否支持mysql
服务器端信息 $_SERVER['SERVER_SOFTWARE']



curl
//win 安装配置
	win10
		在我的情况下，当运行Windows 10和Apache Httpd 2.4，我不得不添加我的PHP7根目录到Windows PATH，它解决了无法加载几个PHP扩展的问题。
	win7
		我还必须也将libssh2.dll复制到我的Apache24文件夹中，以便与我的PHP 5.6.2安装一起工作。 所以，我完全不得不做以下：
		移动到Windows \ system32文件夹：
		libssh2.dll，php_curl.dll，ssleay32.dll，libeay32.dll
		移动到Apache24 \ bin文件夹
		libssh2.dll

	取消注释extension = php_curl.dll

//初始化
$curl = curl_init()

//告诉我们的服务器请求的资源地址 (Note: 发出http请求, url地址一定是带http协议)
curl_setopt($curl, CURLPOT_URL, 'http://www.baidu.com/');

//post请求
	//开启post
	curl_setopt($curl, CURLOPT_POST, true);
	//设置携带的数据
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

//设置服务器是返回结果还是直接显示
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

//跳过https安全协议的证书认证
curl_setopt($curl, CURLOPT_SSL_VERIFHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

//不用返回header头信息
curl_setopt($curl, CURLOPT_HEADER, 0);

//错误信息
curl_error($curl)
curl_errno($curl)
curl_strerror($curl)
//curl信息
curl_info($curl)
curl_getinfo($curl)


//发出请求
curl_exec($curl);

//关闭资源
curl_close($curl);

//模拟文件上传
$data = new CURLFile('绝对路径');

//模拟cookie登录
	//先携带正确的用户名 密码请求服务器, 登录成功之后, 会将用户的信息保存到session 文件中, 并把session 文件的名字响应给curl, 我们需要把这把钥匙保存起来: CURLOPT_COOKIEJAR
	curl_setopt($curl, CURLOPT_COOKIEJAR, './cookie.txt');
	curl_setopt($curl, CURLOPT_POST, 1);
	$data = 'usrname=zhangwuji&password=admin123';
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	//以后在访问服务器的时候, 需要随身携带钥匙(保存 session 的文件名)
	curl_setopt($curl, CURLOPT_COOKIEFILE, './cookie.txt');
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);




function request($url, $type='get', $data=null, $dataType='json'){
	//资源
	$curl = curl_init();
	//设置地址
	curl_setopt($curl, CURLOP_URL, $url);

	//判断是否是 https
	$scheme = parse_url($url, PHP_URL_SCHEME)
	//返回url

	if('https' == $scheme){
		//不做服务器认证
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		//不做客户端认证
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	}

	如果是post请求
	if('post' == strtolower($type)){
		//设置post请求方式
		curl_setopt($curl, CURLOPT_POST, true);
		//设置post请求数据
		curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	}

	curl_setopt($url, CURLOPT_RETURNTRANSFER, true);//只获取页面, 不进行输出
	//发送请求
	$response = curl_exec($curl);
}

echo request('');


