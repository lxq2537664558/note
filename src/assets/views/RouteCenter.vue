<template>
  <div>
    <!--<head-nav @tabTo="onTabTo"></head-nav>-->
    <!--网址-->
    <div class="h280">
      <div class="pos-a">
        <image :src="domainsBackground" alt="" class="h280 w750"></image>
      </div>
      <div class="f1 fdr fjsa fic">
        <div @click="clickDomain(v.url)" v-for="v in domains" class="h150 w150 fic fjc bor-r75 domain-item">
          <text style="color: #edc23b;font-weight: 700;font-size: 30px;">{{v.title}}</text>
        </div>
      </div>
    </div>
    <!--公告-->
    <announcement></announcement>

    <div style="flex: 1;">
      <!--线路-->
      <list class="pos-a">
        <cell class="h130" v-for="route in routes">
          <div class="bc-f h110 mt20 fdr fic">
            <div class="fdr route-title">
              <!--<image :src="routeCenterLogo" alt="" class="ml20 h30 w30"></image>-->
              <text class="iconfont ml20 route-icon">&#xe882;</text>
              <text class="ml10 f22 route-title-text">{{route.title}}</text>
            </div>
            <div class="bc-a h50 route-separate" ></div>
            <div class="w400 f-cent">
              <text class="pt5 pb5 pr30 pl30 bor-r30 f28 route-url-text">{{route.showUrl}}</text>
            </div>
            <div @click="clickRoute(route.url)" class="h110 w180 route-click f-cent">
              <text class="f28 route-click-text">进入游戏>></text>
            </div>
          </div>
        </cell>
      </list>
    </div>
  </div>
</template>
<script>
	import _c from '@/Global.vue'
	import util from '../util';

	import HeadNav from '../components/headNav.vue';
	import AnCement from '../components/announcement.vue';

	export default {
		data() {
			return {
				routeCenterLogo: _c.sUrl + '/images/route_center_active.png',
				// 公告
				// bulletinText: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
				// domain
				domains: [
					{
						'title': '1001.net',
						'url': '1005.net',
						'textClass': ''
					},
					{
						'title': '1005.net',
						'url': '1005.net',
						'textClass': ''
					},
					{
						'title': '1005.net',
						'url': '1005.net',
						'textClass': ''
					}
				],
				domainsBackground: _c.sUrl + '/images/route_blurry_background.png',
				//  route
				routes: [
					{
						title: '加载中',
						showUrl: 'http://hd5009.com',
						url: '1'
					},
					{
						title: '加载中',
						showUrl: 'http://hd5009.com',
						url: '1'
					}
				]
			}
		},
		methods: {
			clickDomain(url) {
				_c.alterTip('功能维护中', 1)
			},
			clickRoute(url) {
				_c.alterTip('功能维护中', 1)
			},
			onTabTo(url) {
				this.$parent.onTabTo({
					data: {
						key: url
					},
					status: 'navTabTo'
				})
			},
			isIpx() {
				return _c.isIpx()
			},
			init() {
				util.GET('oaSystem/urlCesu', {}, e => {
					this.domains = e.data.data.domains
					this.routes = e.data.data.routes
				}, e => {
				}, (e) => {
				})
			}
		},
		components: {
			'head-nav': HeadNav,
			'announcement': AnCement,
		},
		mounted() {
			this.init()
			// this.$parent.closeLoadding()
			// this.$parent.isShow = false
		},
		computed: {
			bulletinText() {
				return this.$parent.announcement
			}
		},
		created() {
		}
	}
</script>
<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .domain-item
    border-color: $main_color
    border-width: 3px
    border-style: solid

  .route-title
    width: 169px

  .route-title-text
    color: $font_color

  .route-separate
    width: 1px

  .route-url-text
    background-color: #f7f7f7
    color: $font2_color

  .route-click
    background-color: #fecd2e

  .route-click-text
    color: $font_color
    font-weight: 700

  .route-icon
    color: $main_color
</style>