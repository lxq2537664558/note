###Yii是一个基于组价你的高性能PHP框架,用于快速开发大型web应用

###安装yii
####basic应用模板的安装
#####composer安装
	php composer.phar global require "fxp/composer-asset-plugin:~1.1.1"
	php composer.phar create-project yiisoft/yii2-app-basic basic 2.0.8
		composer create-project --prefer-dist yiisoft/yii2-app-basic basic 2.0.7
#####归档文件安装
wget https://github.com/yiisoft/yii2/releases/download/2.0.7/yii-basic-app-2.0.7.tgz

#####GitHub托管
git clone https://github.com/yiisoft/yii2.git 

######运行环境检测
php requirements.php		检测环境是否支持Yii

######config/web.php
'coolieValidationKey' => '在此处输入你的密钥'  给cookieValidationKey 配置项添加一个密钥 (若i通过Composer安装,则此步骤会自动完成)

|文件名|说明|
|-----|----|
| basic	|					应用根目录 |
| ｜----commadngs/ |				包含控制台命名 |
| ｜----｜----test/ |					测试相关的文件 |
| ｜----｜----assets/	|				资源文件 |
|||
| ｜----contollers/ |			包含控制器类 |
| ｜----models/ |				包含模型类 |
| ｜----views/ |					包含视图文件 |
|||
| ｜----runtime/ |				包含Yii在运行时生成文件 |
| ｜----vendor/ |					包含已经安装的composer包,包括Yii框架自身 |
|||
| ｜----config/ |				包含应用配置及其他配置 |
| ｜----｜----console.php |			控制台应用用电配置信息 |
| ｜----｜----web.php |				web应用配置信息 |
| ｜----web/ |					Web应用根目录 |
| ｜----｜----assets/ |				包含Yii发布的资源文件(javascript和css) |
| ｜----｜----index.php |				入口文件 |
|||
| ｜----yii |					Yii控制台命令执行脚本 |

####advanced应用模块的安装
#####composer安装
	php composer.phar create-project yiisoft/yii2-app-advanced advanced 2.0.9

#####归档文件安装
######当前文件夹运行
	php init
	0				//开发者模式
	yes

######创建数据库 并修改 common/config/main-local.php
	db 数组里面修改为自己数据库的信息

######当前文件夹运行
	php yii migrate
	yes
成功的话数据库里面会多两个表

| 文件名 | 说明 |
|-------|-----|
| backend和frontend | 前后台入口, 相当于一个单独的 Basic 应用, 有自己的mvc目录, 配置文件目录, 入口文件的目录 |
| ｜----assets | 资源文件目录 |
| ｜----config | 配置文件目录 |
| ｜----controllers | 控制器 |
| ｜----models | 模型 |
| ｜----views | 视图 |
| ｜----web | 入口文件目录 |
| common | 是一个公用的地方的地方, 比如一些前后台公用的模型文件就可以放在这里面, 博客系统里面的文章模型类, 评论模型类都会放在这里, 前后台公用 |
| console | 控制台入口用来控制执行的程序, 或者需要在更底层的操作系统上运行的功能 |
| environments | 放环境的配置文件 |

####Advaced VS Basic
#####Advaced 版本的增强
* 前后台分离
* 建好了基于数据库链接的用户模型, 并实现了对这个用户模型的认证
* 写好了注册, 重置密码等功能
#####Advanced 相当于2个 Basic
Advanced 模板具有 Basic 模板的所有功能

可以当 Advanced 版应用里面有2个 basic 版应用, 分别是前台和后台. 并且它们之间可以有联系

####Advaced 模板中的别名
#####别名
别名用来表示文件路径和 URL, 目的是避免了在代码中硬编码一些绝对路径和 URL. 一个别名必须以 `@` 字符开头

#####别名的设置
用 Yii::setAlias() 方法来设置
Yii::setAlice('@foo','/path/to/foo');			//文件路径的别名
YIi::setAlias('@bar','http://www.examplecom')	//URl别名

#####别名的使用
$cache = new FileCache(['cachePath' => '@runtime/cache']);

#####Advanced 模板中已预定义的别名
| 别名 | 说明 |
|-----|------|
| @yii | framework directory |
| @app | base path of currently running application |
| @common | common directory |
| @frontend | frontend web application directory |
| @backend | backend web application directory |
| @console | console directory |
| @runtime | runtime directory of currently running web application |
| @vendor | Composer vendor directory |
| @web | base URL of currently running web application |
| @webroot | web root directory of currently running web application | 


###请求的生命周期
1.  用户向入口脚本web/index.php发起请求
2.  入口脚本加载应用配置并创建一个应用实例去处理请求
3.  应用通过请求组件解析请求的路由
4.  应用创建一个控制器实例去处理请求
5.  控制器创建一个操作实例并针对操作执行过滤器
6.  如果任何一个过滤器返回失败,则操作退出
7.  如果所有过滤器都通过,操作将被执行
8.  操作会加载一个数据模型,或许是来自数据库
9.  操作会渲染一个试图,把数据模型提供给他
10. 渲染结果返回给响应组件
11. 响应组件发送渲染结果给用户浏览器


###入口文件 web/index.php
```php
defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');			//开启开发模式

require(__DIR__ . '/../vendor/autoload.php');
require(__DIR__ . '/../vendor/yiisoft/yii2/Yii.php');	//包含yii类文件

$config = require(__DIR__ . '/../config/web.php');		//载入config/web.php 配置

(new yii\web\Application($config))->run();				//实例化应用主体 执行 run()
```

###应用主体
####简介
\yii\web\Application类的实例

是管理 Yii 应用系统整体结构和生命周期的对象

每个入口脚本只能创建一个应用主体

他是一个全局可访问的单例.同时它也是一个服务定位器,能提供request,response,db等等特定功能的组件

**可以用 \Yii::$app 来访问应用**

#####应用主体的配置
$config 变量给应用主体这个对象的属性进行初始化赋值

$config变量是从配置文件 config/web.php 加载而来的

| 名称 | 说明 |
|-----|-----|
| id |			区分别的应用主体的标识id |
| basePath |	应用的根目录 |
| defaultRoute |当没有路由时  默认访问的路由 |
| components |	注册的应用组件 |
| language | 	设置语言 |

**可以通过 \Yii::$app->language = 'zh-CN';	来设置**

