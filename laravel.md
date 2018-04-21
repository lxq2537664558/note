### 安装



#### Composer 安装 larvel

##### 创建一个名为 larvel 的 Laravel 项目
composer create-project laravel/laravel --prefer-dist

##### 创建一个名为 blog 的 Laravel 项目
composer create-project laravel/laravel blog --prefer-dist

composer create-project laravel/laravel blog --prefer-dist "5.2.*"

#### 安装包
http://www.golaravel.com/download/

#### github 安装
https://github.com/laravel/laravel

#### 服务器错误 500
linux系统上，（以ubuntu为例），nginx、php-fpm 默认安装之后都是以
www-data
用户运行的，你可以看看这两个服务的原始配置文件，建议不要修改用户，而是把你的laravel项目目录也设置属主为
www-data
如下：
sudo chown -R www-data:www-data /path/to/your/laravel/project

nginx配置中的root html;去掉就好了。

### 运行环境要求

#### 1. php 版本 >= 5.5.9

#### 2. 开启 rewrite 和 vhost

nginx 开启重写
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

#### 3. 开启 php 扩展
php.ini 文件开启
J·K·罗琳
extension=php_openssl.dll
extension=php_mbstring.dll
extension=php_pdo_mysql.dll

mcrypt PHP 扩展  		php的加密扩展, 提供多种加算法
openssl 扩展				对传输的数据进行加密
mbstring 扩展			mbstring 提供了针对多字节字符串
Tokenizer PHP 扩展		php代码解析

### 路由
#### 文件位置
所有应用路由都定义在 App\providers\RouteServiceProider 类载入
的 app/Http/router.php 文件中

#### 基本路由
```php
//get
Route::get('/', function(){
	// '/' 表示根目录
	return view('weicome');
});
Route::post($uri, $callback);
Route::put($uri, $callback);
Route::patch($uri, $callback);
Route::delete($uri, $callback);
Route::options($uri, $callback);
```php

有时候需要注册路由响应多个 HTTP 请求-- 这可以通过 match 方法来实现. 或者, 甚至可以使用 any 方法注册一个路由来响应所有 HTTP 请求

```php
Route::match(['get', 'post'], '/', function(){});
Route::any('foo', function(){})
```

#### 路由参数
路由参数总是通过花括号进行包裹, 这些参数在路由被执行时会被传递到路由的闭包.

有时我们需要在路由中捕获URI片段
```php
Router::get('user/{id}', function ($id){});
```

多个路由参数
```php
Route::get('posts/{post}/comments/{comment}', function($postId, $commentId){});
```

有时候可能需要指定可选的路由参数, 这可以通过在参数名后加一个?标记来实现
```php
Route::get('user/{name?}', function ($name = null){});
```

参数限制
```php
Route::get('user/{id}', function($id){})->where('id', '[0-9]+');
```

全局设置
```php
public function boot(Router $router)
{
	$router->pattern('id', '[0-9]+');
	parent::boot($router);
}
```

#### 命名路由
命名路由为生成 URL 或重定向提供了便利. 实现也很简单, 在定义路由时使用数组键 as 指定路由名称
```php
Route::get('user/profile', ['as' => 'profile', function(){}]);
```
还可以控制器动作指定路由名称
```php
Route::get('user/profile', [
	'as' => 'profile', 'user' => 'NameController@action'
]);

此外, 除了在路由数组定义中指定路由名称外, 还可以通过在路由定义之后使用 name 方法链的方式来实现
```php
Route::get('user/profile', 'UserConteroller@showProfile')->name('profile');
```

##### 路由群组 &　命令路由
如果你在使用路由群组，　可以通过在路由群组的属性数组中指定　as 关键字来为群组中的路由设置一个公用的路由名前缀
```php
Route::group(['as' => 'admin::'], function(){
	Route::get('abd', ['as' => 'abd', function(){
		//路由被命名为 'admin::abc'
	}])
});


##### 为命名路由生成 URL
如果你为给定路由进行了命名, 就可以通过 route 函数为该命名路由生成对应 URL
```php
$url = route('profile');
$redirect = redirect()->route('profile');
```

如果命名路由定义了参数, 可以将该参数作为第二个参数传递给 route 函数
```php
Route::get('user/{id}/profile', ['as' => 'profile', funciton($id){}]);
$url = route('profile', ['id' => 1]);
```

