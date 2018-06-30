<template>
  <div class="f1 pos-a">
    <tab-bar :currentIndex="currentIndex" :tab-content="tabContent" @changeTab="onTabTo">
      <head-nav @onTabTo="onTabTo"
                :navTitle="headNav.title"
                :leftButton="headNav.leftButton"
                :rightButton="headNav.rightButton"
                :rightText="headNav.rightText"
                :rightUrl="headNav.rightUrl"
      ></head-nav>
      <div class="f1">
        <router-view class="pos-a"></router-view>
      </div>
    </tab-bar>

    <!--提交表单 第三版-->
    <form-h :formList="formList"></form-h>
    <!--提示层-->
    <tip-h :tipList="tipList"></tip-h>
    <!--<tip-h></tip-h>-->
    <!--加载图标-->
    <load  :show="loading.show":text="loading.text"></load>
  </div>
</template>

<script>
import tabBar from '@/assets/components/tabbar.vue'
import HeadNav from '@/assets/components/headNav.vue';
import formH from '@/assets/components/formH.vue'
import tipH from '@/assets/components/tipH.vue'
import load from '@/assets/components/loading.vue';

import _c from '@/Global'
import util from '@/assets/util.js';

const storage = weex.requireModule('storage')

export default {
  components: { tabBar, HeadNav, formH, tipH, load },
  name: 'App',
  data () {
    return {
      tabContent: _c.tabContent,
    }
  },
  mounted() {
  	// 加载 字体
    util.loadFonts()
  },
  methods: {
    changeTab(e) {},
    onTabTo(e) {
			// 跳转
			util.toUrl(this, e)
    },
    // 返回监听
		backListener() {
			// let that = this
			const globalEvent = weex.requireModule('globalEvent')
			globalEvent.addEventListener("androidback", (e) => {
				// 安装范返回键监控   后期处理
				// console.log(e)
				// that.$router.go(-1)
			})
		},
    // 检查登录
		checkLogin() {
			let self = this
			storage.getItem('userInfo', e => {
				if (e.result == 'success') {
					let userInfo = {}
					if (e.data) {
						userInfo = JSON.parse(e.data)
					}
					// 储存到 vuex
          self.$store.dispatch('setUserInfo', userInfo)
				} else {}
			})
    }
  },
  computed: {
  	// 表单
		formList() {
			return this.$store.getters.getSubmitForm
    },
    // 加载
		loading() {
			return this.$store.getters.getLoading
    },
    // 头部导航
    headNav() {
			return this.$store.getters.getHeadNav
    },
    // 默认页
		currentIndex() {
			return this.$store.getters.getCurrentIndex
    },
    // 用户信息
    userInfo() {
			return this.$store.getters.getUserInfo
    },
    // 提示框
		tipList() {
			return this.$store.getters.getTipList
    }
  },
  watch: {},
  created() {
		// 初始化加载首页
		// util.toUrl(this, {path: 'DiscountCenter'})
		// util.toUrl(this, {path: 'MyCenter'})
    util.toUrl(this, {path: 'Home'})

    // 判断是否有登录记录
    this.checkLogin()

		// 监听安卓返回事件
		this.backListener()

		// 清空设置登录状态
		// this.$store.dispatch('setUserInfo', {})
		// util.setCache('userInfo', null)

		// this.$store.dispatch('showLoginForm')
    // this.$store.dispatch('showLoading', '提交中..')
  }
}
</script>

<style scoped lang="sass">
@import '@/assets/common/common.sass'
</style>