###路由器	rooter
	入口文件?r=控制器/方法

	'components' => [				//路由映射
		
	],

	/vendor/yiisoft/yii2/web/UrlManager.php
		$url="$baseUrl?{$this->routeParam}=".urlencode($rouet); //对url进行编码
		$url="$baseUrl?{$this->routeParam}=".$rouet; //对url进行编码


	post访问受到限制  防止CSRF攻击
	//全局
	$config=[
		'request'=>['enableCsrfValidation'=>false,
	]
	//控制器
	public $enableCsrfValidation = false;
	//视图表单
	<input name='_csrf' type='hidden' id='_csrf' value="<?= Yii::$app->request->scrfToken ?>">


###控制器
####简介
从yii\base\Controller继承来, 负责处理请求和生成响应

控制器主要由动作组成, 动作是控制器类中的方法, 一个动作对应一个页面

####
```php
namespace app\controllers;
use yii\web\Controller;
class IndexController extends Controller{
	//操作以cation开头
	public fuction actionIndex(){

	}
}
```
$this->redirect(['test/index']);	//重定向
$this->goHome();					//返回上一级目录
$this->goBack();					//返回上一级目录
$this->refresh();					//刷新当前页面

return $this->render('index',$params=[]);		 //打开views/控制器/idnex 页面
	1 别名开头,路径路径指定view文件			@app/views/site/about.php
	2 //开头,使用app目录下面的views			//view/site/about.php
	3 /开头,使用当前module中的views 		/views/site/about.php
	4 直接使用字符串 如 about  ViewContextInterface接口返回view
return $this->render('index'[,$arr]) //传送数据
return $this->renderPartial('index',$data['name']); //不使用模板
return $this->renderPartial('index',compact('user','article'));
return $this->renderContent('test');	//传送一个变量
return $this->renderFile('full file name',['test'=>5];
return $this->renderAjax('auto',['test'=>'test']);


$this->registerMetaTag(['name'=>'author']);
$this->registerLiinkTag(['rel'=>'archives']);
$this->registerCss(css代码);
$this->registerCssFile(css文件url);
$this->registerJs(js代码);
$this->registerJsFile(js文件url[,View::POS_HEAD|POS_BEGIN|POS_END]);

	事物
	$trans = \Yii::$app->db->beginTransaction();	//开启事物
	$trans->commit();								//提交事物
	$trans->rollback();								//回滚事物

###视图		views/控制器/方法名
####简介
视图是在 yii\web\View 应用组件的帮组下, 依据视图模板文件, 进行构造和渲染完成的

视图模板文件主要由 HTML 代码和展示类 PHP 代码组装成

####视图文件路径
控制器器渲染的视图文件默认存放在 @app/views/ControllerName 目录下

####视图中的变量
/* @var $this yii\web\View */
/* @var $form yii\widgets\ActiveForm */
/* @var $model app\models\LoginForm */

#####$this(预定义)
$this 是指向 yii\web\View 应用组件的实例, 负责管理和渲染视图模板文件

$this->title, 属性用来设置页面的标题

#####$content(预定义)
<?= $content ?>
控制器渲染出来的结果, 每一页的结果不同

#####$name(自定义)
控制器传入的变量

####布局
布局是一种特殊的视图, 代表多个视图的公共部分

#####创建视图
布局也是视图, 它可像普通视图一样创建 默认存储在 @app/views/layouts 里
#####变换布局
默认会使用 @app/views/layouts/main.php布局文件

控制器类中改变: public $layout = 'xx';
控制器方法中改变:$this->layout = 'xx';

	Note: layout 的值为 false 时表示不适用模板


//跳转到public/seek
<?php echo yii\helpers\Url::to(['public/seek'])?>


定义数据块
    <?php $this->beginblock('block1');?>
    <h1>1233</h1>
    <?php $this->endBlock();?>

过滤
	<?php use yii\helpers\Html;?>
	<?=Html::encode($name);?>						过滤javascript代码 还有javascript源码
	<?php use yii\helpers\HtmlPurifier;?>
	<?=HtmlPuriffier::process($view_hello_str);?>	彻底过滤掉javascript代码
	<?php use yii\bootstrap\ActiveForm;?>			//该类帮助创建form组件
		<?php $form = ActiveForm::begin();?>
			<?php echo $form->field($admin,'adminuser')->textInput(["class"=>"span12","placeholder"=>"管理员账号"]);?>
		<?php ActiveForm::end();?>

###配置数据库	config/db.php
	'class' => 'yii\db\Connection',
	'dsn' => 'mysql:host=localhost;dbname=yii2basic',
	'username' => 'root',
	'password' => '',
	'charset' => 'utf8',
	'tablePrefix' => '表前缀'

###模型  models/Test.php
####简介
Model层一般继承2个类,一个是\yii\db\ActiveRecord, 一个是\yii\base\Model

基类 yii\base\Model 支持许多实用的特性
* 属性: 表现业务数据, 可以像普通类属性或数组一样被访问
* 属性标签: 指定属性显示出来的标签
* 块赋值: 支持一步给许多属性赋值--只用一行代码将用户所有的表单输入填充到一个模型
* 验证规则: 确保输入数据复合所声明的验证规则--可调用yii\base\Model::validate()来验证收到的数据
* 数据导出: 允许模型数据导出为自定义格式的数组 Model 类也是更多高级模型 如 Active Record 活动记录的基类

####模型属性的定义
#####方法一
直接在类里面创建
public $attribut;

#####方法二
覆盖 yii\base\Model::attributes() 来定义属性, 该方法返回模型的属性名. 例如 yii\db\ActiveRecord 返回对应数据表列名作为它的属性名, 注意可能需要覆盖魔术方法如 __get(), __set() 使属性像普遍对象属性被访问
public function attributes(){
	return array_merge(parent::attributes(),['authorName']);
}

####ActiveRecord
ActiveRecord是直接关联的数据库的表,并需要tableName()进行关联，而Model并不直接关联数据表，字段由自己定义

ActiveRecoed相对Model也集成了需要直接查询的函数等。

```php
	namespace app\models;
	use yii\db\ActiveRecord;
	class Test extends ActiveRecord{
		//表名
		public static function tableName(){
			return '{{%test}}';		//config里面有设置表前缀
			// return 'shop_text'   表名
		}
		//验证器
		public function rules(){ return array}


		//生成form表单时映射的名称
		public function attributeLabels(){
			return [
				'字段名' => '映射的名称',
			];
		}

		public functino getCustomer(){
			//获取多
			return $this->hasMany(Order::className(),['customer_id'=>'id'])->asArray();
			//获取一条
			return $this->hasOne(Customer::className(),['id'=>'customer_id'])->asArray();
		}
		//场景
		public function scenarios(){
			return[
				'scenario1' => ['id','title'],		//场景1
				'scenario2' => ['id']				//场景2
			]
		}
	}
```
#####验证器 rules
######safe： 不验证的字段(安全)
['字段,多个字段可以是数组','safe'],
[[‘字段’,‘字段’],‘safe’]

######required：不能为空，必须验证
['字段,多个字段可以是数组','required','message'=>’不能为空’], 
[[‘字段’,‘字段’],多个字段可以是数组','required','message'=>’不能为空’],

######boolean		布尔值  验证字段是否为0 或 1
['字段','boolean','trueValue'=>true,'falseValue'=>false,'strict'=>true]
    trueValue	代表真的值,默认为'1'
    falseValue	代表假的值,默认为'0'
    strict		是否要求待测输入必须严格匹配 trueValue 或 falseValue. 默认为false

######compare：对比验证
['字段','compare','message'=>'提示信息'],   	//检查'password'特性的值是否与'password_repeat'的值相同
['字段','compare','compareValue'=>30,'operator'=>'>=','message'=>'提示信息'], //检查字段是否大于等于30
    compareAttribute	用于与原特性相比较的特性名称,当该验证器用于验证某目标特性时,该属性会默认为目标属性加后缀_repeat 举例来说,若目标特性为password,则该属性默认为password_repeat
    compareValue		用于与输入值相比较的常量值.当该属性与 compareAttribute属性同时被指定时,该属性优先被使用.
    operator			比较操作符.默认为==,以为着检查输入值是否与compareAttribute或comparevalue的值相等.
        == === != !== > >= < <=

######date 	时间格式验证	验证输入值是否为适当的date time 或者datetime
[['from','to'],'date']
    format		待测的 日期/时间 格式 默认值为'Y-m-d'
    timestampAttribute	用于保存用输入时间/日期转换出来的UNIX时间戳的特性

######default 默认值 			该验证器并不进行数据验证.而是给为空的待测特性分配默认值
['字段','default','value'=>null]
[['from','to'],'default','value'=>function($model,$attribute){
return date('Y-m-d',strtotime($attribute === 'to' ? '+3 days' : '+6days'));}],
    //若'from'和'to'为空,则分别给他们分配自今天起,3天后和6天后的日期

######double：双精度数字验证 ['字段','double',’min’=>’最小的值’,’max’=>’最大的值’ , ‘tooSmall’ => ‘小于最小值的提 示’,’tooBig’=>‘小于最大值的提示’,‘message’=>’必须是个数字’],

######email： 邮箱验证 ['字段','email','message'=>'提示信息'],
in： 范围值验证 ['字段','in',‘range’=>‘范围值’,'message'=>'提示信息'],

######Integer： 整型数字验证
['字段','integer','message'=>'提示信息'],

######match： 正则验证
['字段','in',‘pattern’=>‘/正则/’,'message'=>'提示信息'],

######string：字符串验证
['字段','string', ‘min’ => ‘字符串最小长度’ , ‘max’ => ‘字符串最大长度’ , 'tooShort'=>'字 符串过短提示',‘tooLong’1=>‘字符串过长提示’],

######unique：唯一验证
['字段','unique','message'=>'提示信息'],

######captcha：验证码验证
['字段','captcha','captchaAction'=>'login/captcha','message'=>'提示信息'],
    caseSensitive	对验证代码的对比是否要求大小写敏感 默认为 false
    captchaAction	指向用于渲染CAPTCHA图片的yii\captcha\CaptchaAction的路由 默认为 'site/captcha'
    skipOnEmpty		当输入为空时,是否跳过验证.默认为false也就输入值为必须项

######file 	文件验证
['文件字段','file','extensions'=>['png','jpg','fig'],'maxSize=>1024*1024*1024],  //检查 格式是否为png jpg gif 的上传图片  文件大小必须小于 1MB
extensions		可接受上传的文件扩展名列表.他可以是数组,也可以是用空格逗号分隔各个扩展名的字符串("gif,png").扩展名大小写不敏感.默认为null 意味着所有扩展名都被接收
    mimeTypes		可接收上传的MIME类型列表.它可以是数组,也可以是用空格或逗号分隔各个MIME的字符串("image/jpeg,image/png") Mime类型名是大小写不敏感的.默认为null
    minSize			上传文件所需最少多少Byte的大小.默认为null
    maxSize			上传文件所需最多多少Byte的大小.默认为null
    maxFiles		给定性最多能承载多少个文件.默认为1,代表只允许单文件上传.若值大于1,那么输入值必须为包含最多maxFiles个上传文件元素的数组.
    checkExtensionByMimeType	是否通过文件的MIME类型判断其文件扩展.若由MIME判定的文件扩展与给定文件的扩展不一样,则文件会被认为无效.默认为true,代表执行上诉检测

######自定义函数验证规则
['字段','自定函数',‘params’=>‘传入自定义函数 params 的值’],
```php
public function checkPassword($attribute,$params){//自定义函数
    if(empty($this->$attribute)){
        $this->addError($attribute,$params);
    }
}
```

######错误返回
'message' => '返回的信息'

######指定字段验证的场景
'on'=>'login'
'on'=>['login','index']

$test->scenario = 'scenario1'//指定场景   load()使用时进行匹配
$test->load($arr,'data');	//给test添加 $arr['data'] 数据  必须通过rules验证才能把数据加入对象
	load方法可以直接加载$_POST等数据,而POST的数据下标必须跟Model的类名一致,另外可以load的字段必须出现在rules方法的数组中,不然也无法直接赋值

$test->validate();			//验证
if($test->hasErrors()){}  	//判断错误

if(!$model->validate()){				//验证
	print_r($model->getErrors());		//获取错误信息
}


//获取子模块
$ctrl = \Yii::$app->getModule('admin');
//调用子模块的操作
$ctrl->runAction('default/index');


###数据操作 curd
	
####ActiveRecord类型的增删改查
ActiveRecord (活动记录, 简称AR类) 提供了一套面向对象的接口, 用以访问数据库中的数据
- 一个AR类关联一张数据表, 每个AR对象对应表中的一行
- AR对象的属性, 对应为数据库的列
- 可以直接以面向对象的方式来操纵数据表中的数据, 这样就不需要写SQL语句就能实现数据库的访问

all() 		执行查询, 并返回 AR 对象
one()

where() 	查询条件
orWhere()
andWhere()

orderBy() 	排序
addOrderBy()

count() 	返回复合查询条件的记录数
limit() 	取出查询结果的条数
with()		指定关联表的字段

hasOne()	用于多对一 一对一
hasMany() 	用于一对多
控制器没有找到order属性会使用__get()魔法函数 加载模型里getOrder()函数 自动判断查询的数据 在语句最后加上all()或one()
			findAll
				\app\models\Article::findAll([‘status = :id’,[':id'=>‘1’]);//查询 Article,status 为 1 的所有数据
				$data = Test::finAll([3,4,5]);	//获取多条
			findOne 
				\app\models\Article::findOne(1); //直接根据 id 查询 
				\app\models\Article::findOne('status = :id',[‘:id’=>‘1’]); //根据指定条件查询
			fin 
				\app\model\Model::find()->where(['id'=>1])->all();
										   		['>','id',0]			ID大于0
										   		['and', 'id=1','id=2']
										   		['or', 'id=1', 'id=2']
										   		['in', 'id', [1,2,3]]
										   		['between','id',1,2]	ID 1~2
										   		['like','title',['title1','sample']] %title1% and %sample%
				\app\model\Model::find()->where([‘status’=>‘1’])->all();  
				\app\model\Model::find()->where(‘status=:status’,[‘:status’=>‘1’])->all(); 
				\app\model\Model::find()->where([‘status’=>‘1’])->orderBy(‘dateDESC’)->all(); 
				\app\model\Model::find()->where([‘status’=>‘1’])->orderBy(‘dateDESC’)->offset(5)->limit(3)->all();
			findBySql
				\app\model\Model::findBySql('select * from test where id=:id',[':id' => 1])->all();
				\app\model\Model::findBySql($sql,[':id'=>1])->asArray()->all();	//把获取到的对象转换为数组
			//批量查询
				foreach(\app\model\Model::find()->batch(1) as $tests){
					print_R(count($tests));
				}
		更新
			更新一条数据 
				$one = \app\models\Article::findOne(1); 
				$one->title=‘changetitle’; 
				//save 函数第一个参数默认为 true, 就是更新或插入启动验证 
				//如果不想使用验证可以用 save(false); 
				$one->save();
			更新指定属性 updateAll(‘更新的属性’,‘条件’,[条件对应的值]) 
				\app\models\Model::updateAll([‘title’=>‘changetitle’],[‘id’=>1]);
				$data = Model::updateAllCounters(['num1'=>1],['id'=>8]); //id为8的字段 num加1
		添加
			$model=new \app\models\Model(); 
			$model->title=‘newone’;
			$model->content=‘thisisnew’; 
			$model->save();
			//获取添加id
			$id = $model->attributes['id']
		删除
			delete
				\app\models\Article::findOne(1)->delete();
				\app\models\Article::find()->where(['id'=>1])->all();
				$res[0]->dalete();
			deleteAll 
				\app\models\Article::deleteAll([‘id’=>2]);	
				\app\models\Article::deleteAll('id>:id',array(':id'=>0));
	\yii\db\Query 查询
		select() 方法
			使用字符串或者一个数组来制定需要查询的字段
				$query = (new \yii\db\Query()); 
				$query->select(['id, email']);
				$query->select('user.id AS user_id, email');
				$query->select(["COUNCAT(first_name,'',last_name) AS full_name", 'email']);
			子查询
				//SELECT `id` , (SELECT COUNT(*) FROM `user`) AS `count` FROM `post`
				$subQuery = (new Query())->select('COUNT(*)')->from('user');
				$query = (new Query())->select(['id','count' => $subQuery])->from('post');
			你可以调用 yii\Query::addSelect() 方法来选取附加字段
				$query->select(['id', 'username'])->addSelect(['email']);
			没有调用select()方法,那么选择的将是'*'
		from() 方法
			from() 方法指定了 SQL 语句当中的FROM 子句.
				$query->from('user');
			from中的表名可包含数据库前缀以及别名
				$query->from(['public.user u','public.post p']);
				$query->from('public.user u', 'public.post p');
			子查询
				//SELCT * FROM (SELECT `id` FROM `user` WHERE status=1) u
				$subQuery = (new Query())->select('id')->from('user')->where('status=1');
				$query->from(['u' => $subQuery]);
		where() 方法
			字符串格式
				'status=1'
			键值对数组格式
				['status' => 1, 'type' => 2]
			操作符格式
				['like', 'name', 'test']
			如果数据是用户提交时, 必须使用数据绑定
				$quer->where("status=:status")->addParams([':status'=>$status]);
		groupBy() 方法
			//... group by `id` , `status`
			$query->groupBy(['id', 'status']);
			可以调用addOrderBy() 来为 group by 子句添加额外的字段
				$query->groupBy(['id', 'status'])->addGroupBy('age');
		having() 方法
			//... HAVING `status` =1 
			$query->having(['status'=>1]);
			可以调用 andHaving() 或 orHaving() 方法来为 HAVING 子句追加额外的条件
			//... HAVING(`status`=1) AND (`age`>30)
			$query->having(`status`=1)->andHaving(['>', 'age', 30]);
		orderBy() 方法
			$Query->orderBy(['id'=>SORT_ASC,'name'=>SORT_DSC]);
			也可以使用字符串声明, 写法象原生的 SQL 语句
				$query->orderBy('id ASC, name DESC');
		limit() 和 offset() 方法
			用来指定 SQL 语句当中的 LIMIT 和 OFFSET 子句
			//...limit 10 offset 20
			$query->limit(10)->offset(20);
		indexBy() 方法
			indexBy('id')  把id 的值作为 数组的
		join() 方法
			$query->join('LEFT JOIN', 'post', 'post.uesr_id = user.id');
						  INNER JOIN ,'链接的表名称','连接的条件 ='     //可加连接条件绑定的参数
						  RIGHT JOIN
		union() 方法
			用来指定 SQL 语句当中的 UNION 子句的
			$query1 = (new \yii\db\Query())->select('id, category_id AS type, name')->from('post')->limit(10);
			$query2 = (new \yii\db\Query())->select('id, type, name')->from('user')->limit(10);
			$query1->union($query2);
		all()		返回一个由行组成的数组
		one() 		返回结果集的第一行
		column() 	返回结果集的第一列
		scalar() 	返回结果集的第一行第一列的标量值
		exists() 	返回一个表示该查询是否包含结果集的值
		count() 	返回 COUNT 查询的结果
		sum() 		返回指定列和值
		average() 	返回指定列的平均值
		max() 		返回指定列的最大值
		min() 		返回指定列的最小值
		//查询一条 id 等于 2 的数据 

		$db->select('id')->from('mrs_article')->where("id=:id",[':id'=>2])->one(); 
		$db->select('id')->from('mrs_article')->where([‘id’=>1])->one(); 
		//查询多条 
		$db->select('id')->from('mrs_article')->where([‘status’=>‘1’])->all(); //in 查询多条 
		$db->select('id')->from('mrs_article')->where([‘id’=>[1,2]])->all(); //根据时间排序 ,并且从第 5 条开始获取 3 条 
		$db->select(‘id’)->from(‘mrs_article’)->orderBy(‘dateDESC’)->offset(5)->limit(3)->all() 
		//查询数据总个数 
		$db->select('id')->from('mrs_article')->count();
	Yii::$app->db 进行增删改查 	
		① 查询数据 
			//查询一条数据 \Yii::$app->db->createCommand(“SELECT*FROMmrs_article”)->queryOne(); 
			//绑定单个防注入参数 
			\Yii::$app->db->createCommand(“SELECT * FROM mrs_article where id=:id”) ->bindValue(“:id”,2)->queryOne(); 
			//绑定多个防注入参数 \Yii::$app->db->createCommand(“SELECT * FROM mrs_article where id=:id AND status=:status”)->bindValues([‘:id’=>1,‘:status’=>‘1’])->queryOne(); 
			//查询多条数据 
			\Yii::$app->db->createCommand(“SELECT*FROMmrs_article”)->queryAll(); 
			//查询指定数据的字段的数据 $db=\Yii::$app->db; $db->createCommand(“SELECTCOUNT(*)FROMmrs_article”)->queryScalar();
		② 更新数据 
			$db=\Yii::$app->db->createCommand(); 
			$db->update(‘mrs_article’,[‘status’=>0],“id=:id”,[‘:id’=>1])->execute();
		③插入数据 
			$db=\Yii::$app->db->createCommand(); 
			$db->insert(‘mrs_article’,[‘title’=>’newRecord’])->execute();
		④删除数据 
			$db=\Yii::$app->db->createCommand(); 
			$db->delete(‘mrs_article’,“id=:id”,[‘:id’=>1])->execute();	
	
	

	//一对一的查询
	$article = Article::findOne(1);
	$category = $article->hasOne('app\models\Category',['id'=>'cate_id'])->all();
		写在模型里面  自定义方法 getOrder() 
		public function getOrder(){
			return $this->hasMany(Order::className(),['oreser_id'=>'cate_id']->asArray()
		}		
		控制器里面调用
		$category->order;
		
		
	//一对多的查询
	$category = Catrgory::findOne(1);
	$articles = Article::find()->where(['cate_id'=>$category->attributes['id']])->all();
	$articles = $category->hasMany(Artile::className(),['cate_id'=>'id'])->all();	
		写在模型里面  自定义方法 getOrders() 
		public function getOrders(){
			return $this->hasMany(Order::className(),['customer_id'=>'id']->asArray()
		}		
		控制器里面调用
		$category->orders;
		控制器没有找到orders属性会使用__get()魔法函数 加载模型里getOrders()函数 自动判断查询的数据 在语句最后加上all()或one()
		
	//关联查询
	$costomer = Customer::find()->where(['name'=>'zhangsan'])->one();
	$orders = $customer->hasMany(Order::className(),['customer_id'=>'id'])->asArray()->all()
	
	//多次一对一查询  getCategory为模型方法
		//使用for循环
		$articles = Article::find()->all();
		foreach ($articles as $article){
			$category[] = $article->category;
		}
		//优化 原理是使用join链接查询
		$articles = Article::find()->with('category')->asArray()->all();

	//关联查询结果缓存

	//大数据节省内存处理
	$data = Test::find()->asArray()->all();	//把资源类型转换为array
	//获取全部数据 每次两条添加进$data数组
	foreach(Test::find()->batch(2) as $v){
		$data[] = $v;
	} 

	joinWith进行表关联

	我们都知道可以用join on来写多个表之间的关联。先看看yii2中joinWit的声明
	joinWith( $with, $eagerLoading = true, $joinType = 'LEFT JOIN' )
	$with 数据类型为字符串或数组，
	如果为字符串，则为模型中定义的关联的名称（可以为子关联）。
	如果为数组，键为model中以getXXX格式定义的关联，值为对这个关联的进一步的回调操作。
	$eagerLoading 是否加载在$with中关联的模型的数据。
	$joinType 联接类型，可用值为：LEFT JOIN、INNER JOIN，默认值为LEFT JOIN

	在控制器里面调用	
	$orders = Customer::find()->joinWith('orders')->where(['customer.id' => '1'])->all();
	

	



$request = \YII::$app->request;			//应用组件


$request->get('id',$i);					//获取get id 当id没有值时  使用$i的值为默认值
$request->post('id',$i);
$request->post();
$request->get();

bool $request->isGet					判断是否是get方式接收的数据 
bool $request->isPost
	 $request->isAjax

$requset->userAgent						获取用户浏览器
$request->userIP						获取用户ip

//生成url地址	 绝对路径(有http 和域名)
Yii::$app->urlManager->createAbsoluteUrl(['模块/控制器/方法,id=>$id])
//生成Url地址
Yii::$app->urlManager->createUrl(['post/datail', 'id' => $this->id, 'title' => $this->title]);


\Yii::$app->end();						结束

分页组件 
\yii\data\Pagination,而在view中可以直接调用\yii\widgets\LinkPager直接生成分页的 Html. 

<?php
	//pageSize 则是每页显示的个数 
	//在config 建立params.php  设置配置属性
	$pageSize = Yii::$app->params['pageSieze']['mange'];
	//获取总页数
	$model = Admin::find();

	$count = $model->count();
	$pagination = new \yii\data\Pagination([‘totalCount’=>$count,‘pageSize’=>$pageSize]); 
	//offset 还有 limit 主要用于数据库查询 
	
	//分页的偏移量 echo $pagination->offset;
	//每页读取的个数 echo $pagination->limit;

	$data = $model->offset($pagination->offset)->limit($pagination->limit)->all() ;
	return $this->render('index',['data'=>$data,'pagination'=>$pagination]); 	
?>
	//生成分页 html 代码 
	<div class='pagination pull-right'>
	<?php
		echo \yii\widgets\LinkPager::widget([
			‘pagination’=>$pagination,	//分页类
			'prevPageLabel' => '&#8249;',//上一页字符设置
			'nextPageLabel' => '&#8250;',//下一页字符设置
			//‘options’=>[				//设置 html 属性 
			//	‘id’=>‘page’ 
			//], 
		]);
	?>
	</div>


email		/vendor/yiisoft/yii2-swiftmailer/mailer.php
	web.php	
		'mailer'=>['class'=>'yii\swiftmailer\Mailer'],		//指定email 类
		'useFileTransport'=>false,		//改成false才能发送邮箱	
		
		'transport' => [
			'class' => 'Swift_SmtpTransport',
			//设置邮箱 可发送邮件
			'host' => 'smtp.163.com',			//邮箱服务器 
			'username' => 'username',			//邮箱名
			'password' => 'password',			//邮箱密码 gtpwhqvlkgkscacf	umhzvgvsjtcccafi
			'port' => '587',					//端口	465
			'encryption' => 'tls',				//		ssl
		],
    模型里 
		$mailer = Yii::$app->mailer->compose('模板文件',['user'=>$this->adminuser]);
			//模板存在mail 里面
		$mailer->setFrom("imooc_shop@163.com");			//发送的邮箱
		$mailer->setTo($data['Admin']['adminemail']);	//接收的邮箱
		$mailer->setSubject('邮箱标题');
		if($mailer->send()){
			Yii::$app->session->setFlash('info','电子邮箱发送成功');
		}
	试图里
		<?php if(Yii::$app->session->hasFlash('info')){
			echo Yii::$app->session->getFlash('info');}?>
		
验证码 		
1、正常模式型验证 
	以 Test 的 Model,View,Controller 为例 ， 从生成验证码到验证验证码 
	① 首先在 Model 添加验证码字段 ， 还有验证规则 
	Test.php 
	<?php 
		namespace\app\models; 
		classTestextends\yii\base\Model{ 
			public$verifyCode; //添加的验证码字段 
			publicfunctionrules(){ 
				return[
					//captchaAction 是生成验证码的控制器 
					[‘verifyCode’ , ‘captcha’ , 'captchaAction' => 'test/captcha' , ‘message’=>’ 验证码不正确’], 
				];
			}
		}
	?> 
	② 控制器配置
	TestController.php 
	<?php 
		namespace\app\controllers; 
		classTestControllerextends\yii\web\Controller{ 
			publicfunctionactions(){
				return[ 
					//验证码 
					‘captcha’=>[
						//验证码类 
						'class'=>'yii\captcha\CaptchaAction',
						'maxLength'=>4, //生成验证码最大个数 
						'minLength'=>4, //生成验证码最小个数 
						'width'=>80, //验证码的宽度 
						'height'=>40, //验证码的高度 
					],
				];
			}
			public function actionIndex(){
			$test=new\app\models\Test();
			If(\Yii::$app->request->isPost){//验证验证码 
				$test->load(\Yii::$app->request);
				If($test->validate()){ 
					echo‘验证通过’; 
				}else{
					var_dump($test->getErrors()); 
				}
			}
		$this->render(‘index’,[‘model’=>$test]);
		}
	}
	?>
	③视图 View 输出
	index.php
	<?php use\yii\helpers\Html; ?>
	<?=Html::beginForm("",'post',['class'=>'forms'])?> 
	<?=\yii\captcha\Captcha::widget([ 
		'model'=>$model, //Model
		'attribute'=>'verifyCode',//字段 
		'captchaAction'=>'test/captcha', //验证码的 action 与 Model 是对应的 
		'template'=>'{input}{image}',//模板 , 可以自定义 
		'options'=>[//input 的 Html 属性配置 
		'class'=>'inputverifycode',
		'id'=>'verifyCode'
		],
		'imageOptions'=>[//image 的 Html 属性配置
			'class'=>'imagecode',
			'alt'=>'点击图片刷新' 
		] 
	]);
	?>
	<?=Html::submitButton("提交",['class'=>'submit'])?> 
	<?=Html::endForm();?>

2、自定义的验证码和验证 	
自己不想去调用 Model 啥的 , 可以自己进行自定义，不过验证的时候代码就有点 麻烦。 	
① 控制器配置 
TestController.php 
<?php 
namespace\app\controllers; 
classTestControllerextends\yii\web\Controller{ 
	publicfunctionactions(){//这里没有变化 
		return[ 
			//验证码 
			‘captcha’=>[ 
				//验证码类 
				'class'=>'yii\captcha\CaptchaAction',
				'maxLength'=>4, //生成验证码最大个数
				'minLength'=>4, //生成验证码最小个数 
				'width'=>80, //验证码的宽度 
				'height'=>40, //验证码的高度 
			],
		];
	}
	publicfunctionactionIndex(){
		If(\Yii::$app->request->isPost){//验证验证码 
			//这里变了
			//实例化一个验证码验证对象 
			$v=new\yii\captcha\CaptchaValidator(); 
			//配置 action 为当前的 
			$v->captchaAction='test/captcha'; 
			//创建一个验证码对象 
			$vaction=$v->createCaptchaAction(); 
			//读取验证码 
			$code=$vaction->getVerifyCode(); 
			if($code==\Yii::$app->request->post(‘verifyCode’){
				echo‘验证成功’; 
			}else echo‘验证失败’; 
		}
		$this->render(‘index’);
	}
}
?>
②视图 View 输出 
index.php 
<?php use\yii\helpers\Html; ?>
<?=Html::beginForm("",'post',['class'=>'forms'])?> 
<?=\yii\captcha\Captcha::widget([ 
	‘name’=>‘verifyCode’,//这里不需要 model 字段，直接自己定义 
	'captchaAction'=>'test/captcha', //验证码的 action 与 Model 是对应的 
	'template'=>'{input}{image}',//模板 , 可以自定义 
	'options'=>[//input 的 Html 属性配置 
		'class'=>'inputverifycode', 
		'id'=>'verifyCode' 
	], 
	'imageOptions'=>[//image 的 Html 属性配置
		'class'=>'imagecode',
		'alt'=>'点击图片刷新'
	]
]);
?>
<?=Html::submitButton("提交",['class'=>'submit'])?> 
<?=Html::endForm();?>

文件上传
单个文件上传 创建一个上传的 Model 为 Upload.php , Controller 用 TestController.php , View 用 upload.php
① 首先创建并配置 Model 的中 Upload.php 
<?php 
namespace \app\models; 
class Upload extends \yii\base\Model{ 
	public $image; 
	public function rules(){ 
		return[ 
			[‘image’,'file','skipOnEmpty'=>false,'extensions'=>'png,jpg'], 
		]; 
	}
	public function upload(){ 
		If($this->validate()){ 
			//这里中文 baseName 会为空 
			$this->image->saveAs('../runtime/' . $this->image->baseName . '.' . $this->image->extension); 
			return true; 
		} 
		return false; 
	}
}
?> 
② Controller 中的代码如下 
<?php 
namespace\app\controllers; 
classTestControllerextends\yii\web\Controller{ 
	publicfunctionactionUpload(){ 
		$upload=new\app\models\Upload(); 
		If(\Yii::$app->request->isPost){ 
			$upload->image=\yii\web\UploadedFile::getInstance($upload,‘image’); 
			If($upload->upload()){ 
				echo‘上传成功’; 
			}else{ 
				var_dump($upload->getErrors()); 
			} 
		} 
		return$this-.render(‘upload’,[‘model’=>$upload]); 
	} 
} 
?>
③视图文件 upload.php 代码如下 
<?php useyii\helpers\Html; ?> 
<?=Html::beginForm(‘’,‘post’,[‘enctype’=>‘multipart/form-data’])?> 
	<?=Html::activeFileInput($model,'image',['class'=>'upload'])?> 
	<?=Html::submitButton('提交',['class'=>'btnbtn-primary']);?> 
<?=Html::endForm();?>
多文件上传 多个文件上传跟单个文件上传基本上大同小异 , 我们还是按照单个文件上传的代码进 行修改 
① 首先创建并配置 Model 的中 Upload.php 
<?php 
namespace \app\models; 
class Upload extends\yii\base\Model{ 
	public $images; 
	public function rules(){ 
		return[ //maxFile 是上传的个数 [‘images’ , 'file', 'skipOnEmpty' => false, 'extensions' => 'png,jpg' , ‘maxFiles’=>4], ]; 
	}
	public function upload(){ 
		If($this->validate()){ 
		//这里的变成 foreach, 一个 image 是一个对象 
			foreach($this->imagesas$image){ 
				$image->saveAs(‘../runtime/’ . $image->baseName . ‘.’ . $image->extension); 
			} 
			return true; 
		}
		return false; 
	}
}
?>
② Controller 中的代码如下 
<?php 
namespace \app\controllers; 
class TestController extends \yii\web\Controller{ 
	public functionaction Upload(){ 
		$upload=new \app\models\Upload(); 
		If(\Yii::$app->request->isPost){ 
			//这里变成 getInstances, 这里是有多个 s 的 
			$upload->image=\yii\web\UploadedFile::getInstances($upload , ‘images’); 
			If($upload->upload()){ 
				echo‘上传成功’; 
			}else{
				var_dump($upload->getErrors()); 
			} 
		} 
		return$this->render(‘upload’,[‘model’=>$upload]); 
	} 
} 
?>
③视图文件 upload.php 代码如下
<?php useyii\helpers\Html; ?> 
<?=Html::beginForm(‘’,‘post’,[‘enctype’=>‘multipart/form-data’])?>
	<!-- 注意这里的字段名需要加多个中括号 --> 
	<?=Html::activeFileInput($model,'images[]',['class'=>'upload'])?> 
	<?=Html::activeFileInput($model,'images[]',['class'=>'upload'])?> 
	<?=Html::activeFileInput($model,'images[]',['class'=>'upload'])?> 
	<?=Html::submitButton('提交',['class'=>'btnbtn-primary']);?> 
<?=Html::endForm();?>




http
	$res = \YII::$spp->response;			响应组件 
	$res->statusCode = '404';				设置状态码
	$res->headers->add('pragma','no-cache')	添加响应头 paragma='no-cache'
	$res->headers->set('pragma','max-age=5')设置响应头
	$res->headders->remove('pragma')		删除响应头

文件
	$res->headers->add('location','http://www.baidu.com'); 						跳转到百度
	$this->redirect('http://www.baidu.com',302)									跳转网页 设置状态码
	$res->headers->add('content-disposition',"attachment;filename='文件名'"); 	文件下载
	$res->sendFile('以入口文件 的文件路径')		向浏览器发送文件

session	
	$session=\Yii::$app->session; 			session组件
	bool $session->isActive					判断session是否开启
	$session->open()						开启session
	session_set_cookie_params(12);			//设置有效期
	$session->set('smister_name','myname'); //添加一个 session 
	$session->set('smister_array',[1,2,3]); //添加一个 session 
	$session->get('smister_name); 			//读取一个 Session
	$session->remove(‘smister_name’); 		//删除一个 session 
		unset($session['smister_name'])
	$session->removeAll(); 					//删除所有 session 

	$session->setFlash()
    $session->getFlash()
    $session->hasFlash()

cookie		 yii\web\Request 和 yii\web\Response
	1）添加一个 Cookie
		//第一种方法 
		$cookie=new\yii\web\Cookie(); 
		$cookie->name='smister'; //cookie 的名称 
		$cookie->expire=time()+3600; //存活的时间 
		$cookie->httpOnly=true; //无法通过 js 读取 cookie 
		$cookie->value='cookieValue'; //cookie 的值
		\Yii::$app->response->getCookies()->add($cookie);
		//第二种方法 
		$cookie=new\yii\web\Cookie([ 
			‘name’=>‘smister’, ‘expire’=>time()+3600, 
			‘httpOnly’=>true, ‘value’=>‘cookieValue’ 
		]);
		\Yii::$app->response->getCookies()->add($cookie);

		$cookie=\Yii::$app->request->cookies;	//返回一个\yii\web\Cookie 对象 
		$cookie->get(‘smister’); 				//直接返回 Cookie 的值 
		$cookie->getValue(‘smister’);			//$cookie[‘smister’] 其实这样也是可以读取的 
		$cookie->has(‘smister’); 				//判断一个 Cookie 是否存在 
		$cookie->count();						//读取 Cookie 的总数 
			//$cookie->getCount();跟 count 一样 

		$cookie=Yii::$app->request->cookies->get(‘smister’); 
		\Yii::$app->response->getCookies()->remove($cookie);//移除一个 Cookie 对象 
		\Yii::$app->response->getCookies()->removeAll();	//移除所有 Cookie，目前好像不太好使 
	
	$cookie = \YII::$app->response->cookies;
	$cookie_data = array('name' => 'user','value'=>'zhangsan');
	$cookie->add(new Cookie($cookie_data));
	$cookie->remove('id');					删除cookie
	
	$cookie->getValue('users'[,$默认值]);	cookie不存在时使用默认值

类的延迟加载  vendor\yiisoft\yii2\yii.php
	spl_autoload_register(['Yii','autoload'],true,true);
	实例化一个类的时候会自动的加载该类
	
类的映射表
	use app\models\Order;
	\YII::$classMap['app\models\Order'] = '绝对路径';
	$order = new Order;
	实例化一个类的时候会根据该类的空间名查找 对应的绝对路径
	
组件的延迟加载
	当使用到 \YII::$app->session 之类的组件时  才会加载该类
	

###Gii脚手架
Gii 是一个基于 Web 的代码生成器, 可以用来生成模型, 控制器, 表单, 增删查改等等这些类或功能的代码
####base
#####配置文件开启gii

######	/config/web.php		添加 allowedIPs 
			$config['modules']['gii'] = [
				'allowedIPs' => [允许运行的IP地址], 
			]
	
######	/config/web.php		添加 admin  开启后台  
		
		$config['modules']['admin'] = [		
			'class' => 'app\modules\admin',		//app\modules 文件下为admin模块
			'class' => 'app\modules\admin\AdminModule', //app\modules\admin 文件下为adminmodule 模块
		]	

####advanced   (开发者模式默认开启)
#####开启gii backend/main-local.php
		$config['bootstrap'][] = 'gii';
		$config['modules']['gii'] = [
			'class' => 'yii\gii\Module'
		];


	Model Generator			数据模型
		生成数据模型  专门操作某张表
		Table Name				表名
		Model Class 			模型名
		Namespace				命名空间
		Base Class 				继承的类
		Datebase Connection ID 	数据库的主键 (活动记录)
		//配置项
		User Table Prefix					表前缀 
		Generate Relations					根据外键信息输出响应代码
		Gererate Labels from DB Comments	根据字段生成相应的信息
		Enable |18N							多语言
			rules()					//校验字段 
			attributeLabels()		//字段注释名
			
	CRUD Generator			CRUD  增删改查
		Model Class				数据模型   app\models\Test 
		Search Model Class		自动生成模型   app\models\TestSearch
		Controller Class 		控制器 		app\controllers\TestController
		View Path 				
		Base Controller Class
		Widget Used in index Page 
	Controller Generator	控制器 
		Controller Class		类名(加上命名空间)		
		Action IDs				操作index test list多生成多个
		View Path				视图路径(可以不用填 会自动生成
		Base Class				父类
		Code Template			代码模板
	Form Generator			表单
		View Name 				视图路径 article/publish
		Model Class				数据模型 app\models\Test 
		Scenario				场景
		View Path
		Enable |18N
		Code Template 
	Module Generator		模块
	Extension Generator		扩展



###表单
####ActiveField对象
在yii中主要是通过 yii\widgets\ActiveForm 类来创建表单
```html
<?php $form = ActiveForm::begin(['id' => 'contact-form']); ?>不仅创建了一个表单实例, 同时也标志着表单的开始
	<!-- 创建了一个输入框 网页打开时默认选中 -->
	<?= $form->field($model,'name')->textInput(['autofocus'=>true]) ?>
	<!-- 默认为输入框 -->
	<?= $form->field($model,'email') ?> 
	<!-- 文本域 -->
	<?= $form->field($model,'body')->textArea(['rows' => 6]) ?> 
	<!-- 下拉框 -->
	<?= $form->field($model,'status')->dropDownList([1=>'草稿',2=>'已发布'],['prompt'=>'请选择状态']) ?>
	<!-- 生成验证码 -->
	<?= $from->field($model,'verifyCode')->widget(Captcha::className(), [
		'template' => '<div>{image}{input}</div>'
	]) ?>
	<!-- 生成一个按钮 -->
	<div class='form-group'>
		<?= Html::submitButton('Submit', ['标签属性名' => '标签属性值']) ?>
	</div>

	<?= $form->field($model,'password')->passwordIput() ?> 密码输入框
	<?= $form->field($model,'username')->textInput()->hint('Please enter your name')->label('Name') ?>
	<?= $form->field($model,'email')->input('email') ?>
ActiveForm::end() 	结束
```
####Bootstrap版的表单
yii/vendor/yiisoft/yii2-bootstrap/ActiveField.php	
form组件创建类
<?php use yii\bootstrap\ActiveForm; ?>
<!--beginForm('提交的url',类型POST或GET','表单的属性 id,class等')-->
<?php $form = ActiveForm::begin([
	'options' => [
		'标签属性' => '值',
		'class' => 'new_user_form inline-input',
		'enctype' => 'multipart/form-data',
		'labelOptions' => ['class' => 'col-lg-2 control-label'],
		'errorOptions' => ['class' => 'text-warning help-block-error']
	],
	'fieldConfig' => [
		'template' => '{input}',
	],
	'action' = ['as/as']
]); ?>	
	
	<?php echo $form->field($model,'adminuser')->textInput(['class'=>'span12','placeholder'=>'管理员账号']);?>
	<?php echo $form->field($model,'adminpass')->passwordInput(['class'=>'span12','placeholder'=>'管理员密码']);?>
	<?php echo $form->field($model,'rememberMe')->checkbox([
		'id' => 'remember-me',
		'template' => '<div class="remember">{input}<label for="remember-me">记住我</label>'
	]);?>
	//上传文件
	<?= echo $form->field($model,'uploadFile[]')->fileInput(['multiple'=>'multiple']);?>
	//下拉列表
	<?= echo $form->field($model,'cate')->dropdownList(
		ProductCategory::find()->select(['category_name','id'])->indexBy('id')->column(), 
		['prompt'=>'Select Category']
	);?>
	<?php use yii\helpers\Html; ?>
<?php echo Html::submitButton('登录',["class"=>"btn-glow primary login"])?>
<!--endForm也是必须,就是闭合表单-->	
<?php ActiveForm::end(); ?>

####yii\helpers\Html
1) 生成表单
	//beginForm('提交的Url','类型post或get','表单的属性id,class等')
	<?=\yii\helpers\Html::beginForm('','post',['id'=>'addForm']);?>
	//endForm也是必须,就是闭合表单
	<?=\yii\helpers\Html::endForm();?>
2) 生成Text输入框
	//input('类型text/password\text"m'name的名称','默认值','属性例如class,id等');
	<?=\yii\helpers\Html::input('text','name','',['class'=>'name','id'=>'name']);?>
	//直接生成指定类型的typeinput('name的名称','默认值','属性例如class.id等;)
	//直接生成password类型的输入框
	<?=\yii\helpres\Html::passwordInput('pwd','',['id'=>'name']);?>
	//直接生成text类型的输入框
	<?=\yii\helpers\Html::textInput('mane','',['id'=>'password'])?>
	//直接生成hidden类型的隐藏框
	<?=\yii\helpers\Html::hiddenInput('hidden','',['id'=>'hidden'])?>
3) 生成 textArea 
	//textarea(‘name 的名称’,‘默认值’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::textarea('intro','',['class'=>'intro']);?>
4) 生成 radio 及 radio 列表 
	//radio(‘name 的名称’,‘是否选中 true/false’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::radio('status',false,['class'=>'status'])?> 
	//radioList(‘name 的名称’,’选中的值’,‘数组选中键值’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::radioList('fav',1,[1=>'test',2=>'mrs'],['class'=>'fav-list'])?>
5) 生成 checkbox 及 checkbox 列表 
	//checkbox(‘name 的名称’,‘是否选中 true/false’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::checkbox("ckbox",false,['class'=>'ckbox'])?>
	//checkboxList(‘name 的名称’,’选中的值’,‘数组选中键值’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::checkboxList('cklist',1,[1=>'mr',2=>'s'],['class'=>'cklist'])?>
6) 生成 select 下拉框 
	//dropDownList(‘name 的名称’,’选中的值’,‘数组选中键值’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::dropDownList('sts',0,[1=>'是',0=>'否'],['class'=>'sts'])?>
7) 生成 label 
	//label(‘显示的名称’,‘for 的字段’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::label('name:','uname',['class'=>'label'])?>
8) 生成上传控件 
	//fileInput(‘name 的名称’,‘默认值’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::fileInput('image',null,['class'=>'upload'])?>
9) 生成按钮 
	//button(‘显示的文字’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::button("按钮", ['class'=>'btn'])?> <?=\yii\helpers\Html::submitButton("提交按钮", ['class'=>'btn-submt'])?> <?=\yii\helpers\Html::resetButton("重置", ['class'=>'btn-reset'])?>

调用常用的Html主键之生成与Model字段关联的Html
//$model是通过控制器实例化一个Model类
1）生成 Text 输入框 
	//activeInput(‘input 的类型 text/password’,‘实例化 Model’,‘字段’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::activeInput('title',$model,'title',['class'=>‘input'])?>
	//直接生成指定类型的 typeInput(‘‘实例化 Model’,‘字段’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::activeTextInput($model,'name',['class'=>'input'])?> 
	<?=\yii\helpers\Html::activePasswordInput($model,'pwd',['class'=>'input'])?>
	<?=\yii\helpers\Html::activeHiddenInput($model,'name',['class'=>'input'])?>
2) 生成 textArea 
	//activeTextarea(‘实例化 Model’,‘字段’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::activeTextarea($model,'content',['class'=>'intro']);?>
3) 生成 radio 及 radio 列表 
	//activeRadio(‘实例化 Model’,‘字段’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::activeRadio($model,'sts',['class'=>'status'])?> 
	//activeRadioList(‘实例化 Model’,‘字段’,‘数组（键值）’,‘属性例如 class,id 等’) <?=\yii\helpers\Html::activeRadioList($model,'sts',[1=>'mrs',2=>'s'],['class'=>'st'])?>
4) 生成 checkbox 及 checkbox 列表 
	//activeCheckbox(‘实例化 Model’,‘字段’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::activeCheckbox($model,'sts',['class'=>'ckbox'])?> 
	//activeCheckboxList(‘实例化 Model’,‘字段’,‘数组（键值）’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::activeCheckboxList($model,'sts',[1=>'f',2=>'m'],['class'=>'ss'])?>
5) 生成 select 下拉框 
	//activeDropDownList(‘实例化 Model’,‘字段’,‘数组（键值）’,‘属性例如 class,id 等’) 
	<?=\yii\helpers\Html::activeDropDownList($model,'fg',[1=>'f',2=>'m'],['class'=>'sx'])?>
6  Html 转义和反转义 html 代码 



数据小部件 DetailView
yii 提供了一套数据小部件 widgets, 这些小部件可以用于显示数据
- DetaView 小部件用于显示一条数据
- ListView 和 GridView 小部件能够用于显示一个拥有分页, 排序和过滤功能的一个列表或者表格
<?= DetailView::widget(
	[
		//model这里可以是一个模型类的实例,也可以是一个数组
		'model' => $model,	
		//attribute
		属性决定显示模型的那些属性以及如何格式化
		'attributes' => [
			'id',
			'title',
			'content:ntext',
			'tags:ntext',
			'status',
			'create_time:datetime',
			'update_time:datetime',
			'author_id',
			[
				'attribute' => '字段名',
				'label'=>'状态',
				'value' => $model->status0->name
			]
		],
		'template' => '<div>{label}</div>',  //标签属性
		'options' => ['class'=>'']		//表格属性
	]
)?>

GridView 小部件
- 是Yii中功能最强大的小部件之一
- 非常适合用来快速建立系统的管理后台
- 用 dataProvider 键指定提供数据的数据提供者
- 用 filterModel 键指定一个能够提供搜索过滤功能的搜索模型类
- 用 columns 键指定需要展示的列及其格式
	<?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['attribute' => 'id',
            	//设定数据列HTML属性
                'contentOptions' => ['width' => '30px'],
            ],
            'title',
			['attribute' => 'author_id',
                'value' => 'authorOne.nickname',
            ],
            'tags:ntext',
            ['attribute' => 'status',
                'value' => 'statusOne.name',
                //'value' => funciton($model, $key, $index, $column){
                	//$model 	当前对象
                	//$key 	 	当前的建
                	//$index 	当前的索引
                	//column 	数据列对象
                }
				

				//自定义过滤条件的输入框
				'filter' => \common\models\Poststatus::find()
                        ->select(['name','id'])
                        ->orderBy(['posttion'=>4])
                        ->indexBy('id')
                        ->column()
            ],
            ['attribute' => 'update_time',
				//格式
				'format' => ['date','php:Y-m-d H:i:s']
            ],
            ['
            	class' => 'yii\grid\ActionColumn',
            	//template 定义动作列中有哪些按钮, 大括号内括起来的就是按钮, 这些动作就是控制器的 actionID
            	'template' => '{view}{update}{delete}{approve}',
            	//buttons 是一个按钮的渲染回调函数数组. 数组中的键是按钮名, 并且值是对应的按钮渲染回调函数
            	'buttons' => [
            		'approve' => function($url, $model, $key){
            			//$url 动作列为按钮创建的URL
            			//$model 当前要渲染的模型对象
            			//$key 	数据提供者数组中模型的键
            			$options = [
            				'title' => Yii::t('yii', '审核'),
            				'aria-label' => Yii::t('yii', '审核'),
            				'data-confirm' => Yii::t('yii', '你确定通过这条评论吗?'),
            				'data-method' => 'post',
            				'data-pjax' => '0',
            			];
            			$icon = Html::tag('span', '', ['class' => 'glyphicon glyphicon-check']);
            			return Html::a($icon, $url, $options);
            		}
            	//'controller' => 'controller/action' 是应该执行这些动作的控制器ID. 如果没有设置, 它将使用当前控制器
            	]
            ],
        ],
    ]); ?>