#### 路由群组
路由群组允许我们在多个路由中共享路由属性, 比如中间件和命名空间等, 这样的话我们就不必为每一个路由单独定义属性. 共享属性以数组的形式作为第一个参数被传递给 Route::group方法

##### 中间件
要给路由群组中定义的所有路由分配中间件, 可以在群组属性数组中使用 middleware. 中间件将会按照数组中定义的顺序依次执行
```php
Route::group(['middleware' => 'auth'], function(){
	Route::get('/', function(){
		//使用 Auth 中间件
	});

	Route::get('user/profile', function(){
		//使用 Auth 中间件
	});
})

##### 命名空间
另一个通用的例子是路由群组分配同一个PHP命名空间给其下的多个控制器, 可以在分组属性数组中使用 namespace 来指定群组中所有控制器的公共命名空间
```php
Route::group(['namespace' => 'Admin'], function (){
	// 控制器在 'App\Http\Controllers\Admin' 命名空间下
	Route::group(['namespace' => 'User'], function(){
		//控制器在 'App\Http\Controllers\Admin\User' 命名空间下
	});
});
默认情况下, RouteServiceProvider 引入 routes.php 并指定其下所有控制器类所在的默认命名空间 App\Http\Controllers, 因此, 我们在定义的时候只需要指定命名空间 App\Http\Controllers 之后的部分即可

##### 子域名路由
路由群组还可以被用于子域名路由通配符, 子域名可以像URI 一样被分配给路由参数, 从而允许捕获子域名的部分用于路由或者控制器, 子域名可以通过群组属性数组中的 domail 来指定
```php
Route::group(['domain'] => '{account}.myapp.com'], function(){
	Route::get('user/{id}', function($account, $id){
		//
	});
});

##### 路由前缀
群组属性 prefix 可以用来为群组每个路由添加一个给定 URL 前缀, 比如, 你可以为所有路由 URL 添加 admin前缀
```php
Route::group(['prefix' => 'admin'], function(){
	Route::get('user', function(){
		// 匹配 '/admin/user' URL
	});
});

你还可以使用prefix 参数为路由群组指定公共路由参数
Route::group(['prefix' => 'accounts/{account_id}'], function(){
	Route::get('detail', function($account_id){
		// 匹配 accounts/{account_id}/detail URL
	});
});

#### 404页面设置
默认使用  //resaources/views/errors/404.blade.php
404 Not Found


```php
Route::get('/404' , function(){
	abort(404);
});

```

resource


Note: 路由参数不能包括 `-` 字符, 需要的话可以使用_替换

MethodNotAllowedHttpException in RouteCollection.php line 218
//说明当前路由的请求方式和路由规则的请求方式不匹配

laravel 跨级啊中所有的模板文件都是存放在 resources/views



### 请求
public function qingqiu(Request $request)
{
	//请求方法
	$request->method();
	//检测方式
	$request->isMethod('get');
	//请求路径
	$request->path();
	//获取完整的url
	$request->url();
	//获取请求的ip
	$request->ip();

	//参数的获取
	$request->input('name');
	//设置默认值
	$request->input('name', 'default');
	//检测参数是否存在
	$request->has('name');
	//提取所有参数
	$request->all();
	//提取部分
	$request->only(['name','id']);
	//剔除不需要的参数
	$request->except(['user','password']);
	//获取请求头信息
	$request->header('请求头名称');


	//设置cookie
	\Cookie::queue('name', 'value', 10)	//时间单位为分钟
	return response('')->withCookie('name', 'value', 10)
	//读取cookie
	\Cookie::get('name');
	$request->cookie('name');

	//将请求过来的参数 都闪存起来
	$request->flash();
	return back();
	//获取
	old('name');
	//将部分参数写入闪存中
	$request->flashOnly('title', 'price');
	//出去某些参数之外的参数
	$request->flashExcept('_token');
	//自定义删除
	\Session::flash('name', 'value');
	//读取
	session('name');
}


### 响应
//返回字符串
return '123';
//设置cookie
return response('')->withCookie('name', 'value', 10);
//返回json
return response()->json(['name'=>'value','age'=>11]);
//下载文件
return response()->download('./images/1.jpg');
//页面跳转  网站的内部路径 和 绝对路径
return redirect('/form');
//模板解析
return view('response');
//设置响应头
return response('')->header('name', 'value');
//设置返回内容并跳转
return '成功<script>lcation.href="/form"</script>';

kongzhiqi
### 控制器

