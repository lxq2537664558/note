let navigator = weex.requireModule("navigator");
const stream = weex.requireModule('stream');
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')


let utilFunc = {
    initIconFont () {
        let domModule = weex.requireModule('dom');
        domModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0')"
        });
    },
    setBundleUrl(url, jsFile) {
        const bundleUrl = url;
        let host = '';
        let path = '';
        let nativeBase;
        const isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
        const isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
        if (isAndroidAssets) {
            nativeBase = 'file://assets/dist';
        } else if (isiOSAssets) {
            nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
        } else {
            const matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
            const matchFirstPath = /\/\/[^\/]+\/([^\/\s]+)\//.exec(bundleUrl);
            if (matches && matches.length >= 2) {
                host = matches[1];
            }
            if (matchFirstPath && matchFirstPath.length >= 2) {
                path = matchFirstPath[1];
            }
            nativeBase = 'http://' + host + '/';
        }
        const h5Base = './index.html?page=';
        // in Native
        let base = nativeBase;
        if (typeof navigator !== 'undefined' && (navigator.appCodeName === 'Mozilla' || navigator.product === 'Gecko')) {
            // check if in weexpack project
            if (path === 'web' || path === 'dist') {
                base = h5Base + '/dist/';
            } else {
                base = h5Base + '';
            }
        } else {
            base = nativeBase + (!!path? path+'/':'');
        }

        const newUrl = base + jsFile;
        return newUrl;
    },
    getUrlSearch(url,name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = url.slice(url.indexOf('?')+1).match(reg);
        if (r != null) {
            try {
                return decodeURIComponent(r[2]);
            } catch (_e) {
                return null;
            }
        }
        return null;
    },
		// 请求
		GET (api, data, callback, failCallback, clearLogin) {
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
					let userInfo = e.data ? JSON.parse(e.data) : {}
					header.authKey = userInfo.auth
					// console.log(userInfo)
					self.getRequest(url, header, callback, failCallback, clearLogin)
				} else {
					self.getRequest(url, header, callback, failCallback, clearLogin)
				}
			})
		},
		getRequest(url, header, callback, failCallback, clearLogin) {
    	stream.fetch({
				method: 'GET',
				type: 'json',
				headers: header,
				url: url
			}, (rst) => {
				if(rst.data.code == 200){
					callback(rst)
				} else if(rst.data.code == 101) {
					// 验证失败
					// 提示信息
					modal.alert({
						message: rst.data.message,
						duration: 1
					}, function (value) {})
					// 删除用户登录信息  和缓存
					clearLogin()
				} else {
					failCallback(rst)
				}
			}, (rst) => {
			})
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
				storage.removeItem(key, e => {})
			} else {
				storage.setItem(key, value, e => {})
			}
		},
};

export default utilFunc;