列类
- 序号列: 行号, 从1起始并且自动增长
- 数据列: 用于显示数据
- 动作列: 显示动作按钮, 如查看, 更新, 删除操作
- 复选框列: 显示一个复选框列

数据提供者 DataProvider
- 数据提供者可以获取数据, 并提供给其他组件或页面使用
- 可以获取到的数据进行分页和排序
- 经常用来给数据小物件提供数据, 方便用户互动地进行数据的分页与排序
- 实现了 yii\data\DataProviderInterface接口类

数据提供者的种类
ActiveDataProvider
	用 yii\db\Query\ 或者 yii\db\ActiveQuery 从数据库查询数据, 并且以数组项的方式或则 Active Record实例的方式返回
SqlDataProvider
	执行一段SQL语句并且将数据库数据作为数组返回
ArrayDataProvider
	将一个大的数组依据分页和排序设定返回一部分数据

$dataProvider = new ActiveDataProvider([
	//提供AR模型 如 Post::find()
	'query' => $query,
	//分页
	'pagination' => ['pageSize' => 5],
	//排序
	'sort' => [
		'defaultOrder' => ['id'=> SORT_DESC],
		//排序的字段
		'attributes' => ['id', 'title'],
	]
]);

可通过 $dataProvider->sort->attributes['authorName'] = [
	'asc' => ['authorName' => SORT_ASC],
	'desc' => ['authorName' => SORT_DESC]
]

