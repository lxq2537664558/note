// let navigator = weex.requireModule("navigator");
const stream = weex.requireModule('stream');
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const domModule = weex.requireModule('dom');

const Utils = {
	getRequest(url, header, callback, failCallback, clearLogin, method, body) {
		let fetchData = {
			type: 'json',
			// headers: header,
			url: url,
		}
		if (body) {
			fetchData.body = body
		}
		if (method) {
			fetchData.method = method;
		} else {
			fetchData.method = "GET";
			fetchData.headers = header
		}
		// console.log(fetchData)
		stream.fetch(fetchData, (rst) => {
			// console.log(rst)
			if (rst.data) {
				if (rst.data.code == 200) {
					callback(rst)
				} else if (rst.data.code == 101 || rst.data.code == 102) {
					// 验证失败
					// 提示信息
					// 删除用户登录信息  和缓存
					clearLogin(rst.data)
				} else {
					failCallback(rst)
				}
			} else {
				failCallback(rst)
			}
		}, (rst) => {
		})
	},
	GET(api, data, callback, failCallback, clearLogin) {
		let self = this
		let url = 'http://api.hy590.vip/' + api
		// let url = 'http://my.vuethink.com/' + api
		// 有参数的话  拼接为字符串加在 url后面
		if (data.length > 0) {
			let formStr = ''
			data.forEach((el) => {
				if (el.name) {
					formStr += el.name + '=' + el.value + '&'
				}
			})

			if (formStr) {
				url += '?' + formStr.substr(0, formStr.length - 1)
			}
		}

		let header = {
			'dev-type': WXEnvironment.platform
		}
		storage.getItem('userInfo', e => {
			if (e.result == 'success') {
				let userInfo = {}
				if (e.data) {
					userInfo = JSON.parse(e.data)
				}

				header.authKey = userInfo.auth
				// console.log(userInfo)
				self.getRequest(url, header, callback, failCallback, clearLogin)
			} else {
				self.getRequest(url, header, callback, failCallback, clearLogin)
			}
		})
	},
	POST(api, data, callback, failCallback, clearLogin) {
		let self = this
		let url = 'http://api.hy590.vip/' + api
		// let url = 'http://my.vuethink.com/' + api
		// 有参数的话  拼接为字符串加在 url后面
		let body = {}
		if (data.length > 0) {
			body = data
		}

		let header = {
			'dev-type': WXEnvironment.platform
		}

		storage.getItem('userInfo', e => {
			if (e.result == 'success') {
				let userInfo = {}
				if (e.data) {
					userInfo = JSON.parse(e.data)
				}

				header.authKey = userInfo.auth
				// console.log(userInfo)
				self.getRequest(url, header, callback, failCallback, clearLogin, 'POST', body)
			} else {
				self.getRequest(url, header, callback, failCallback, clearLogin, 'POST', body)
			}
		})
	},
	/**
	 * 获取weex屏幕真实的设置高度，需要减去导航栏高度
	 * @returns {Number}
	 */
	getPageHeight() {
		const {env} = weex.config;
		const navHeight = this.isWeb() ? 0 : (this.isIPhoneX() ? 176 : 132);
		return env.deviceHeight / env.deviceWidth * 750 - navHeight;
	},
	// 新版
	isTaobao() {
		const {appName} = weex.config.env;
		return /(tb|taobao|淘宝)/i.test(appName);
	},
	isTrip() {
		const {appName} = weex.config.env;
		return appName === 'LX';
	},
	isBoat() {
		const {appName} = weex.config.env;
		return appName === 'Boat' || appName === 'BoatPlayground';
	},
	isWeb() {
		const {platform} = weex.config.env;
		return typeof (window) === 'object' && platform.toLowerCase() === 'web';
	},
	isIOS() {
		const {platform} = weex.config.env;
		return platform.toLowerCase() === 'ios';
	},
	/**
	 * 是否为 iPhone X
	 * @returns {boolean}
	 */
	isIPhoneX() {
		const {deviceHeight} = weex.config.env;
		if (this.isWeb()) {
			return typeof window !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375) && (parseInt(window.screen.height, 10) === 812);
		}
		return this.isIOS() && deviceHeight === 2436;
	},
	isAndroid() {
		const {platform} = weex.config.env;
		return platform.toLowerCase() === 'android';
	},
	isAlipay() {
		const {appName} = weex.config.env;
		return appName === 'AP';
	},
	isTmall() {
		const {appName} = weex.config.env;
		return /(tm|tmall|天猫)/i.test(appName);
	},
	isAliWeex() {
		return this.isTmall() || this.isTrip() || this.isTaobao();
	},

	// 跳转
	toUrl(obj, url) {
		if (url.path) {
			if (url.auth) {
				let userInfo = obj.$store.getters.getUserInfo
				if (!userInfo || Object.keys(userInfo).length == 0) {
					this.alterTip('请先绑定会员', 0, true, () => {
						// 记录要跳转的页面
						obj.$store.dispatch('setJumpUrl', url)
						// 显示登录框
						obj.$store.dispatch('showLoginForm', obj)
					})
					return false;
				}
			}

			// 初始化导航头
			obj.$store.dispatch('setHeadNavInit')
			// 更换选中页
			if (typeof url.index != 'undefined') {
				obj.$store.dispatch('setCurrentIndex', url.index)
			}

			obj.$router.push({path: '/' + url.path})
		} else {
			this.alterTip('无效操作')
		}
	},
	urlToGo(obj, index) {
		// 初始化导航头
		obj.$store.dispatch('setHeadNavInit')
		// 默认返回上一页
		if (!index) {
			index = -1
		}
		obj.$router.go(index)
	},

	// 字体
	loadFonts() {
		domModule.addRule('fontFace', {
			'fontFamily': "iconfont",
			'src': "url('http://at.alicdn.com/t/font_716301_ecdo3253yc.ttf')"
		})
	},
	decodeIconFont(text) {
		// 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
		const regExp = /&#x[a-z|0-9]{4,5};?/g;
		if (regExp.test(text)) {
			return text.replace(new RegExp(regExp, 'g'), function (iconText) {
				const replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
				return String.fromCharCode(replace);
			});
		} else {
			return text;
		}
	},

	// 本地缓存 storage
	getCache(key, action, fialAction) {
		if (key === null || key === '') {
			// key值不能为空
			return false
		}

		storage.getItem(key, (e) => {
			if (e.result == 'success') {
				action(e);
			} else {
				fialAction(e);
			}
		})
	},
	setCache(key, value) {
		if (key === null || key === '') {
			// key值不能为空
			return false
		}

		if (value === '' || value === null) {
			// 删除
			storage.removeItem(key, e => {
			})
		} else {
			storage.setItem(key, value, e => {
			})
		}
	},
	// 获取缓存
	getStorage(key, action){
		if( key === null || key === '') {
			return false
		}

		storage.getItem(key, action)
	},

	// 提示
	alterTip(text, s, alter, action) {
		if (!action) {
			action = () => {}
		}
		if (!s) {
			s = 0.5
		}
		if (alter) {
			modal.alert({
				message: text,
				duration: s
			}, action)
		} else {
			modal.toast({
				message: text,
				duration: s
			})
		}
	},

	// 请求
	quest(url, body, header, callback, type) {
		let fetchOption = {
			url: url,
			headers: header,
			type: 'json',
			method: type
		}

		if (body) {
			fetchOption.body = body
		}

		// console.log(fetchData)
		stream.fetch(fetchOption, (rst) => {
			callback(rst)
		}, (rst) => {
			// 请求状态
			// console.log(rst)
		})
	},
	questApi(api, data, callback, type) {
		let self = this
		let url = 'http://api.hy590.vip/' + api

		// 默认get请求
		if (!type) {
			type = 'GET'
		}

		// 设备头
		let header = {
			'dev-type': WXEnvironment.platform
		}

		// 有参数的话  拼接为字符串加在 url后面
		let body = ''
		let urlStr = ''
		if (Object.keys(data).length > 0) {
			if (type == 'GET') {
				// get  连接到url
				for(let item in data){
					urlStr += item + '=' + data[item] + '&'
				}

				if (urlStr) {
					url += '?' + urlStr.substr(0, urlStr.length - 1)
				}

			} else {
				// post 需要将 Content-Type 设为 'application/json'
				header['Content-Type'] = 'application/json'
				body = JSON.stringify(data)
			}
		}

		// 是否加上 header 头
		storage.getItem('userInfo', e => {
			if (e.result == 'success') {
				let userInfo = {}
				if (e.data) {
					userInfo = JSON.parse(e.data)
				}

				header.authKey = userInfo.auth
				// console.log(userInfo)
				self.quest(url, body, header, callback, type)
			} else {
				self.quest(url, body, header, callback, type)
			}
		})
	},
	dataCheck(store, rst, action, failaction){
		// 关闭加载loading
		store.dispatch('closeLoading')

		if (!rst.data) {
			this.alterTip('请求失败, 请联系客服!', 1, true)
			return false
		}

		if (rst.data.code != 200) {
			if (rst.data.code == 101) {
				// 登录失效  清空会员数据
				store.dispatch('setUserInfo', {})

				//提示
			} else if (rst.data.code == 102) {
				// 数据刷新中
			}

			// 错误最后执行的方法   提示
			if (failaction) {
				failaction(rst.data.message)
			}else{
				this.alterTip(rst.data.message, 1, true)
			}

			return false
		}

		action(rst.data.data)
		return true
	}
}

export default Utils
