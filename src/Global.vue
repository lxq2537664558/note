<script>
	const modal = weex.requireModule('modal')

  export default {
  	// 全局变量

    // 静态资源地址 static
    sUrl: 'http://api.hy590.vip/appStatic/',
    // auth 验证域名
    authUrlArr: ['MyCenter'],
    authUrlJump: ['MyCenter'],

    // 全局方法

		// 检测是否为特殊的 ios
		isIpx:() => {
      return weex && weex.config.env.osName == 'iOS' && weex.config.env.platform == 'iOS'
			// return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
      // return false
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
    alterTip(text, s){
			if (!s) {
				s = 1
			}
			modal.toast({
				message: text,
				duration: s
			})
    }
  }
</script>