yii\data\DataProviderInterface方法
getPagination() 		获取分页设置信息
getSort() 				获取排序设置信息
getCount()				当前页的数据条数
getTotalCount() 		所有记录的条数
getModels() 			取得DataProvider中的数据, 有可能是对象数组, 或者是普通数组
 
###数据小部件 ListView
- 用于显示数据提供者 DataProvider 提供的数据;
- 每条数据用一个指定的子视图文件来渲染, 可以在子视图中自由的布置页面;
- 由于有dataprovider提供数据, 自然就集成了分页, 排序这些特性, 可以方便地写出显示数据以及管理数据的界面

```php
<?= ListView::widget([
	'id' => 'postList',
	'dataProvider' => $dataProvider,
	//要渲染的数据
	'itemView' => '_listitem',
	//渲染的视图  当前viws/_post.php
	'layout' => '{items}{pager}',
	'pager' => [
		'maxButtonCount' => 10,
		'nextPageLabel' => Yii::t('app', '下一页'),
		'prevPageLabel' => Yii::t('app', '上一页'),
	]
]) ?>

### search搜索类
1. 属性和搜索表单对应
2. 数据规则要重写, 使其符合表单提交的这种验证需求
3. 搜索的实现, 是靠查询构建起来程序化地构建查询, 然后交给数据提供者; 在后续阶段去执行查询
4. 排序的实现, 是程序化地设置数据提供者 DataProvider 的 sort 配置来实现的


```php
class PostSearch extends Post
{
	...
	publci function sarch($params)
	{
		$query = Post::find();
		$dataProvider = new ActivedataProvider([
			'query' => $query,
		]),

		$this->load($params);

		$query->andFilterWhere([
			'post.id' => $this->id,
			'status' => $this->status,
			'author_id' => $this->author_id,
		]);

		return $dataProvider;
	}
}


