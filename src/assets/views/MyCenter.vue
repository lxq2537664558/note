<template>
  <div>
    <head-nav @tabTo="onTabTo"></head-nav>
    <scroller :class="['main-list', isIpx() ? 'w-ipx' : '']" offset-accuracy="300" loadmoreoffset="300">
      <!--个人资料-->
      <div style="height: 220px">
        <div style="position: absolute;top: 0;left:0;right: 0;bottom:0">
          <image :src="userInfoBlurryBackground" alt="" style="height: 220px;width: 750px"></image>
        </div>
        <div class="user-info">
          <div style="width: 130px;margin-left: 50px">
            <image :src="user.head_img" alt="" style="height: 130px;width: 130px;border-radius: 65px;"></image>
          </div>
          <div style="flex: 1;justify-content: center;align-items: center">
            <text class="user-info-text" style="color: #fff;">账号:  {{user.username}}</text>
            <text @click="clickLevel" class="user-info-text" style="margin-top: 15px;background-color: #fdcc2e;color: #333;padding-left: 20px;padding-right: 20px;padding-top: 5px;padding-bottom: 5px;border-radius: 20px">等级: VIP{{user.level}}</text>
          </div>
          <div style="flex: .9"></div>
          <div style="flex: 1.1;flex-direction: row;justify-content: center;" @click="clickSignIn">
            <image :src="signInLogo" alt="" style="width: 40px;height: 40px;"></image>
            <text style="color: #fff;font-size: 26px;margin-left: 10px;padding-top: 5px">每日签到 ></text>
          </div>
        </div>

      </div>
      <!--列表-->
      <!--<scroller scroll-direction="horizontal">-->
        <scroller class="['center-list-scroller', isIpx() ? 'w-ipx' : '']">
          <div class="center-list">
            <div v-for="list in centerList" @click="clickList(list)" style="width: 370px;height: 120px;background-color: #fff;margin-bottom: 5px;flex-direction: row">
              <div style="flex: .3;align-items: flex-end;justify-content: center;">
                <image :src="list.logo" alt="" style="width: 50px;height: 50px;"></image>
              </div>
              <div style="flex: 1;justify-content: center;padding-left: 20px">
                <text class="t3" style="font-size: 30px;font-weight: bold">{{list.t1}}</text>
                <text class="t3" style="font-size: 20px">{{list.t2}}</text>
              </div>
            </div>
          </div>
        </scroller>
      <!--</scroller>-->


    </scroller>
    <!--遮罩-->
    <div @click="clickCloseMask" v-if="maskShow" class="mask-black" style="justify-content: center;align-items: center"></div>
    <!--签到成功-->
    <div @click="clickCloseMask" v-if="maskSignInShow" class="mask-sign-in" style="justify-content: center;align-items: center">
      <image :src="signInSuccess" alt="" style="width: 600px;height: 600px"></image>
    </div>
    <!--确认按钮-->
    <wxc-dialog :title="confirm.title"
                :content="confirm.content"
                :show="confirm.show"
                :single="false"
                @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked">
    </wxc-dialog>
  </div>
