<template>
  <div>
    <!--消息记录列表-->
    <list class="pos-a">
      <cell @click="clickSetting(v.url)" v-for="v in settingList" class="bc-f h120 mb5 fdr f-cent">
        <div class="f-4 fic">
          <image :src="v.logo" alt="" class="h50 w50"></image>
        </div>
        <div class="f1">
          <text class="f30 f-c-6">{{v.title}}</text>
        </div>
        <div class="f-3 fic">
          <!--<image :src="rightArrow" alt="" style="width: 25px;height: 25px"></image>-->
          <text class="iconfont icon-text">&#xe6a7;</text>
        </div>
      </cell>
    </list>
  </div>
</template>
<script>
	import _c from '@/Global.vue'

	export default {
		components: {
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
				_c.alterTip('功能维护中', 1)
			}
		},
		mounted() {
			// this.$parent.closeLoadding()
		},
    created() {
			// 设置头导航
			this.$store.dispatch('setHeadNav', {
				title: '设置',
				leftButton: 'back',
				rightButton: 'text'
			})
    }
	}
</script>
<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .icon-text
    font-size: 34px
    color: #999
    font-weight: bold

</style>