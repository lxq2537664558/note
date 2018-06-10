<script>
  export default {
  	// 全局变量

    // 静态资源地址 static
    sUrl: 'http://api.hy590.vip/appStatic/',

    // 全局方法

		// 检测是否为特殊的 ios
		isIpx:() => {
			return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
		},
  }
</script>