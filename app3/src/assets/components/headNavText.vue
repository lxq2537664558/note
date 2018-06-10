<template>
  <div>
    <!--导航头-->
    <div style="height: 110px;background-color: #3d3d3d;flex-direction: row;">
      <div @click="clickReturnArrow" style="flex: 0.3;justify-content: center;align-items: center;">
        <image :src="returnArrowLog" alt="" style="width: 40px;height: 40px;"></image>
      </div>
      <div style="flex: 1;justify-content: center;align-items: center;">
        <!--<img :src="agentLogo" alt="" style="width: 350px;height: 100px">-->
        <text style="color: #eee;font-size: 30px">{{this.navTitle}}</text>
      </div>
      <div v-if="navRight" @click="clickRight(navRight.url)" style="flex: 0.3;justify-content: center;align-items: flex-start">
        <text style="color: #eee;font-size: 30px">{{navRight.title}}</text>
      </div>
      <div v-else style="flex: .3;">
      </div>
    </div>
  </div>
</template>
<script>
	import _c from '@/Global.vue'

	import util from '../util';

	export default {
		props: ['navTitle', 'navRight'],
  	data() {
  		return {
        // 返回箭头
        returnArrowLog:  _c.sUrl + '/images/return_arrow.png',
        //
        // agentLogo:  _c.sUrl + '/images/jinsha_topNav.png'
      }
    },
    methods: {
			clickReturnArrow() {
				this.$router.go(-1)
      },
			clickRight(url) {
				this.$parent.onTabTo(url)
				// this.$router.push('/' + url)
        // console.log(url)
      }
    },
		mounted() {
			setTimeout(() => {
				this.$parent.$parent.isShow = false
			}, 500)
		}
  }
</script>