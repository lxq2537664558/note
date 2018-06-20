<template>
  <div>
    <head-nav @tabTo="onTabTo"></head-nav>
    <scroller :class="['main-list', isIpx() ? 'w-ipx' : '']" offset-accuracy="300" loadmoreoffset="300">
      <announcement :bulletinText="bulletinText"></announcement>
      <!--优惠办理中心-->
      <div style="height: 60px;flex-direction: row;background-color: #eeeeee">
        <div style="flex: 1;align-items: flex-start;justify-content: center">
          <image :src="left_arrow" alt="" style="width: 45px;height: 45px"></image>
        </div>
        <div style="flex: 1;flex-direction: row;align-items:center;justify-content: center">
          <image :src="discountLogo" alt="" style="height: 40px;width: 40px"></image>
          <text style="color: #b72021;margin-left: 10px;font-size: 30px">优惠办理中心</text>
        </div>
        <div style="flex: 1;align-items: flex-end;justify-content: center">
          <image :src="right_arrow" alt="" style="height: 45px;width: 45px;"></image>
        </div>
      </div>
      <!--列表-->
      <scroller :class="['scroller-list', isIpx() ? 'w-ipx' : '']" style="background-color: #dddddd">
        <div style="flex-direction: row;flex-wrap: wrap;justify-content: space-between">
          <div @click="clickDiscount(discount.url)" v-for="(discount, k) of discountList" style="flex-direction: row;width: 370px;background-color: #fff;height: 120px;margin-bottom: 5px;margin-left: 2px;margin-right: 2px;align-items: center">
            <div style="flex: .2;justify-content: center;align-items: center">
              <text style="width: 50px;height: 50px;border-radius: 25px;color: #fff;text-align: center;padding-top: 5px;font-size: 36px;background-color: #fb9640">{{k + 1}}</text>
            </div>
            <div style="flex: .8">
              <text style="font-size: 28px;color: #333;">{{discount.title}}</text>
            </div>
          </div>
        </div>
      </scroller>
    </scroller>
    <!--提交-->
    <div v-if="maskShow">
      <div class="mask-black" style="justify-content: center;align-items: center"></div>
      <div class="mask-center" style="flex-direction: column;justify-content: center;align-items: center">
        <!--表单-->
        <div style="background-color:#fff;width: 680px;height: 540px;flex-direction: column;align-items: center;border-radius: 20px">
          <div style="height: 75px;margin-bottom: 0;justify-content: center">
            <text style="font-size: 34px">优惠名称</text>
          </div>
          <div style="height: 85px;width: 600px;margin-bottom: 20px">
            <input type="text" name="username" style="flex: 1;background-color: #ededed;border-radius: 20px;padding-left: 30px;padding-top: 20px;padding-bottom: 20px" placeholder="请输入您的会员账号">
          </div>
          <div style="height: 85px;width: 600px;margin-bottom: 20px">
            <input type="text" name="betNumber" style="flex: 1;background-color: #ededed;border-radius: 20px;padding-left: 30px;padding-top: 20px;padding-bottom: 20px" placeholder="注单编号">
          </div>
          <div style="height: 85px;width: 600px;margin-bottom: 20px">
            <input type="text" name="verCode" style="flex: 1;background-color: #ededed;border-radius: 20px;padding-left: 30px;padding-top: 20px;padding-bottom: 20px" placeholder="填写验证码">
          </div>
          <div style="flex: 2;height: 80px;margin-bottom: 30px;justify-content: flex-end">
            <text style="background-color: #ffcb2f;width:300px;color: #555;text-align: center;padding-top: 15px;padding-bottom: 15px;border-radius: 50px">提交</text>
          </div>
        </div>
        <!--关闭按钮-->
        <div style="width: 75px;height: 75px;margin-top: 75px;border-radius: 50px;justify-content: center;align-items: center;border-width: 3px;border-color: #fff;border-style: solid">
          <text @click="clickCloseMask" style="font-size: 70px;color: #fff;padding-top: 5px;">×</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import _c from '@/Global.vue'
	import { WxcOverlay } from 'weex-ui';

	import HeadNav from '../components/headNav.vue';
	import AnCement from '../components/announcement.vue';
	const modal = weex.requireModule('modal')

  export default {
    components: {
      'head-nav': HeadNav,
			'announcement': AnCement,
			WxcOverlay
		},
    data (){
    	return {
				// 公告
				// bulletinText: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
				// 左箭头
				left_arrow: _c.sUrl + '/images/left_arrow_2.png',
				// 右箭头
				right_arrow: _c.sUrl + '/images/right_arrow_2.png',
				// 优惠办理logo
				discountLogo: _c.sUrl + '/images/discount.png',
				// 优惠列表
    		discountList: [
					{
						title: '实时返水',
						url: '1'
					},
					{
						title: '糖果派对&连环夺宝',
						url: '1'
					},
					{
						title: '老虎机注单, 位数1个8',
						url: '1'
					},
					{
						title: '幸运抽抽乐',
						url: '1'
					},
					{
						title: '九周年亿元现金回馈',
						url: '1'
					},
					{
						title: '云闪付APP 秒到账',
						url: '1'
					},
					{
						title: '老虎机注单, 位数1个8',
						url: '1'
					}
        ],
        // 遮罩层 显示
        maskShow: false,

    		testUrl: _c.sUrl + '/images/new_bulletin.png'
      }
    },
    methods: {
    	clickDiscount(url) {
				modal.toast({
					message: '功能维护中',
					duration: 1
				})
        // this.$parent.formList = {
					// 	// show: false,
					// 	show: true,
					// 	title: '优惠活动名称',
					// 	list: [
					// 		{
					// 			name: 'username',
					// 			placeholder: '请输入您的会员账号',
					// 		},
					// 		{
					// 			name: 'betNumber',
					// 			placeholder: '注单编号',
					// 		},
					// 		{
					// 			name: 'yzm',
					// 			placeholder: '填写验证码',
					// 		}
					// 	],
					// 	submitUrl: '',
        //
        // }
				// this.maskShow = true
			},
			openOverlay () {
				this.show = true;
			},
			wxcOverlayBodyClicked() {
				this.maskShow = false;
      },
			clickCloseMask() {
    		this.$parent.bottomMaskShow = false
				this.maskShow = false
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
			}
    },
		mounted() {
			this.$parent.closeLoadding()
		},
		computed: {
			// 公告
			bulletinText(){
				return this.$parent.announcement
			}
		}
  }
</script>
<style scoped>
  .main-list{
    position: fixed;
    top: 110px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .scroller-list {
    position: fixed;
    top: 210px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .mask-black {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: .5;
  }
  .mask-center {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .w-ipx {
     bottom: 140px;
  }
</style>