<template>
  <div>
    <!--个人资料-->
    <div class="h220">
      <div class="pos-a">
        <image :src="userInfoBlurryBackground" alt="" class="h220 w750"></image>
      </div>
      <div class="h220 fdr fic pos-r">
        <div class="w130 ml50">
          <image :src="user.head_img" alt="" class="h130 w130 bor-r65"></image>
        </div>
        <div class="f1 fjc fis ml20">
          <text class="f24 f-c-f">账号: {{user.username}}</text>
          <text @click="clickLevel" class=" user-level-text f24 mt15 pl20 pr15 pt5 pb5 bor-r20 f-c-3 w165">等级: VIP{{user.level_id}}</text>
        </div>
        <div class="f1 fdr fje mr20" @click="clickSignIn">
          <!--<image :src="signInLogo" alt="" class="w40 h40"></image>-->
          <text class="icon-text iconfont f40 f-c-f">&#xe6a8;</text>
          <text class="f-c-f f26 pt5 ml10 iconfont pr15">{{deFont('每日签到 &#xe6a7;')}}</text>
        </div>
      </div>
    </div>
    <div class="f1 pos-r">
      <scroller class="pos-a" offset-accuracy="300" loadmoreoffset="300">
        <!--列表-->
        <div class="center-list fdr fww fjsb pt10">
            <div v-for="list in centerList" @click="clickList(list)" class="w370 h120 bc-f mb5 fdr">
              <div class="f-3 fie fjc">
                <image :src="list.logo" alt="" class="w50 h50"></image>
              </div>
              <div class="f1 fjc pl20">
                <text class="activity-title f30">{{list.t1}}</text>
                <text class="activity-content f20">{{list.t2}}</text>
              </div>
            </div>
        </div>
      </scroller>
    </div>

    <!--确认按钮-->
    <dialog :title="confirm.title"
                :content="confirm.content"
                :show="confirm.show"
                @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked">
    </dialog>
  </div>
</template>
<script>
	import dialog from '@/assets/components/dialog';
	import _c from '@/Global.vue'

	import util from '@/assets/util'

	export default {
		components: {
			dialog
		},
		data() {
			return {
				user: {
					// 头像
					head_img: _c.sUrl + '/images/userDefaultLog.jpg',
					// 名称
					username: 'QAQ',
					// 等级
					level_id: 0
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
					}
				],

				testUrl: _c.sUrl + '/images/route_blurry_background.png',
				// confirm
				confirm: {
					show: false
        }
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
                  util.questApi('member/weekLulu', {}, function (ret) {
										util.dataCheck(self.$store, ret, function (data) {
                      self.$store.dispatch('openTipList', {
                        type: 'lulu',
                        luluText: '周俸禄',
											  luluCoin: data.integral,
											  luluCoinText: '积分'
                      })
										}, function(message) {
											self.$store.dispatch('openTipList', {
												type: 'default',
												text: message + '(╯︵╰)'
                      })
                    })
									})
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
									util.questApi('member/monthLulu', {}, function (ret) {
										util.dataCheck(self.$store, ret, function (data) {
											self.$store.dispatch('openTipList', {
												type: 'lulu',
												luluText: '月俸禄',
												luluCoin: data.integral,
												luluCoinText: '积分'
											})
										}, function(message) {
											self.$store.dispatch('openTipList', {
												type: 'default',
												text: message + '(╯︵╰)'
											})
										})
									})
								}
							}
							break
						default:
							util.alterTip('功能维护中...')
							break
					}
				} else if (item.action == 'jump') {
          util.toUrl(this, {path: item.url})
				} else {
					util.alterTip('功能维护中...', 0.5)
				}
			},
			// 签到
			clickSignIn() {
				// 未完成
				 this.$store.dispatch('clickSignIn')
			},
			// 等级
			clickLevel() {
				let self = this
				// 查看等级状态 				 判断数据是否在刷数据
				this.$store.dispatch('catStatus', function() {
        	// 成功
          util.toUrl(self, {path: 'ActivityDetails'})
        })
			},
			wxcDialogCancelBtnClicked() {
				this.confirm.show = false;
			},
			wxcDialogConfirmBtnClicked() {
				this.confirm.action()
				this.confirm.show = false;
			},
			deFont(text) {
				return util.decodeIconFont(text)
			},
			getMyData() {
				this.user = this.$store.getters.getUserInfo

				if (!this.user.head_img) {
					this.user.head_img = _c.sUrl + '/images/userDefaultLog.jpg'
				}
			}
		},
		mounted() {
			// this.$parent.closeLoadding()
		},
		created() {
			// 初始化数据
			this.getMyData()
		}
	}
</script>
<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .icon-text
    width: 44px
    height: 44px

  .user-level-text
    background-color: $main_color

  .center-list
    padding-right: 2px
    padding-left: 2px

  .activity-title
    font-weight: bold
    color: $font_color

  .activity-content
    color: $font_color


  .mask-black
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    background-color: #000
    opacity: .5

  .mask-sign-in
    position: fixed
    top: 0
    bottom: 90px
    left: 0
    right: 0
</style>