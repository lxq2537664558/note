<template>
  <div>
    <head-nav-text @tabTo="onTabTo" :navTitle="navTitle"></head-nav-text>
    <!--消息记录列表-->
    <list :class="['main-list', isIpx() ? 'w-ipx' : '']">
      <cell @click="clickMsgRecode(v.url)" v-for="v in msgRecodeList" style="background-color: #fff;height: 150px;margin-bottom: 5px;flex-direction: row;align-items: center;justify-content: center">
          <div style="flex: .3;justify-content: center;align-items: center">
            <imageg :src="v.logo" alt="" style="width: 60px;height: 60px;"></imageg>
          </div>
          <div style="height: 100px;width: 1px;background-color: #717171;"></div>
          <div style="flex: 1;margin-left: 20px">
            <text style="font-size: 30px;font-weight: bold;color: #555">{{v.t1}}</text>
            <text style="font-size: 22px;color: #fd0b09;margin-top:10px">{{v.t2}}</text>
          </div>
      </cell>
    </list>
  </div>
</template>
<script>
	import _c from '@/Global.vue'

	import headNavText from '../components/headNavText.vue';
  export default {
    components: {
      'head-nav-text': headNavText,
    },
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
    		console.log(url)
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
    align-items: center
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
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 20px
  }
  .center-list-scroller {
    position: fixed;
    top: 330px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .w-ipx {
    bottom: 140px;
  }
</style>