Input::all() 			//获取值
Input::except('name') 	//除了name下标的值

//隐式控制器  如果是goods开头的路径 都是交给GoodsController来实现
Route::controller('goods', 'GoodsController');
goods/add
function getAdd(){}

//资源控制器
Route::resource('photo', 'PhotoController');

```php
namespace App\Http\Controllers;

Class IndexController extends Controller{
	public function index(Request $request)
	{
		$name = '123';
		$data = [
			'a' => 1;
		];
		//return view('my_laravel')->with('name', $name);
		//return view('my_laravel')->with('name', $name)->with('name', $name);
		return view('index', $data);
		return view('index', compact('data', 'title'));
	}

}
```

Crypt::encrypt() 		//加密
Crypt::decrypt() 		//解密

Hash::make('')		//单方面加密
Hash::check('plain-text', $hashedPassword)
Hash::needsRehash($hashed)

//admin
$2y$10$0Qb1B158i1QSTvAE8k1TbO4S656lHRmtbYyNtGZpdUiLkkyUvw2Ia

### 视图
resoutces/views/name.blade.php

asset()

TokenMismatchException in VerifyCsrfToken.php line 53
//说明当前的post 请求中缺少验证信息
在每一个 xxxcsdffvcaqwertyuiopjklklf;dssdfhgjzvcxnm,.nb

{{csrf_field()}}
{{csrf_token()}}

{{ method_field('PUT') }}

{{$name}}
@{{$name}} //不解析
{{$name or XXX}} //默认值 XXX ($name 为 null时)
{{isset($name)?$nme:'XXX'}} // 当$name没有时 输出 XXX
//默认转义
{!! $str !!}  不转义html标签

流程控制
@if()
@else
@endif

@unless() 			//除非
@endunless

@for()
@endfor

@foreach()
@endforeach

@forelse() 			//foreach 的一种扩展
@empty
没有数据
@endforelse

@while()
@endwhile

引入
@include('common.header');
@include('common.header', ['page' => '文章页面']);

@yield('content')			//单标签

@extends('layoutes.home')
@section('content', '更改的内容')


@section('content')
@show  					//父视图

@section('content')
@endsection 			//子视图里面显示


@parent 				//使用父级模板
	//我是yidel的继承



