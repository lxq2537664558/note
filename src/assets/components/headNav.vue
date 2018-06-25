<template>
    <!--文字导航头-->
    <div class="head-nav fdr" style="height: 110px">
        <div class="f-cent w160" v-if="isLogin" @click="contactServer">
            <!--联系客服-->
            <text class="head-text f20 pl15 pr15 pt5 pb5 bor-r20">联系客服</text>
        </div>
        <div class="f-cent w160" v-else @click="clickMsgCenter">
            <image :src="msgCenterLogo" alt="" class="w40 h40"></image>
        </div>
        <div class="f1 f-cent">
            <image :src="agentLogo" alt="" class="w350 h100"></image>
        </div>
        <div v-if="uId" class="w160 f-cent" @click="clickSetting">
            <image :src="settingLost" alt="" class="w40 h40"></image>
        </div>
        <div v-else class="w160 f-cent" @click="clickMemberBind">
            <text class="head-text f20 pl15 pr15 pt5 pb5 bor-r20" >会员绑定</text>
        </div>
    </div>
</template>

<script>
  import _c from '@/Global.vue'

  const modal = weex.requireModule('modal')
  import util from '../util'

  export default {
    props: {
      navTitle: {
        // type: string,
        default: ''
      },
      navRight: {
        // type: string,
        default: ''
      }
    },
    data() {
      return {
        uId: 0,
        // 消息记录log
        msgCenterLogo: _c.sUrl + '/images/msg_center.png',
        // logo
        agentLogo: _c.sUrl + '/images/jinsha_topNav.png',
        // 是否登录
        isLogin: false,
        // isLogin: true,
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
        console.log(123)
        this.$emit('onTabTo', 'MsgRecode')
        // this.$parent.$parent.onTabTo({
        //   data: {
        //     key: 'MsgRecode'
        //   },
        //   status: 'navTabTo'
        // })
      },
      contactServer() {
        console.log(123)
        // modal.toast({
        //   message: 'contact server',
        //   duration: 0.3
        // })
      },
      clickSetting() {

        console.log(123)
        this.$emit('onTabTo', 'clickSetting')
        // this.$parent.onTabTo('Setting')
      },
      clickMemberBind() {

        console.log(123)
        this.$emit('onTabTo', 'clickMemberBind')

        // this.$parent.$parent.formList = this.formList;
        // this.$parent.$parent.formList.show = true;

        // this.$parent.$parent.login()
      }
    },
    computed: {
      // uId() {
      //   return this.$parent.$parent.userInfo.id
      // }
    },
    mounted() {},
    created() {}
  }
</script>

<style scoped lang="sass">
    @import '@/assets/common/common.sass'

    .head-nav
        background-color: $dark_color

    .left-button
        width: 160px

    .head-text
        color: $main_color
        background-color: rgba(255, 255, 255, 0.1)

</style>
