<template>
  <div>
    <head-nav-text @tabTo="onTabTo" :navTitle="navTitle"></head-nav-text>
    <!--消息记录列表-->
    <list :class="['main-list']">
      <cell @click="clickSetting(v.url)" v-for="v in settingList" style="background-color: #fff;height: 120px;margin-bottom: 5px;flex-direction: row;align-items: center;justify-content: center">
        <div style="flex: .4;align-items: center">
          <img :src="v.logo" alt="" style="width: 50px;height: 50px">
        </div>
        <div style="flex: 1">
          <text style="font-size: 30px;color: #555">{{v.title}}</text>
        </div>
        <div style="flex: .3;align-items: center">
          <img :src="rightArrow" alt="" style="width: 25px;height: 25px">
        </div>
      </cell>
    </list>
  </div>
</template>
<script>
	import _globalConfig from '@/Global.vue'
	const _c = _globalConfig

	import headNavText from '../components/headNavText.vue';
	export default {
		components: {
			'head-nav-text': headNavText,
		},
		data() {
			return {
				// 导航标题
        navTitle: '设置',
				// 设置列表
				settingList: [
					{
						logo:  _c.sUrl + '/images/msg_gray.png',
						title: '消息提醒设置',
						url: '1'
					},
					{
						logo:  _c.sUrl + '/images/del_gray.png',
						title: '清除系统缓存',
						url: '1'
					},
					{
						logo:  _c.sUrl + '/images/problem_gray.png',
						title: '问题求助',
						url: '1'
					},
					{
						logo:  _c.sUrl + '/images/note_gray.png',
						title: '投诉与建议',
						url: '1'
					},
					{
						logo:  _c.sUrl + '/images/on_app_gray.png',
						title: '关于APP',
						url: '1'
					},
				],

        rightArrow: _c.sUrl + '/images/right_arrow.png',
				testUrl: _c.sUrl + '/images/route_blurry_background.png'
			}
		},
		methods: {
			clickSetting(url) {
				console.log(url)
			},
			onTabTo(url) {
				this.$parent.onTabTo({
					data: {
						key: url
					},
					status: 'navTabTo'
				})
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
</style>