###HTML帮组类
	\yii\helpres\Html组件,提供了封装好的Html代码,直接调用Html的相对方法就可以生成相对应的Html代码

	\yii\helpers\Html::error()	可以直接打印关联数据库的错误
	<?=\yii\helpers\Html::error(\app\models\Artice::findOne(1),'title',['class'=>'err'])?>


生成标签
<?= '<p class="username">'.$user->name.'</p>' ?>
<?= Html::tag('p',Html::encode($user->name),['标签属性名'=>'标签属性值']) ?>

<?php 
	$html=‘<b>test</b>’; 
	//转义 html 代码 
	$thtml=\yii\helpers\Html::encode($html);
	//反转义 html 代码 
	$html=\yii\helpers\Html::decode($thtml);
?>
	
Url 组件
\yii\helpers\Url 组件 
	//以 http://localhost:8080/yii2-demo/web/index.php?r=article/index 为例 
	//base 输出根目录 
	echo \yii\helpers\Url::base(); 			//输出/yii2-demo/web 
	echo \yii\helpers\Url::base(true); 		//输出 http://localhost:8080/yii2-demo/web

	//home 是输出首页 , 加上 true 是输出加域名的首页 
	echo \yii\helpers\Url::home(); 			//输出/yii2-demo/web/index.php 
	echo \yii\helpers\Url::home(true); 		//输出 http://localhost:8080/yii2-demo/web/index.php

	//当前的 Url 
	echo \yii\helpers\Url::current(); 		//输出/yii2-demo/web/index.php?r=article/index

	//to 和 toRoute 都是生成 Url, 后面加 true 都是生成带域名的 Url 
	echo \yii\helpers\Url::to(['article/add']);				//输出/yii2-demo/web/index.php?r=article/add 
	echo \yii\helpers\Url::to(['article/edit','id'=>1]);		//输出/yii2-demo/web/index.php?r=article/add&id=1 
	echo \yii\helpers\Url::to(['article/add'],true); 		//输出 http://localhost:8080/yii2-demo/web/index.php?r=article/add 
	echo \yii\helpers\Url::to(['article/edit','id'=>1],true);//输出 http://localhost:8080/yii2-demo/web/index.php?r=article/add&id=1

	echo \yii\helpers\Url::toRoute(['article/add']); 		//输出/yii2-demo/web/index.php?r=article/add 
	echo \yii\helpers\Url::toRoute(['article/edit','id'=>1]);//输出/yii2-demo/web/index.php?r=article/add&id=1 
	echo \yii\helpers\Url::toRoute(['article/add'],true); 	//输出 http://localhost:8080/yii2-demo/web/index.php?r=article/add 
	echo \yii\helpers\Url::toRoute(['article/edit','id'=>1],true);//输出 http://localhost:8080/yii2-demo/web/index.php?r=article/add&id=1

	//to 和 toRoute 之间的区别, 传入 string 时 , to 会直接把 string 当成 url 和 toRoute 则会解析 
	echo \yii\helpers\Url::to('article/add'); 		//输出 article/add 
	echo \yii\helpers\Url::toRoute('article/add');	//输出/yii2-demo/web/index.php?r=article/add 
	
	Yii::setAlias('@google','http://google.com/');	//建立别名
	echo Url::to('@google');