### 模型
```php
class User extends Model
{
	//设置表名
	protected $table = 'user';
	//设置主键字段
	protected $primaryKey = 'user_id';
	//设置不使用默认时间字段
	public $timestamps = false;
	//允许插入的字段
	protected $fillable = ['name'];
	//不允许插入的字段
	protected $guarded = ['name'];
}


User::find(1); 	//id = 1
$user = User::where('id', 1)->get();

### 配置文件
.env 环境快速配置

config('app.debug');
获取配置项

//配置数据库
config/database.php


### 数据库简单查询
use DB;

$pdo DB::connection()->getPdo();

$users = DB::table('user')->get();
$users = DB::table('user')->where('id',1)->get();
$users = DB::table('user')->where('id','>',1)->get();

//查询
DB::select('select * from goods where id < 50');
DB::select('select * from goods where id = ?', [20]);

//插入
DB::insert('insert into goods (id,name)values(0, "名字")');
DB::insert('insert into goods (id,price)values(?,?)',[0,'名字']);

//修改
DB::update('update goods set name = "小名" where id =20');
DB::update('update goods set name = ? where id = ?',['小名',20]);

//删除
DB::delete('delete from goods from where id < 30');
DB::delete('delete from goods from where id < ?',[40]);

//一般语句
DB::statement("create table test (id int primary key auto_increment, name char(40))");
DB::statement('drop table test');

//开启事务
DB::beginTransction();
//提交
DB::commit();
//回滚
DB::rollback();

//配置多个mysql信息
//操作多个数据库
DB::connection('slaver-1')->select();

### 构造器
####插入
//单条
DB::table('user')->insert([
	'name' => 'i名字'
]);
//多条
DB::table('user')->insert([
	['name' => '张三'],
	['name' => '李四']
]);
//获取最后插入的id
DB::table('user')->insertGetId([
	['name' => '王五']
]);

####更新
DB::table('user')->where('id','=',2)->update([
	'name' => '名字'
]);

####删除
DB::table('user')->where('id','<',100)->delete();

####查询
//多条
DB::table('user')->get();
//单条
DB::table('user')->first();
//查询单条结果中的某个字段值
DB::table('user')->value('username');
//获取结果集中某一个字段的所有值
DB::table('user')->lists('username');

####连贯操作
//设置字段
DB::table('user')->select('name','pass')->get();
DB::raw('count(id) count')   //select里面
//设置where条件
DB::table('user')->where('name','=','名字')->get();
DB::table('user')->where('cotes','>',100)->orWhere('name','=','John')->get();
DB::table('user')->	('id',[1,100])->get();
DB::table('user')->whereIn('id',[1,2,3])->get();
//排序
DB::table('user')->orderBy('id','decs')->get();
//分页
DB::table('user')->skip(5)->take(4)->get();
skip 偏移位置
take 获取数量
//连接表
DB::table('good_test')->leftJoin('cate','cate.id','=','good_test.cid')->where('goods_test.gid','<',20)->get();
DB::table('good_test')->leftJoin('cate', function($joinOn){
	$joinOn
		->on('id', '=', 'pid')
		->orOn('cid', '=', 'vd');
})->where('goods_test.gid','<',20)->get();
//计算
DB::table('good_test')->count();
DB::table('good_test')->max('price');
DB::table('good_test')->avg('price');

####sql语句记录
//获取到生成的Sql
Model::table()->where()->toSql();

放在路由文件的最上面
Event::listen('illuminate.query',function($query){
	var_dump($query);
});

### Eloquet
#### 模型限定
##### 模型所对应的默认的表名是在模型后面有s, 则表名跟模型名称同名
eg
	order => orders
	country => countries
##### 主键字段 id
#####时间字段 created_at updated_at

#### 操作
##### 添加
$model = new Model;
$model->age = 1;
$model->save();

##### 读取
$model = (new Model)->find(1);
echo $model->title;
echo $model['title'];

##### 删除
$model = (new Model)->find(1);
$model->delete();

##### 更新
$model = (new Model)->find(1);
$model->age = 2;
$model->save();

#### 关系
##### 一对一
return $this->hasOne('App\User', 'user_id');
##### 一对多
return $this->hasMany('App\User', 'user_id');
##### 关系创建
return $this->belongsTo('App\Country', 'country_id');
##### 多对多
return $this->belongs ToMany('App\Group', 'group_user', 'user_id', 'group_id');
###### 多对多的信息添加
$user = User::find(2);
$user->group()->attach(1);
$group = Group::find(1);
$user->group()->attch($group); //这里既可以放置一个id, 也可以放置一个模型对象
###### 多对多关系的删除
$user = User::find(1);
$group = Group::find(3);
$user->group()->detach($group);
###### 同步
$user = User::find(2);
$user->group()->sync([1,2,3]);

#### 方法
##### only()  返回集合中指定键的所有项目
$collection = collect(['product_id' => 1, 'name' => 'Desk', 'price' => 100, 'discount' => false]);
$filtered = $collection->only(['product_id', 'name']);
$filtered->all();
// ['product_id' => 1, 'name' => 'Desk']

###### pluck() 获取所有集合中指定「键」 对应的值
$collection = collect([
    ['product_id' => 'prod-100', 'name' => 'Desk'],
    ['product_id' => 'prod-200', 'name' => 'Chair'],
]);
$plucked = $collection->pluck('name');
$plucked->all();
// ['Desk', 'Chair']
你也可以指定要怎么给最后出来的集合分配键：
$plucked = $collection->pluck('name', 'product_id');
$plucked->all();
// ['prod-100' => 'Desk', 'prod-200' => 'Chair']


### 数据库迁移  migrate
laravel框架管理数据库结构的一种方式

#### 使用

##### 1 创建类文件
php artisan make:migration test
/database/migrtions

//迁移的时候执行
public function up()
{
	//判断表是否存在
	if(!Schema::hasTable('test')){
		//创建表
		// 表名是  没有前缀的 带s结尾 y是 ies
		Schema::create('test', function(Blueprint $table){
			$table->increments('id');
			$table->integer('password');
			$table->string('name', 64, false);
			$table->char('pwd');
			$table->timestamps();	//自动创建时间字段

			$table->primary('id');
			$table->index('password');
			$table->unique('username');

			->smallInteger()
			->first()
			->after('column')
			->nullable() 			//允许为空
			->default($value)
			->unsigned()
			->comment('my comment')
			//设置引擎
			$table->engine = 'myisam';
		});
	}else{
		//调整表结构
		Schema::table('users', funciton ($table){
			//判断字段是否存在
			if(!Schema::hasColumn('test','sex')){
				$table->tinyinteger('sxe')->comment('性别');
			}
			//修改字段类型
			//这里需要安装一个包, composer require doctrine/dbal
			$table->text('nickanme')->change();

			$table->dropColumn('phone');

			$table->index('group_id');

			if($this->hasIndex('test','unique')){
				$table->dropPrimary('id');
			}

			$table->dropUnique('name');
			$table->dropIndex('name');
		});
	}

	//创建字段

}


public function hasIdex($table, $name)
{
	$conn = Schema::getConnection();
	$dbschemaMabager = $conn->getDoctrineSchemaManager();
	$doctrineTable = $dbSchemaManager->listTableDetails($table);
	return $doctrineTable->hasIndex($name);
}
//回滚的时候执行
public funciton down()
{
	Schema::drop('test');
}

php artisan migrate
重置并重新运行所有的 migrations
php artisan migrate::refresh
// 回滚所有的数据库迁移
php artisan migrate:reset [--database[="..."]] [--force] [--pretend]

### 数据填充
#### 套路一
##### 创建注入文件(文件默认在 database/seed中)
php artisan make:seeder testSeeder

##### 在文件中填写注入代码
public function run()
{
	$arr = [];
	for($i = 0; $i < 20;$i++){
		$tmp = [];
		//返回20长度的随机字符串
		$tmp['username'] = str_random(20);
		$tmp['password'] = str_random(20);
		$tmp['group_id'] = rand(1,10);
		$tmp['email'] = rand(10000,99999).'@qq.com';
		$tmp['sex'] = rand(0,1);
		$tmp['age'] = rand(10, 60);

		$arr[] = $tmp;
	}
	DB::table('test')->insert($arr);
}


##### 运行指令
php artisan db:seed --class=testSeeder

#### 套路二
##### 创建注入文件
php artisan make:seeder testSeeder

##### 在文件中填写注入代码
public function run()
{
	$arr = [];
	for($i = 0; $i < 20;$i++){
		$tmp = [];
		//返回20长度的随机字符串
		$tmp['username'] = str_random(20);
		$tmp['password'] = str_random(20);
		$tmp['group_id'] = rand(1,10);
		$tmp['email'] = rand(10000,99999).'@qq.com';
		$tmp['sex'] = rand(0,1);
		$tmp['age'] = rand(10, 60);

		$arr[] = $tmp;
	}
	DB::table('test')->insert($arr);
}
y$z8v

##### 在 DatabaseSeeder
public function run()
{
	Model::unguard();
	$this->call(testSeeder::class);
	Model::reguard();
}

##### 运行指令
php artisan db:seed

### 自定义函数 自定义类文件
app/library/helper.php

在项目下的 commposer.json 中添加信息
"autoload":{
	"classmap":[
		"database"
	],
	"psr-4":{
		"App\\":"app/"
	} ,
	"files":[
		"app/Library/helper.php"
	]
},

composer dump-auto

### 工具
#### debugbar安装
composer require barryvdh/laravel-debugbar

在config/app.php里面的providers添加Barryvdh\Debugbar\ServiceProvider::class,

#### postman

#### IDE Helper 安装
composer require barryvdh/laravel-ide-helper

在 config/app.php 的 providers 中添加：
Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,

生成辅助文件：
php artisan ide-helper:generate
提示：需要首先清除 bootstrap/compiled.php，所以生成前需要执行 php artisan clear-compiled，生成后执行 php artisan optimize

配置 composer.json 以在每次提交之后执行。
"scripts":{
    "post-update-cmd": [
        "php artisan clear-compiled",
        "php artisan ide-helper:generate",
        "php artisan optimize"
    ]
},

### 验证器
//验证
$input = Input::all();

$rules = [
	'password' => 'required|between:6,20|confirmed',
	//confirmed   -----  _confirmation
];

$message = [
	'password.required' => '新密码不能为空',
	'password.between' => '新密码必须在6-20位之间!',
];

$validator = Validator::make($input, $rules,$message);

if($validator->passes()){
	echo 'ok';
}else{
	//dd($validator->errors()->all());
	return back()->withErrors($validator);
}



public function store(Request $request)
{
    $this->validate($request, [
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ], [
		'username' => '用户名不能为空',
    ]);
}

<!-- /resources/views/post/create.blade.php -->

<h1>创建文章</h1>

@if (count($errors) > 0)
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif


@if (count($errors) > 0)
    <figure class="highlight">
        <div class="mark">
            @foreach ($errors->all() as $error)
                <p> {{ $error }} </p>
            @endforeach
        </div>
    </figure>
@endif


#### Rules
accepted
active_url
after:YYYY-MM-DD
before:YYYY-MM-DD
alpha
alpha_dash
alpha_num
#####　数组
array
##### 范围
between:1,10
confirmed
date
date_format:YYYY-MM-DD
different:fieldname
digits:value
digits_between:min,max
##### 布尔
boolean
##### 邮箱
email
exists:table,column
##### 图片
image
##### in
in:foo,bar,...
not_in:foo,bar,...
##### 整数
integer
##### 数值
numeric
##### ip
ip
##### 最大最小值
max:value
min:value
##### 图片格式
mimes:jpeg,png
##### 正则
regex:[0-9]
##### 必填
required
required_if:field,value
required_with:foo,bar,...
required_with_all:foo,bar,...
##### 两个字段必须有一个必填
'email' => 'required_without:phone',
'phone' => 'required_without:email',

required_without_all:foo,bar,...
##### 验证字段值和指定的 字段 field 值是否相同。
same:field
##### 验证字段值的大小是否符合指定的 value 值。对于字符串来说，value 为字符数。对于数字来说，value 为某个整数值。对文件来说，size 对应的是文件大小(单位 kb)
size:value
##### 字符串
string
##### 验证字段值是否是有效的时区
timezone
unique:table,column,except,idColumn
##### Url
url



### 控制台
控制台创建
php artisan make:controller HelloController
php //artisan make:controller HelloController --plain
php artisan make:controller PhotoController --resource

GET			/photo				index	photo.index
GET			/photo/create		create	photo.create
POST		/photo				store	photo.store
GET			/photo/{photo}		show	photo.show
GET			/photo/{photo}/edit	edit	photo.edit
PUT/PATCH	/photo/{photo}		update	photo.update
DELETE		/photo/{photo}		destroy	photo.destroy


创建模板
php artisan make:model User
php artisan make:model User -m  //这里会自定创建一个数据迁移文件

创建中间件
php artisan make:middleware AuthMiddleware

查看路由
php artisan route:list

重新生成一个秘钥
php artisan key:generate




### 文件上传
//检查是否有文件上传
$request->hasFile('filekeyname');

//接收文件信息
$file = Input::file('myfile')

//验证上传文件是否有效
$file->isValid()

//获取文件名称
$file->getClientOriginalName()

//缓存在tmp文件夹中的文件名
$file->getFileName()

//缓存在tmp文件下的文件的绝对路径,
$file->getRealPath()

//上传文件的后缀
$file->getClientOriginalExtension()

//mimeType
$file->getMimeType()

//文件保存
$request->file('fileKeyName')->move('./upload', 'newFileName')

### 分页
$data = Model::orderBy('id', 'desc')->paginate(10);
return view('admin.model.index', compact('data'));

<div class="page_list">
    {{ $data->links() }}
</div>

<style>
    .result_content ul li span {
        font-size: 15px;
        padding: 6px 12px;
    }
</style>


### Ajax
post


function(){
	var x = new XMLHttpRequeset();

	x.onreadystatchange = function(){
		if(x.readyState == 4 && x.status == 200){
			alert(x.responseText);
		}
	}

	x.open('post', '/ajax', true);
	x.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

	x.send('_token={{csrf_token()}}&user=123');
}


### 　系统框架
####　请求生命周期
#####　简介
使用　现实世界　中的任何工具时，　若能了解它的运作原理，　你将会更有信心来用好他．　开发应用程序也一样

#### 门面
//获取配置文件夹  文件的内容
\Illuminate\Support\Facades\Config::get('web..web_title')

//公开分享 视图数据
\Illuminate\Support\Facades\View::share('navs', $navs);

fuzhu
### 辅助函数

#### 数组
//方法从数组中返回给定键对应的键值对列表
$array = array_pluck($array, 'developer.name', 'developer.id');

#### 路径
app_path() 		 	app文件夹的完整路径
base_path() 		项目根目录的完整路径



自动匹配 [模块 /控制器 /方法]：
Route::any('/{module}/{class}/{action}', function($module, $class, $action) {
    $ctrl = \App::make("\\App\\Http\\Controllers\\" . $module . "\\" . $class . "Controller");
    return \App::call([$ctrl, $action]);
});