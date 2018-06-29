<template>
  <!--文字导航头-->
  <div class="head-nav fdr" :style="{ height: navHeight + 'px' }">
    <div class="f-cent w160" >
      <text v-if="leftButton == 'contactServer'" class="head-text f20 pl15 pr15 pt5 pb5 bor-r20" @click="contactServer">联系客服</text>
      <text v-if="leftButton == 'msgCenter'" class="iconfont font-icon"  @click="clickMsgCenter">&#xe69b;</text>
      <text v-if="leftButton == 'back'" class="f50 iconfont back-icon" @click="clickReturnArrow">&#xe697;</text>
    </div>
    <div class="f1 f-cent">
      <text v-if="navTitle" class="navTitle f30">{{navTitle}}</text>
      <image v-else :src="agentLogo" alt="" class="w350 h100"></image>
    </div>
    <div v-if="rightButton == 'default'" class="f-cent w160">
      <text v-if="userInfo" class="iconfont font-icon"  @click="clickSetting">&#xe6ae;</text>
      <text v-else class="head-text f20 pl15 pr15 pt5 pb5 bor-r20" @click="clickMemberBind">会员绑定</text>
    </div>
    <div v-if="rightButton == 'text'" class="f-cent w160">
      <text v-if="rightText" class="right-text f30" @click="toUrl(rightUrl)">{{rightText}}</text>
    </div>
  </div>
</template>

<script>
	import _c from '@/Global.vue'

	// const modal = weex.requireModule('modal')
	import util from '@/assets/util.js'

	export default {
		props: {
			navTitle: {
				type: String,
				default: ''
			},
			leftButton: {
				type: [String, Boolean],
				default: 'msgCenter'
			},
			rightButton: {
				type: [String, Boolean],
				default: 'default'
			},
			rightText: {
				type: String,
				default: ''
			},
			rightUrl: {
				type: String,
				default: ''
			},
      navHeight: {
				type: Number,
        default: 110
      }
		},
		data() {
			return {
				// logo
				agentLogo: _c.sUrl + '/images/jinsha_topNav.png',
				// 设置按钮
				settingLost: _c.sUrl + '/images/nav_setting.png',
				// 返回箭头
				returnArrowLog:  _c.sUrl + '/images/return_arrow.png',

				// 是否登录
				isLogin: false,
			}
		},
		methods: {
			toUrl(url) {
				this.$emit('onTabTo', {path: url})
      },
			clickMsgCenter() {
				this.$emit('onTabTo', {path: 'MsgRecode'})
			},
			contactServer() {
				// modal.toast({
				//   message: 'contact server',
				//   duration: 0.3
				// })
			},
			clickSetting() {
				this.$emit('onTabTo', {path: 'Setting'})
			},
			clickMemberBind() {
				// 绑定账号
				this.$store.dispatch('showLoginForm', this)
			},
			clickReturnArrow() {
				util.urlToGo(this)
			}
		},
		computed: {
			userInfo() {
				let change = this.$store.state.userInfoS
				return this.$store.getters.getUserInfo.username
      }
		}
	}
</script>

<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .head-nav
    background-color: $dark_color

  .navTitle
    color: $shallow_color

  .head-text
    color: $main_color
    background-color: rgba(255, 255, 255, 0.1)

  .left-icon
    color: $main_color

  .back-icon
    color: $shallow_color

  .right-text
    color: $shallow_color

  .font-icon
    color: $main_color
    width: 80px
    height: 80px
    font-size: 40px
    text-align: center
    padding-top: 20px
</style>