</template>
<script>
	import { WxcDialog } from 'weex-ui';
	import _c from '@/Global.vue'

	const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
	import util from '../util'
	import HeadNav from '../components/headNav.vue';

  export default {
    components: {
      'head-nav': HeadNav,
			WxcDialog
    },
    data() {
    	return {
        user: {
					// 头像
					head_img: _c.sUrl + '/images/userDefaultLog.jpg',
          // 名称
          username: 'QAQ',
          // 等级
          level: 2
				},
				// 签到logo
				signInLogo: _c.sUrl + '/images/sing_in.png',
				// 个人信息背景模糊图
				userInfoBlurryBackground: _c.sUrl + '/images/route_blurry_background.png',
        // 列表数据
        centerList: [
					{
						logo: _c.sUrl + '/images/money.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: 'weekLulu',
            action: 'form'
					},
					{
						logo: _c.sUrl + '/images/money.png',
						t1: '领取月俸禄',
						t2: 'VIP月俸禄领取',
						url: 'monthLulu',
						action: 'form'
					},
					{
						logo: _c.sUrl + '/images/integral.png',
						t1: '签到积分兑换',
						t2: '减到积分兑换彩金',
						url: 'IntegralExchange',
						action: 'jump'
					},
					{
						logo: _c.sUrl + '/images/auth_center.png',
						t1: '认证中心',
						t2: '官方信息认证查询',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
					{
						logo: _c.sUrl + '/images/route_blurry_background.png',
						t1: '领取周俸禄',
						t2: 'VIP周俸禄领取',
						url: '1'
					},
        ],
        // 遮罩
				maskShow: false,
        // 签到遮罩
        maskSignInShow: false,
        // 签到成功logo
        signInSuccess:  _c.sUrl + '/images/sign_in_success.png',
    		testUrl: _c.sUrl + '/images/route_blurry_background.png',
        // confirm
        confirm: {}
      }
    },
    methods: {
    	clickList(item) {
				if (item.action == 'form') {
					switch (item.url) {
            case 'weekLulu':
							this.confirm = {
								show: true,
								title: '确定领取周俸禄',
								content: '每周只能领取一次',
                action: () => {
									let self = this
									util.GET('member/weekLulu', {}, e => {
                    this.$parent.tipList.show = true
                    this.$parent.tipList.type = 'lulu'
                    this.$parent.tipList.luluText = '周俸禄'
                    this.$parent.tipList.luluCoin = e.data.data.integral
                    this.$parent.tipList.luluCoinText = '积分'
										this.$parent.tipList.submitShow = false
									}, e => {
										this.$parent.tipList.show = true
										this.$parent.tipList.type = 'default'
										this.$parent.tipList.text = '您本周的俸禄已领完 (╯︵╰)'
										this.$parent.tipList.submitShow = false
									}, () =>{self.$parent.clearLogin()})
                }
							}
            	break
            case 'monthLulu':
							this.confirm = {
								show: true,
								title: '确定领取月俸禄',
								content: '每月只能领取一次',
								action: () => {
									let self = this
									util.GET('member/monthLulu', {}, e => {
										this.$parent.tipList.show = true
										this.$parent.tipList.type = 'lulu'
										this.$parent.tipList.luluText = '月俸禄'
										this.$parent.tipList.luluCoin = e.data.data.integral
										this.$parent.tipList.luluCoinText = '积分'
										this.$parent.tipList.submitShow = false
									}, e => {
										this.$parent.tipList.show = true
										this.$parent.tipList.type = 'default'
										this.$parent.tipList.text = '您本月的俸禄已领完 (╯︵╰)'
										this.$parent.tipList.submitShow = false
									}, () =>{self.$parent.clearLogin()})
								}
							}
            	break
            default:
							modal.toast({
								message: '尚未开发, 敬请期待!',
								duration: 0.5
							})
            	break
          }

				} else if (item.action == 'jump') {
					this.onTabTo(item.url)
        } else {
					modal.toast({
						message: '尚未开发, 敬请期待!',
						duration: 0.5
					})
        }
      },
      // 签到
      clickSignIn() {
        // util.setCache('lastSignIn', null)
        storage.getItem('lastSignIn', e => {
					if (e.result == 'success' && e.data == (new Date()).toLocaleDateString()) {
							modal.toast({
								message: '今天已签到, 请明天再进行该操作',
								duration: 1
							})
					} else {
						util.GET('member/register', {}, (rst) => {
							// 成功
							this.maskShow = true
							this.maskSignInShow = true
							this.$parent.bottomMaskShow = true
						}, (rst) => {
							modal.toast({
								message: rst.data.message,
								duration: 1
							})
						}, () => {this.$parent.clearLogin()})
						// 缓存 最后一签到日期
						util.setCache('lastSignIn', (new Date()).toLocaleDateString())
          }
        })
      },
			clickCloseMask() {
				this.maskShow = false
				this.maskSignInShow = false
				this.$parent.bottomMaskShow = false
      },
      // 等级
			clickLevel() {
    		this.onTabTo('ActivityDetails')
      },
			onTabTo(url) {
				this.$parent.onTabTo({
					data: {
						key: url
					},
					status: 'navTabTo'
				})
			},
      init() {
				if (this.$parent.userInfo) {
					this.user.username = this.$parent.userInfo.username
					this.user.level = this.$parent.userInfo.level_id
					if (!this.$parent.userInfo.head_img) {
					  this.user.head_img = _c.sUrl + '/images/userDefaultLog.jpg'
					}
				}
      },
			wxcDialogCancelBtnClicked () {
				//此处必须设置，组件为无状态组件，自己管理     取消
				this.confirm.show = false;
			},
			wxcDialogConfirmBtnClicked () {
				//此处必须设置，组件为无状态组件，自己管理     确定
				let self = this
				self.confirm.action()
				this.confirm.show = false;
			},
			isIpx() {
				return _c.isIpx()
			}
    },
		mounted() {
			this.$parent.closeLoadding()
		},
		created() {
			this.init()
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
  .user-info {
    height: 220px;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  .user-info-text {
    font-size: 24px;
  }
  .test-row {
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 750px;
  }
  .t3 {
    color: #555;
  }
  .center-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 2px;
    padding-left: 2px;
    padding-top: 10px
  }
  .w-ipx {
    bottom: 140px;
  }
  .center-list-scroller {
    position: fixed;
    top: 330px;
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
  .mask-sign-in {
    position: fixed;
    top: 0;
    bottom: 90px;
    left: 0;
    right: 0;
  }
</style>