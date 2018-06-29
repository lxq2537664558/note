<template>
  <div>
    <!--消息记录列表-->
    <list  class="pos-a">
      <cell @click="clickMsgRecode(v.url)" v-for="v in msgRecodeList" class="bc-f h150 mb5 fdr f-cent">
          <div class="f-3 f-cent">
            <image :src="v.logo" alt="" class="w60 h60"></image>
          </div>
          <div class="h100 w1 bc-7"></div>
          <div class="f1 ml20">
            <text class="f30 fw-b msg-title">{{v.t1}}</text>
            <text class="msg-desc f22 mt10">{{v.t2}}</text>
          </div>
      </cell>
    </list>
  </div>
</template>
<script>
	import _c from '@/Global.vue'
	import util from '@/assets/util.js'

	// const modal = weex.requireModule('modal')
  export default {
    components: {},
    data() {
    	return {
    		// 导航标题
				navTitle: '消息记录',
    		// 消息记录
        msgRecodeList: [
					{
						t1: '活动公告',
						t2: '★MG幸运志龙擂台赛★活动时间: 5月12-5月19啊',
						logo:  _c.sUrl + '/images/round/activity_announcement.png',
						url: '1'
					},
					{
						t1: '存款公告',
						t2: '显示未读消息',
						logo:  _c.sUrl + '/images/round/deposit_announcement.png',
						url: '1'
					},
					{
						t1: '游戏公告',
						t2: '显示未读消息',
						logo:  _c.sUrl + '/images/round/game_app_download.png',
						url: '1'
					},
					{
						t1: '在线客服',
						t2: '显示未读消息',
						logo:  _c.sUrl + '/images/round/online_service.png',
						url: '1'
					}
        ],

    		testUrl: _c.sUrl + '/images/route_blurry_background.png'
      }
    },
    methods: {
			clickMsgRecode(url) {
				util.alterTip('功能维护中', 1)
      }
    },
		mounted() {
			// this.$parent.closeLoadding()
		},
    created() {
      // 替换 headNav 头
      this.$store.dispatch('setHeadNav', {
      	title: '消息记录',
        leftButton: 'back',
        rightButton: 'text'
      })
    }
  }
</script>
<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .msg-title
    color: $font_color

  .msg-desc
    color: $font2_color
</style>