Array Helper助手类
	获取值
		//$value = isset($array['foo']['bar']->name) ? $array['foo']['bar']->name : null;
		$value = ArrayHelper::getValue($array,'foo.bar.name');
	获取列
		$ids = ArrayHelper::getColumn($data,'id');
	建立映射表
		可以使用 map 方法从一个多维数组或者一个对象数组中去取出数据, 建立一个映射表(键值对数组), 在map方法的参数列表中制定了欲构建的映射表的键名和值.
		ArrayHelper::map($ARobj,'id','name')
		//将AR模型对象转换为 id 字段  和  name 字段的 键值对 返回	
	检查键名的存在(keyExists)
		if(!ArrayHelper::keyExists('username',$data1,false))
	重建数组索引(index)
		$result = ArrayHelper::index($array,'id');
	多维排序(multisort)
		ArrayHelper::multisort($data,['age','name'],[SORT_ASC,SORT_DESC]);
	检测数组类型(islndexed)
		echo ArrayHelper::isIndexed($indexed);
	HTML编码和解码值
		$encoded = ArrayHelper::htmlEncode($data);
		$decoded = ArrayHelper::htmlDecode($data);
	合并数组(merge)
		$result = ArrayHelper::merge($array1,$array2);
	对象转换为数组(toArray)
		$data = ArrayHelper::toArray($posts,[...])
	数组检测
		ArrayHelper::isln('a',['a']);
		ArrayHelper::isln('a',new(ArrayObject['a']));
		ArrayHelper::isSubset(new(ArrayObject['a','c']),new(ArrayObject['a','b','c']));

###Getter和Setter
####属性定义的格式
getter 方法名以get开头, get后面的部分就是属性的名字

setter 方法名以set开头, set后面的部分就是属性的名字

####属性的使用
定义好方法后, 就可以想普通属性一样使用. 但是本质有区别: 当这种属性被读取时, 对应的 getter 方法将被调用; 而当属性被赋值时, 对应的 settr方法就调用
$model->label  $model->getLabel()

####几点注意
- 要使用getter, setter来定义属性, 类必须从 yii\base\Object 或其子类继承. 这种方法不是只能用于模型类, 只要是从 yii\base\Object 类继承的类都可以用
- 如果只定义了 getter, 而没有 setter 的属性是只读属性, 对它赋值会抛出异常
- 这种方法定义的属性, 一般多数都是只读的, 一般不用持久化保存, 多数是一个业务逻辑需要的计算结果


###认证
认证是鉴定用户身份的过程. 通常是使用用户名和密码来鉴别用户身份. 认证是登录功能的基础

####实现认证
用户组件 yii\web\User 用来管理用户的认证状态

- 配置用户组件 yii\web\User

指定一个含有实际认证逻辑的认证类

app\models\User

- 实现 yii\web\IdentityInterface 接口

####用户组件 Yii::$app->user
$identity = Yii::$app->user->identity;
//检测当前用户身份
$id = Yii::$app->user->id;
//当前用户的ID. 未认证用户则为 NULL
$isGuest = Yii::$app->user->isGuest;
//判断当前用户是否是游客
Yii::$app->user->login($identity);
//将当前用户的身份等级到 yii\web\User 根据设置, 用 session 或 cookie 记录用户身份, 用户的认证状态将在整个会话中得以维持
Yii::$app->user->logout();
//注销用户

####User验证类类
class User extends ActiveRecord implements IdentityInterface{
	public static function tableName(){
		return '{{$user}}';
	}

	public static function findIdentity($id)
	public static function findIdentityByAccessToken($token, $type = null)
	public static function findByUsername($username)
	public function getId()
	public function getAuthKey()
	public function validateAuthKey($authKey)
	public function validatePassword($pasword)
}

#####配置验证类
'user' => [
	'identityClass' => 'common\models\User',
	'enableAutoLogin' => true,
]

####前后台分离
要分离的模块/config/main.php
'components' => [
	'user' => [
		'identityClass' => 'common\models\分离的model类',
		'enableAutoLogin' => true,
	]
]

添加字段
auth_key
password_hash
password_reset_token

用Gii修改代码

拷贝user的认证代码


####使用用户组件 yii\web\User

设置全局函数
		入口文件引入 function.php 函数文件即可

config/main.php 设置不一样的 session  使前后台session不一样


###认证
####存取控制过滤器 ACF
是一种通过 yii\filters\AccessControl 类来实现的简单授权方法, 非常适用于仅需要简单的存取控制的应用

#####实现ACF 方法在控制器中 behaviors 方法中设定存取的规则. 当用户请求一个动作的时候, ACF会检查存取规则, 判断该用户是否被允许执行所请求的动作

controllers/PostController.php
public function behaviors(){
	return [
		'access' => [
			'class' => AccessControl::className(),
			'rules' => [
				[
					'actions' => ['login', 'error'],
					//动作
					'allow' => true,
					//是否允许
					'roles' => ['?'],
					//适用这规则的角色
				]
			]
		]
	];
}

#####两种角色
? : 未经认证的访客用户
@ : 已认证用户

#####其它存取规则
ips: 	浏览器的IP地址, 可以使用通配符* , 为空则匹配所有IP
verbs: 	匹配那些请求方式(如: GET,POST)
matchCallback: PHP回调, 以确定应用该规则
denyCallback: PHP回调, 当规则静止访问的时候会被调用
```php
[
	'action' => ['special-callback'],
	'allow' => true,
	'matchCallback' => function($urle, $action){
		return date('d-m') === '31-10';
		// 10-31 才能登录
	}
]
```

####RBAC
一个简单而强大的集中式存取控制机制
#####建立授权数据
common\config\main.php\
	'components' => [
		'authManager' => [
			'class' => 'yii\rbac\DbManager',
		]
	]

#####rbac数据表
author_item_child
	parent: varchar(64)
	child: carchar(64)
