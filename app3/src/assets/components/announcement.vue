<template>
  <div style="height: 40px;flex-direction: row;background-color: #fff;border-bottom-color: #f1f1f1;border-bottom-width: 1px;border-bottom-style: solid;background-color: #fff">
    <div style="width:150px;flex-direction: row;justify-content: flex-end;align-items: center;">
      <img :src="newBulletinLog" alt="" style="width: 30px;height: 30px;margin-right: 5px">
      <text style="font-size: 24px;font-weight: 500;color: #333;">最新公告:</text>
    </div>
    <scroller scroll-direction="horizontal" style="width: 580px">
      <text class="announcement-text" ref="test" :style="{width: this.bulletinText.length * 22 + 22 + 'px'}">{{bulletinText}}</text>
    </scroller>
  </div>
</template>
<script>
	import _globalConfig from '@/Global.vue'
	const _c = _globalConfig
  // const timer = require('@weex-module/timer')

	const animation = weex.requireModule('animation')
	const dom = weex.requireModule('dom')

  export default {
		props: ['bulletinText'],
    data() {
    	return {
				newBulletinLog: _c.sUrl + '/images/new_bulletin.png',
				// newBulletinText: '不计输赢天天返回优惠无需申请, 美东时间: 2018/4/30111 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
			}
    },
    methods: {
			// 公告动画
      bulletinA(el) {
				setTimeout(() => {
					animation.transition(el, {
						styles: {
							transform: 'translateX(-102%)'
						},
						duration: 10000,
						delay: 0
					}, () => {
						animation.transition(el, {
							styles: {
								transform: 'translateX(0)'
							}
						}, () => {
							this.bulletinA(el)
						})
					});
				}, 2000);
      },
    },
		mounted() {
			const testEl = this.$refs.test

			dom.getComponentRect(testEl, (info) => {
				if (info.size.width > 650) {
					//公告溢出时滚动
					this.bulletinA(testEl)
        }
			})
    },
    created() {}
  }
</script>
<style scoped>
  .announcement-text {
    height: 40px;
    font-size: 22px;
    color: #444;
    margin-left: 10px;
    padding-top: 5px;
  }
</style>