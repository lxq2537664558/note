<template>
  <div>
    <head-nav @tabTo="onTabTo"></head-nav>
    <scroller :class="['main-list', isIpx() ? 'w-ipx' : '']" offset-accuracy="300" loadmoreoffset="300">
      <!--轮播图-->
      <div style="height: 280px;">
        <slider class="slider" auto-play="true" interval="5000" @change="changeSlider" infinite="true">
          <div class="frame" v-for="slider in sliderList">
            <image class="image" resize="cover" :src="slider.logo" @click="clickSlider(slider.url)"></image>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </div>
      <!--公告-->
      <announcement :bulletinText="bulletinText"></announcement>
      <!--功能-->
      <div style="height: 310px;flex-direction: column;">
        <div style="flex: 1;flex-direction: row;" v-for="v in actionAll">
          <div style="flex: 1;justify-content: center;align-items: center" v-for="action in v.item" @click="clickAction(action.url)">
            <image :src="action.logo" alt="" style="width: 80px;height: 80px"></image>
            <text style="font-size: 22px;margin-top: 10px;color: #666">{{action.title}}</text>
          </div>
        </div>
      </div>
      <!--热门优惠-->
      <div style="height: 415px;">
        <div style="margin-left: 40px;height: 50px;flex-direction: row;align-items: center">
          <div style="height: 28px;width: 5px;background-color: #febc17;"></div>
          <text style="font-weight:bold;font-size: 28px;color: #555;margin-left: 5px">热门优惠</text>
        </div>
        <!--优惠活动-->
        <div style="height: 360px;flex-direction: column;justify-content: space-between;padding-bottom: 5px;">
          <div style="height: 165px;flex-direction: row;justify-content: space-between;padding-left: 40px;padding-right: 40px" v-for="v in hotDeals">
            <div style="background-color: #fff;width: 315px;align-items: center;border-radius: 15px;overflow:hidden;border-color: #ccc;border-style: solid;border-width: 1px" v-for="deals in v.item" @click="clickDeals(deals.url)">
              <image :src="deals.logo" alt="" style="height: 130px;width: 315px;border-top-left-radius:15px;border-top-right-radius:15px;"></image>
              <text style="font-size: 26px;color: #666;line-height: 35px">{{deals.title}}</text>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
	import _c from '@/Global.vue'

	import HeadNav from '../components/headNav.vue';
	import AnCement from '../components/announcement.vue';

	import util from '../util';

	const storage = weex.requireModule('storage')

	export default {
		data() {
			return {
				// 公告
				// bulletinText: '',
				// 轮播图
				sliderList: [
					{
						logo: _c.sUrl + '/images/load_750_280.gif',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/load_750_280.gif',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/load_750_280.gif',
						url: '1'
					}
				],
				// 功能
				actionAll: [
					{
						item: [
							{
								title: '实时返水',
								logo: _c.sUrl + '/images/round/real_time_return_water.png',
								url: '1'
							},
							{
								title: '自动充值',
								logo: _c.sUrl + '/images/round/real_time_return_water.png',
								url: '2'
							},
							{
								title: '超级大转盘',
								logo: _c.sUrl + '/images/round/super_big_turntable.png',
								url: '3'
							},
							{
								title: '自组客服',
								logo: _c.sUrl + '/images/round/cust_service.png',
								url: '4'
							}
						]
					},
					{
						item: [
							{
								title: '认证中心',
								logo: _c.sUrl + '/images/round/auth_center.png',
								url: ''
							},
							{
								title: '游戏APP下载',
								logo: _c.sUrl + '/images/round/game_app_download.png',
								url: ''
							},
							{
								title: '投诉与建议',
								logo: _c.sUrl + '/images/round/feedback.png',
								url: ''
							},
							{
								title: '在线客服',
								logo: _c.sUrl + '/images/round/online_service.png',
								url: ''
							}
						]
					}
				],
				// 热门优惠
				hotDeals: [
					{
						item: [
							{
								title: '返水秒到账111',
								logo: _c.sUrl + '/images/135-315.png',
								url: '1'
							},
							{
								title: '返水秒到账',
								logo: _c.sUrl + '/images/135-315.png',
								url: '2'
							}

						]
					},
					{
						item: [
							{
								title: '返水秒到账',
								logo: _c.sUrl + '/images/135-315.png',
								url: '3'
							},
							{
								title: '返水秒到账',
								logo: _c.sUrl + '/images/135-315.png',
								url: '4'
							}

						]
					}
				]
			}
		},
		methods: {
			clickAction(url) {
				_c.alterTip('功能维护中', 1)
			},
			clickDeals(url) {
				_c.alterTip('功能维护中', 1)
			},
			changeSlider(event) {
				// console.log(event)
			},
			clickSlider(url) {
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
			closeLoad() {
				this.$parent.isShow = false;
			},
			isIpx() {
				return _c.isIpx()
			},
      init() {
				util.GET('oaSystem/advert', {}, e => {
					this.$parent.announcement = e.data.data.bulletinText
          // console.log(e)
					this.sliderList = e.data.data.sliderList
				}, e => {
				}, (e) =>{})
      }
		},
		created() {
			this.init()
			// console.log(this.$parent.sliderList)
			// this.sliderList = this.$parent.sliderList
		},
		watch: {},
    computed: {
			// 公告
			bulletinText(){
				return this.$parent.announcement
      }
    },
		components: {
			'head-nav': HeadNav,
			'announcement': AnCement
		},
		mounted() {
			this.$parent.closeLoadding()
      // console.log()
      // this.sliderList = this.$parent.sliderList
      this.sliderList =  [
				{
					logo: _c.sUrl + '/images/route_blurry_background.png',
					url: '1'
				},
				{
					logo: _c.sUrl + '/images/route_blurry_background.png',
					url: '1'
				}
      ]
		}
	}
</script>
<style scoped>
  .c3 {
    color: #333333
  }
  .main-list{
    position: fixed;
    top: 110px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .w-ipx {
    bottom: 140px;
  }
  .iconfont {
    font-family:iconfont;
  }
  /*轮播*/
  .image {
    width: 750px;
    height: 280px;
  }
  .slider {
    width: 750px;
    height: 280px;
  }
  .frame {
    width: 750px;
    height: 280px;
    position: relative;
  }
  .indicator {
    width: 750px;
    height: 40px;
    item-color: white;
    item-selected-color: #b4282d;
    item-size: 12px;
    position: absolute;
    bottom: 10px;
    right: 0px;
  }
</style>