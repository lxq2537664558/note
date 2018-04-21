/webpack-dev-server.js



安装cnpm
	npm install -g cnpm --registry=https://registry.npm.taobao.org

安装vue-cli
	cnpm install -g vue-cli

npm install --no-optional

npm install live-server
live-server  直接启动本地的一个服务器
npm init 项目初始化


安装vue环境

	安装node.js

	安装vue-cli
		cnpm install -g vue-cli

	新建一个vue 项目
		vue init webpack vue-demo


Vue.js 是用于构建交互式的 Web 界面的库
Vue.js 提供了 MVVM 数据绑定和一个可组合的组件系统，具有简单、灵活的 API


指令 
	Vue.js的指令是以v-开头的，它们作用于HTML元素，指令提供了一些特殊的特性，将指令绑定在元素上时，指令会为绑定的目标元素添加一些特殊的行为，我们可以将指令看作特殊的HTML特性（attribute）

常用指令
	v-if
		根据条件表达式的值来执行元素的插入或者删除行为。
	v-show
		条件渲染指令，和v-if指令不同的是，使用v-show指令的元素始终会被渲染到HTML，它只是简单地为元素设置CSS的style属性。
	v-else
		为v-if或v-show添加一个“else块”。v-else元素必须立即跟在v-if或v-show元素的后面——否则它不能被识别
	v-for="item in items"
		基于一个数组渲染一个列表 items是一个数组，item是当前被遍历的数组元素。
	v-bind
		可以在其名称后面带一个参数，中间放一个冒号隔开，这个参数通常是HTML元素的特性（attribute），例如：v-bind:class
	v-on
		和v-bind 类似  绑定方法  <a v-on:click="doSomething">
	v-model

	v-bind指令可以缩写为一个冒号，v-on指令可以缩写为@符号。




当两个name一样的表单存在 key属性抹掉数据

v-if
v-else-if
v-else

//循环
v-for="v in news"
v-for="v in 20"  
v-for="(v,k,index) of news"


v-bin:class="hd"
:class="{color:false,font:true}"   //判断给
:class="['color', 'font']"     //直接给类

v-on:click
v-on:keyup.enter  //回车时执行  

//绑定数据
v-model="hd"

//只绑定一次
v-once


//引入数据
v-text
v-html

//方法   执行时间
methods: {
	
}


//实例   返回数据  计算属性
computed: {
	sum(){
		return 
	}
}  

//监听   数据改变的时候  
watch: {
	word: function(newV, oldV){
		app.result
	}
}


//追加数据
	push
	unshift
	pop
	shift

	//删除
	splice(start, lenth)
	//排序
	sort
	//反转
	reverse


插件
	axios     //http请求
		axios.get('php').then(function()response{

		})

	lodash    //延时执行
		_.debounce(function(){}, 1000)






<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <div id="app">
        	<my-component></my-component>
            <p><input type="text" v-model="message"></p>
            <p>
                <!--click事件直接绑定一个方法-->
                <button v-on:click="greet">Greet</button>
            </p>
            <p>
                <!--click事件使用内联语句-->
                <button v-on:click="say('Hi')">Hi</button>
            </p>
        </div>
    </body>
    <script src="js/vue.js"></script>
    <script>
 		// 1.创建一个组件构造器
        var myComponent = Vue.extend({
            template: '<div>This is my first component!</div>'
        })
        
        // 2.注册组件，并指定组件的标签，组件的HTML标签为<my-component>
        Vue.component('my-component', myComponent)

        var vm = new Vue({
            el: '#app',
            data: {
                message: 'Hello, Vue.js!'
            },
            // 在 `methods` 对象中定义方法
            methods: {
                greet: function() {
                    // // 方法内 `this` 指向 vm
                    alert(this.message)
                },
                say: function(msg) {
                    alert(msg)
                }
            },
			components: {
				//局部注册
			}
        })
    </script>
</html>