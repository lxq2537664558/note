<template>
  <div>
    <scroller class="pos-a" offset-accuracy="300" loadmoreoffset="300">
      <!--轮播图-->
      <div class="h280">
        <slider class="h280 w750" auto-play="true" interval="5000" @change="changeSlider" infinite="true">
          <div class="h280 w750 pos-r" v-for="slider in sliderList">
            <image class="h280 w750" resize="cover" :src="slider.logo" @click="clickSlider(slider.url)"></image>
          </div>
          <indicator class="w750 h40 indicator"></indicator>
        </slider>
      </div>
      <!--公告-->
      <announcement></announcement>
      <!--功能-->
      <div class="h310 fdc" >
        <div class="f1 fdr" v-for="v in actionAll">
          <div class="f1 f-cent" v-for="action in v.item"
               @click="clickAction(action.url)">
            <image :src="action.logo" alt="" class="w80 h80" ></image>
            <text class="action-text f22 mt10">{{action.title}}</text>
          </div>
        </div>
      </div>
      <!--热门优惠-->
      <div class="hot-discount">
        <div class="ml40 h50 fdr fac">
          <div class="discount-icon mt5 w5"></div>
          <text class="discount-tip-text f28 ml5" style="">热门优惠</text>
        </div>
        <!--优惠活动-->
        <div class="pb5 fdc h360 fjsb">
          <div class="fdr fjsb pl40 pr40 h165" v-for="v in hotDeals">
            <div class="discount-item fac bor-r15 w315"
                v-for="deals in v.item" @click="clickDeals(deals.url)">
              <image :src="deals.logo" alt="" class="discount-img"></image>
              <text class="discount-text f24 pb5">{{deals.title}}</text>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .indicator
    item-color: white
    item-selected-color: #b4282d
    item-size: 12px
    position: absolute
    bottom: 10px

  .action-text
    color: $font_color

  .hot-discount
    height: 415px

  .discount-icon
    height: 28px
    background-color: $main_color

  .discount-tip-text
    font-weight: 700
    color: $font_color

  .discount-item
    background-color: #ffffff
    border-color: #cccccc
    border-style: solid
    border-width: 1px

  .discount-img
    width: 313px
    height: 130px
    border-top-left-radius: 15px
    border-top-right-radius: 15px

  .discount-text
    color: $font_color
    text-align: center

</style>

<script>
	import _c from '@/Global.vue'
	// import util from '@/assets/util.js';
	import AnCement from '../components/announcement.vue';

	// const storage = weex.requireModule('storage')

	export default {
		components: {
			'announcement': AnCement
		},
		data() {
			return {
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
								title: '返水秒到账',
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
			init() {
				// 获取公告
				this.$store.dispatch('advert')
			}
		},
		created() {
			this.init()
		},
		watch: {},
		computed: {
			// 轮播图
			sliderList() {
				return this.$store.getters.getSliderList
      }
		},
		mounted() {
			// this.$parent.closeLoadding()
		}
	}
</script>