author_item
	name: varchar(64)
	type: int(11)
	dscription: text
	created_at: int(11)
	updated_at: int(11)
auth_assignment
	item_name: varchar(64)
	user_id: varchar(64)
	create_at: int(11)
auth_rule
	name: varchar(64)
	data: text
	created_at: int(11)
	updated_at: int(11)

yii数据迁移  到文件目录
	./yii migrate --migrationPath=@yii/rbac/migrations

编辑 console/controllers/RbacController.php
./yii rbac/init

#####执行权限检查
######yii\web\User::can()方法
yii\web\User::can()方法是一种快捷用法, 用于对当前登录的用户进行权限检查. 如果要能对任何用户进行权限检查, 需要调用 yii\rbac\ManagerInterface::checkAccess() 方法来检查权限
在每个控制器前面加上 
if(!Yii::$app->user->can('createPost')){
	throw new ForbiddenHttpException('对不起, 你没有进行该操作的权限.');
} 

###自定义小部件 
1. 从 yii\base\Widget 继承类
2. 重写 yii\base\Widget:init() 方法, 方法中主要处理小部件属性
3. 重写 yii\base\Widget:run() 方法, run() 方法包含小部件生成渲染结果的代码
4. 渲染结果可在 run() 方法中直接打印输出或以字符串返回

####定义小部件
	<?php 
	namespace app\components;
	use yii\base\Widget;

	class HelloWidget extends Widget
	{
		public $message;

		public function init()
		{
			parent::init();			//先执行父类的init
			if($this->message === null){
				$this->message = 'Hello World';
			}
		}
		
		public function run()
		{
			return Html::encode($this->message);
		}

		public function addMenu($menuName)
		{
			return '<li>'.$menuName.'</li>';
		}
	}
	?>

####使用小部件
在视图中调用 yii\base\Widget::widget() 方法来使用小部件; 方法的参数是一个数组, 用来初始化小部件, 然后就会返回小部件渲染后的结果
<?= Hellowidget::widget(['message' => 'Good morning']) ?>

	视图中
	<?php use app\components\TopMenu;?>
	<div>
		<?php $menu = TopMenu::begin();  //调用init()?> 
		<?=$menu->addMenu('menu1'); //调用addMenu()?>
		<?=$menu->addMenu('menu2');?>
		<?php TopMenu::end();//调用run();?>
	</div>


菜单组件 
<?php
use yii\bootstrap\Navbar;
//开始
NavBar::begin([
	'brandLabel' => 'My Blog',
	'brandUrl' => Yii::$app->homeUrl,
	'options' => [
		'class' => 'navbar-inverse navbar-fixed-top',
	]
]);
//导航菜单 配置
$menuItems = [
	['label' => '标题名', 'url' => ['/user/index']],
];
//输出
echo Nav::widget([
	'options' => ['class' => 'navbar-nav navbar-right'],
	'items' => $menuItems,
]);
//结束
NavBar::end();
?>
	



debug	index.php?r=debug
	
