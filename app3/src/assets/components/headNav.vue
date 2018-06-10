<template>
    <!--文字导航头-->
    <div style="height: 110px;background-color: #3d3d3d;flex-direction: row;">
      <div v-if="isLogin" @click="contactServer" style="flex: 0.3;justify-content: center;align-items: flex-end;">
        <!--联系客服-->
        <text style="font-size: 20px;color: #fecd2e;padding: 5px ;padding-left: 15px; padding-right: 15px;background-color: rgba(255, 255, 255, 0.1) ;border-radius: 20px">联系客服</text>
      </div>
      <div v-else @click="clickMsgCenter" style="flex: 0.3;justify-content: center;align-items: center;">
        <img :src="msgCenterLogo" alt="" style="width: 40px;height: 40px;">
      </div>
      <div></div>
      <div style="flex: 1;justify-content: center;align-items: center;">
        <img :src="agentLogo" alt="" style="width: 350px;height: 100px">
      </div>
      <div v-if="uId" @click="clickSetting" style="flex: 0.3;justify-content: center;align-items: center;">
        <img :src="settingLost" alt="" style="width: 40px;height: 40px;">
      </div>
      <div v-else @click="clickMemberBind" style="flex: 0.3;justify-content: center;align-items: center">
        <text style="background-color: rgba(255, 255, 255, .1);font-size: 20px;color: #fecd2e;padding-top: 5px;padding-bottom: 5px;padding-left: 15px;padding-right: 15px;border-radius: 20px">会员绑定</text>
      </div>

    </div>
</template>
<script>
	import _globalConfig from '@/Global.vue'
	const _c = _globalConfig

	const modal = weex.requireModule('modal')
	import util from '../util'

	export default {
		props: ['navTitle', 'navRight'],
  	data() {
  		return {
  			// 消息记录log
        msgCenterLogo:  _c.sUrl + '/images/msg_center.png',
        // logo
        agentLogo:  _c.sUrl + '/images/jinsha_topNav.png',
        // 是否登录
        isLogin: false,
        // 设置按钮
        settingLost: _c.sUrl + '/images/nav_setting.png',

        // 登录表单
				formList: {
					// show: false,
					show: true,
          title: '请登录会员账号',
          list: [
						{
							name: 'username',
							placeholder: '请输入您的会员账号',
              value: ''
						},
						{
							name: 'password',
							placeholder: '请输入您的密码',
              value: ''
						}
          ],
          submitUrl: 'member/login',
          submitAct: (rst) => {
            this.$parent.$parent.userInfo = rst.data

						util.setCache('userInfo', JSON.stringify(rst.data))

						modal.toast({
							message: '登录成功',
							duration: 0.3
						}, function (value) {
						})

          }
        },
      }
    },
    methods: {
  		clickMsgCenter() {
				this.$parent.$parent.onTabTo({
					data: {
						key: 'MsgRecode'
					},
					status: 'navTabTo'
				})
      },
			contactServer() {
				modal.toast({
					message: 'contact server',
					duration: 0.3
				})
      },
			clickSetting() {
        this.$parent.onTabTo('Setting')
      },
      clickMemberBind() {
        // this.$parent.$parent.formList = this.formList;
        // this.$parent.$parent.formList.show = true;
        this.$parent.$parent.login()
      }
    },
    computed: {
			uId() {
        return this.$parent.$parent.userInfo.id
      }
    },
    mounted() {
    },
    created() {
			// console.log(util.clearLogin)
    }
  }
</script>