日志处理	
Yii:log($message,$leve,$category);
Yii:trace($message,$category);

	信息路由
	'bootstrap' => ['log'],
	'components' => [
		'log' => [
			'targets' => [
				'file' => [
					'class' => 'yii\log\FileTarget',
					'levels' => ['trace,'info'],
					'categories' => ['yii\*'],
				],				
				'email' => [
					'class' => 'yii\log\RmailTarget',
					'levels' => ['error','warning'],
					'message' => [
						'to' => ['admin@example.com','developer@examle.com'],
						'subject' => 'New example.com log message',
					],
				],
			],
		],
	],
	//处理区块   会显示在debug里
	\Yii:beginProfile('myMaek');
	//code
	\Yii:endProfile('myMaek');
	
错误处理  Yii中对错误的处理很纯粹	
	use yii\base\ErrorException;
	use yii;
	
	try{
		10/0;
	}catch(ErrorException $e){
		Yii::waring('Tried dividing by zero.');
	}

	定制错误
	'errorHandler' => [
		'errorAction' => 'site/error',	//出现错误都会调用这个方法
	]

	public function actionErrr{
		$exception = \Yii::$app->errorHandler->exception;
		if($exception !== null){
			return $this->render('error',['exception'=>$exception]);
		}
	}
	
组件	\yii\base\Component
<?php
use yii\jui\DatePicker;

echo DatePicker::widget([
	'language' => 'zh-CN',
	'name' => 'country',
	'clientOptions' => [
		'dataFormat' => 'yy-mm-dd',
	],
]);
?>

class MyClass extends Object{
	public $prop1;
	public $prop2;
	public function __construct($param1,$param2,$config = []){
		// 配置生效前的初始化过程
		parent::__construct($config);
	}
	public function init(){
		parent::init();
		// 配置生效后的初始化过程
	}
}
$component = \Yii::createObject(
	['class' => MyClass::className(),
	'prop1' => 3,
	'prop2 => 4,],[1,2]
);

	
public function actions(){
	return [
		'error' => [
			'class' => 'yii\web\ErrorAction',		//指定错误时调用的方法
		],
	];
}	

组件	
yii\web\AssetManager				管理资源包和资源发布
yii\db\Connection					代表一个可以执行数据库操作的数据库连接,注意配置该组件时必须指定组件类名和其他相关组件属性
yii\base\Application::errorHandler	处理PHP错误和异常,
yii\i18n\Formatter					格式化输出显示给终端用户的数据,
yii\i18n\I18N						支持信息翻译和格式化
yii\log\Dispatcher					管理日志对象,
yii\swiftmailer\Mailer				支持生成邮件结构并发送
yii\base\Application::response 		代表发送给用户的响应
yii\base\Application::request		代表从终端用户处接受到的请求
yii\web\Session						代表会话信息,仅在yii\web\Application网页应用中可用
yii\web\UrlManager					支持URL地址解析和创建
yii\web\User						代表认证登录用户信息,仅在yii\web\Application网页应用中可用
yii\web\View						支持渲染视图

扩展
yiisoft/yii2-apidoc					提供了一个可扩展的,高效的API文档生成器.核心框架的API文档也是用它生成的
yiisoft/yii2-authchlient			提供了一套常用的认证客户端,例如Facebook OAuth2客户端 GitHub OAuth2客户端
yiisoft/yii2-bootstrap				提供了一套挂件,封装了Bootstrap的组件和插件
yiisoft/yii2-codeception			提供了基于Codeception的测试支持
yiisoft/yii2-debug 					提供了对Yii应用的调试支持.当使用该扩展时,在每个页面的底部将显示一个调试工具条.该扩张还提供了一个独立的页面,以显示详细的调式信息
yiisift/yii2-elasticsearch			提供对Elasticsearch的使用支持.他包含基本的查询/搜索支持,并实现了Active Recor模式让你可以将活动记录存储在Elasticsearch中
yiisoft/yii2-faker					提供了使用faker的支持,为你生成模拟数据
yiisoft/yii2-gii					提供了一个机遇页面你的代码生成器,具有高可扩展性,并能用来快速生成模型 表单 模块 CRUD等
yiisoft/yii2-imagine				提供了基于imagine的常用图像处理功能
yiisoft/yii2-jui					提供了一套封装JQuery UI的挂件一级他们的交互
yiisoft/yii2-mongodb				提供了MongoDB的使用支持.它包含基本的查询,活动记录,数据迁移,缓存,代码生成等特性
yiisoft/yii2-redis 					提供了对redis的使用支持.他包含基本的查询,活动记录,缓存等特性
yiisoft/yii2-smarty					提供一个局域Smarty模板引擎
yiisoft\yii2-sphinx 				提供了对Sphinx的使用支持.他包含基本的查询 活动记录 代码生成等特性
yiisoft/yii2-swiftmailer			提供了基于swiftmailer的邮件发送功能
yiisoft/yii2-twig					提供了一个基于Twig的模板引擎

AR的生命周期	理解AR的生命周期对于你操作数据库非常重要。生命周期通常都会有些典型的事件存在。对于开发AR的behaviors来说非常有用。

new()
	1. constructor
	2. init()					EVENT_INIT
find()
	1. constructor
	2. init()					EVENT_INIT
	3. afterFind() 				EVENT_AFTER_FIND
save()
	1. beforeValidate()			EVENT_BEFORE_VALIDATE
		方法在数据验证之前执行, 如果这个方法执行后返回值为false, 后面的步骤就不会执行 
	2. 执行数据验证
		如果不通过 第三步后面的步骤会被略过
	3. afterValidate()			EVENT_AFTER_VALIDATE
	4. beforeSave($insert)		EVENT_BEFORE_INSTERT or EVENT_BEFORE_UPDATE
		返回true 才会执行下面的代码
	5. 执行数据插入或修改
	6. afterSave($insert, $attr)EVENT_AFTER_INSE RT or EVENT_AFTER_UPDATE				
delete()
	1. beforeDelete()			EVENT_BEFORE_DELETE
	2. 执行数据删除
	3. afterDelete() 			EVENT_AFTER_DELETE
refresh() (Since 2.0.8)
	1. afterRefresh() 			EVENT_AFTER_REFRESH

###控制台命令程序
控制台程序， 这种程序没有可视化的视图界面， 只是通过输入字符串来发出一个命令， 程序执行完后， 也用字符串来显示执行后的结果

####创建控制台命令程序
- 控制台命令继承自 yii\console\Controller 控制器类
- 在控制器类中， 定义一个或多个动作， 动作与控制台子命令相对应
- 在动作方法中实现业务需求的代码

```php
<?php
namespace console\controllers;
use yii\console\Controller;
use common\models\Post;

class HelloController extends Controller
{
	public function actionIdex()
	{
		echo "hello World! \n";
	}

	public function actionList()
	{
		$postall = Post::find()->all();

		foreach($postall as $aPot){
			echo $aPost['id'], '-', $aPost['title']."\n";
		}
	}
}
```

####运行控制台命令程序
- 通过执行应用根目录 yii 脚本执行
- 脚本命令后跟指定的路由：	控制器ID/动作ID 

####控制台命令程序的工作原理
#####1. 入口脚本yii文件
- 一般位于应用程序的根目录
- 会做一些全局的设定
- 会包含yii框架核心
- 会用配置文件来初始化应用主体
#####2. 配置文件
用来初始化应用主体的属性
#####3. 控制器和模型文件
- 控制器代码的写法与web应用一样
- 也可以从模型类中取数据
- 控制台命令程序不需要熏染页面， 所以不需要视图文件

####控制台命令的参数
#####带有参数的控制台命令陈旭
- 控制台命令程序可以接受参数， 参数将传递给命令对应的动作方法
- 第一个参数对应第一个参数， 第二个参数对应第二个参数， 依次类推
- 可以使用数组作为参数， 数组参数用逗号来隔开字符串生成
- 如果没有足够的从参数， 会提示出错， 除非参数设定了默认值

#####带有选项的命令

```php
class HelloController extendds Controller
{
	public $rev;

	public function options()
	{
		return ['rev'];
	}

	public function optionAliases()
	{
		return ['r' => 'rev'];
	}

	public function actionIndex()
	{
		if($this->rev ==1)
			echo 'ok';
		else
			echo 'no';
	}
}

//> ./yii hello/options --r=1
//ok
```

- 覆盖在 yii\console\Controller::options() 中的方法， 这个方法应该返回控制器类的属性的列表
- 当运行一个命令时, 你可以使用语法: --OptionName=OptionValue 来传递值给对应的属性, 值OptionValue将会分配到OptionName属性
- 自 Yii2.0.8之后, 可以用optionAliases() 方法来添加选项的别名, 从而简化命令中选项的输入


###Url美化
框架一般都采用入口程序和路由提交请求, 再加上参数等内容, 因此Url难免会比较冗长, Url美化研究如何把冗长的地址美化成一个一目了然, 有意义的地址

####Url美化带来的好处
1. 缩短Url, 隐藏实际路径提高安全性
2. 易于用户记忆和键入
3. 易于被搜索引擎收录

####Url美化实现
#####UrlManager配置
config/main.php

'urlManager' => [
	//把美化打开
	'enablePrettyUrl' => true,
		//http://blog.com/index.php?r=post/detail&id=42
		//http://blog.com/post/detail&id=42 
	//是否展示文件名
	'showScriptName' => false,
	//伪静态
	'suffix' =>  '.html',
	//url美化规则
	'rules' => [
		'enableStrictParsing' => true,	
		//严格方式 
		'<controller:\w+>/<id:\d+>' => '<controller>/detail',
		//  'abcde/12345' = 'abcde/detail&id=12345'
		'post/index' => 'posts',
		'site/<id:\d+>' = 'site/view',
		//   'site/12345' = 'site/view&id=12345' 
		'site/<year:/d{4}/<title>' = 'site/read',  
		//   'site/2014/123' = 'site/read&year=2014&id=123'
		'<controller:(post|comment)>/<id:\d+>' => '<controller>/read',  
		//post/100 = PostController/actionRead/id=100
	'
	],
]

###缓存
缓存是提升web 应用性能的最简便有效的方式. 不用增加投入来升级硬件,  只要在代码上做一些处理, 就可能在性能上得到非常可观的改善

####缓存的基本原理
应用一般有一些比较耗时才能计算出来的数据, 这些数据变化并不频繁, 可以考虑把这种数据储存起来, 称其为花奴才能. 当下一次收到需要这个数据的请求时, 我们就直接返回花奴才能的值就可以了, 这样, 就比每次耗时去重新计算生成这些数据, 节省了很多时间和资源

####数据缓存 Data Caching

#####获取缓存组件
- 缓存组件用来表明缓存的存储方式, 储存凡是包括内存, 文件, 数据库等
- 缓存组件通常注册为应用主体的组件, 便于在全局进行配置与访问
$cache = \YII::$app->cache;

##### yii\caching\FileCache
- 使用文件存储缓存数据
- 文件存放路径: @runtime/cache
- 常用于缓存较大块数据, 例如一个整页的内容
config\web.php 
	'comonents'=>['cache'=>['class'=>'yii\caching\FileCache',//文件缓存]]

##### 缓存组件
| 名称 | 描述 |
|-----|------|
| FileCache | 使用文件存储存数据 |
| ApcCache | 使用 PHP APC 扩展 |
| DbCache | 使用一个数据库的表存储缓存数据 |
| DummyCache | 仅作为一个缓存占位符 |
| MemCache | 使用 PHP memcache 和 memcached 扩展 |
| yii\redis\Cache | 基于 Redis 键值对存储器 |
| WinCache | 使用 PHP WinCache 扩展 |
| XCachee | 使用 PHP XCache 扩展 |
| ZendDataCache | 使用 Zend Data Cache 作为底层缓存媒介 |
可在 yiisoft/yii2/caching 中查看支持的组件 和使用方法

##### 缓存API
get() 通过一个指定的键 (key) 从缓存中取回一项数据. 如果该项数据不存在于缓存中或者已经过期/失效, 则返回值 false
	$data = Yii::$app->cache->get('postCount');
set() 通过一个指定的键 (key) 把一项数据存放到缓存中.
	Yii::$app->cache->set('postCount', $data);
其它方法:
| 方法名 | 描述 |
|-------|-----|
| add() | 如果缓存中未找到该键, 则将指定数据存放到缓存中 |
| madd() | 添加多个缓存 |
| mget() | 读取多个缓存 |
| multiGet() | 通过指定的多个键从缓存中取回多项数据 |
| multiSet() | 将多项数据存储到缓存中, 每项数据对应一个键 |
| multiAdd() | 将多项数据存储到缓存中, 每项数据对应一个键 |
| exists() | 返回一个值, 指明某个键是否存在与缓存中 |
| delete() | 通过一个键, 删除缓存中对应的值 | 
| flush() | 删除缓存中的所有数据 | 

##### 缓存组件的可替换性
- 由于所有缓存组件都支持同样的缓存 API
- 不需要修改使用缓存的业务代码就能直接替换为其它底层缓存组件, 只需在应用配置中重新配置一下就可以了

##### 缓存键
存储缓存中的每项数据都通过键作唯一识别. 当你在缓存中存储一项数据时, 必须为它指定一个键, 稍后从缓存中取回数据时, 也需要提供相应的键

##### 缓存键前缀
当同一个缓存存储器被用于多个不同的应用时, 应该为每个应用指定一个唯一的缓存键前缀以避免缓存键冲突. 可以通过配置
yii\caching\Cache::keyPrefix 属性实现
common/config/main.php 
```php
'components' => [
	'cache' => [
		'class' => 'yii\caching\ApcCache',
		'keyPrefix' => 'myapp', //唯一键前缀
	]
]
```

##### 设置有效期
- 当缓存没有设置有效时间时, 会一直存在, 除非空间不够时
- 可以在调用 yii\caching\Cache::set() 存储一项数据时提供一个过期时间参数. 该参数代表这项数据在缓存中可保持有效多少秒
- 调用 yii\caching\Cache::get() 取回数据时, 如果它已经过了超时时间, 该方法将返回 false, 表明在缓存中找不到这项数据.

######缓存过期的优缺点
**优点**
- 实现简单
- 效果明显
**缺点**
- 有延时

调节过期时间来平衡优化效果和实时性的矛盾

$cache->set('key','hello world!',15);
$cache->add('key','hello world!',15);  //15秒

##### 缓存依赖
缓存依赖以 yii\caching\Dependency 派生类的对象, 这个对象可以设置一个缓存依赖条件, 当这个条件发生变化时, 缓存会被设置为失效状态.

######DB依赖  DbDependency
如果指定 SQL 语句的查询结果发生了变化, 则依赖改变

$dependency = new \yii\caching\DbDependency(
	['sql'=>'SELECT count(*) FROM yii.order']
);

当数据库order发生变化的时候 db_key 的值将会被清除
$cache->add('db_key','hello world!',3000,$dependency);
	

######文件依赖 FileDependency
如果文件的最后修改时间发生变化, 则依赖改变

//建立依赖
$dependency = new \yii\caching\FileDependency(['fileName']=>'hw.txt']);

//当文件hw.txt发生变化后 'file_key'的值将返回 false
$cache->add('file_key','hello world!',3000,$dependency);


######表达式依赖   ExpressionDependency
如果指定的 PHP 表达式执行结果发生变化, 则依赖改变

$dependency = new \yii\caching\ExpressionDependency(
	['expression'=>'\YII::$app->request->get("name")']
);

//当get传递的值发生变化后 expression_key 的值将会被清除
$cache->add('expression_key','hello world!',3000,$dependency);


ChainedDependency	如果依赖链上任何一个依赖产生变化, 则依赖改变
GroupDependency		将一项缓存数据标记到一个组名, 你可以通过调用对象的 invalidate() 一次性将相同组名的缓存全部置为失效状态


####片段缓存 Fragment Caching
指的是缓存页面内容中的某个片段
- 每个片段缓存有一个全局唯一的标记
- 缓存过期时间duration 指定了缓存过期的秒数, 是最常用的选项
- 和数据缓存一样, 片段缓存的内容一样可以这是缓存依赖


```php
<?php
	//缓存依赖条件
	$dependency = new DbDependency(['sql' => 'select count(id) from post']);

	//$this->beginCache 开始缓存  duration 设置缓存时间  dependency 指定缓存依赖
	if ($this->beginCache('cache',['duration' => 30], ['dependency' => $dependency])){
		echo 12312;
		// 动态内容
		// echo $this->renderDynamic('return Yii::$app->user->identity->name;');
		//结束缓存
		$this->endCache();
	}
?>
```

##### 片段缓存嵌套
片段缓存可以被嵌套使用. 一个片段缓存可以被另一个包裹

	Note: 缓存嵌套时 内部缓存时间将会无效

##### 动态内容
使用片段缓存时, 可能会遇到一大段较为静态的内容中有少许动态内容的情况
可以在片段缓存中调用 yii\base\View::renderDynamic() 去插入动态内容
	
		
#### 页面缓存 Page Caching
页面缓存指的是在服务器端存整个页面的内容. 当页面被请求时, 内容将从缓存中取出, 而不是重新生成
- 页面缓存由 yii\filters\PageCache 类提供支持该类是一个过滤器, 在控制器类中使用
- 用 only 来指定缓存的页面
- 用 duration 指定页面缓存过期的秒数
- 页面缓存的内容一样可以设置缓存依赖
- 可以在还是使用页面缓存的同时, 使用片段缓存和动态内容

##### 缓存变化
缓存的内容可能需要根据一些参数的更改而变化
例如: 一个Web应用支持多语言, 同一段视图代码也需要生成多个语言的内容. 因此可以设置缓存根据应用当前语言而变化
['variations' => [Yii::$app->language]]

```php
	public function behaviors(){	  				//行为  会在所有控制器执行前运行	
		'pageCache' => [
			'class' => 'yii\filters\PageCache',		//页面缓存
			'only' => ['index'],					//缓存指定的控制器
			'duration' => 1000,						//缓存时间
			//
			'variations' => [
				Yii::$app->request->get('page'),
			],							
			'dependency' => [						//缓存依赖
				'class' => 'yii\caching\FileDependency', 
				//'fileName' => 'hw.txt'
				'sql' => 'select count(id) from post'
			]	
		];
	}
```php

#### HTTP缓存 HTTP Caching
HTTP缓存是利用个客户端来缓存页面, 节省页面的生成和传输的时间
- HTTP缓存通过配置 yii\filters\HttpCache 过滤器来实现
- 过滤器能为请求设置三种与缓存有关的 HTTP 头
	yii\filters\HttpCaChe::lastModified
	yii\filters\HttpCache::etagSeed
	yii\filters\HttpCache::cacheControlHeader
- 用 only 来指定缓存的页面

##### Last-Modified 头
- Las-Modified 头使用时间戳标明页面自上次客户端缓存后是否被修改过
- 通过配置 lastModified 属性向客户端发送 Last-Modified 头. 该属性的值应该为 PHP callable 类型, 返回的是页面修改时的 Unix 时间戳 

##### ETag头
- ETag 使用一个哈希值表示页面内容, 如果页面被修改过, 哈希值也会随之改变, 浏览器根据ETag 是否变化来决定是否应该刷新页面
- 通过配置 yii\filters\HttpCache::etagSeed 属性向客户端发送 ETag 头

##### Cache-Control 头
Cache-Control 头指定了页面的常规缓存策略. 可以通过配置 yii\filters\HttpCache::cacheControlHeader 属性发送相应的头信息

```php
	public function behaviors(){  //行为  会在所有控制器执行前运行	
		'httpCache' => [
			'class' => 'yii\filters\HttpCache',	//Http缓存
			'only' => ['datail'],
			'lastModified' => function($action, $params){
				$q = new \yii\db\Query();
				return $q->from('post')->max('update_time');
				//响应头last-modified: 时间戳 格林
			}
			//设置 哈希值
			'etagSeed'=>function(){				//偏向于内容
				$post = $this->findModel(Yii::$app->request->get('id'));
				return serialize([$post->title,$post->content]);

			}
			//设置缓存时间 默认3600秒
			'cacheControlHeader' => 'public,max-age=600'
		];
	}
	
```	
	
	Note: 先判断 lastModified 在判断 etagSeed



public function beforeSave(){		//在添加或者更新时调用
	if(parent::beforeSave($insert)){//先调用父类的方法
		$tiem = time();
		if($this->isNewRecord){		//
			$this->date = $time;
		}
		$this->update_date = $tiem;
		return true;
	}
	return false;
}
	


