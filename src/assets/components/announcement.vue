<template>
  <div style="height: 40px;flex-direction: row;background-color: #fff;border-bottom-color: #f1f1f1;border-bottom-width: 1px;border-bottom-style: solid;background-color: #fff">
    <div style="width:150px;flex-direction: row;justify-content: flex-end;align-items: center;">
      <image :src="newBulletinLog" alt="" style="width: 30px;height: 30px;margin-right: 5px"></image>
      <text style="font-size: 24px;font-weight: 500;color: #333;">最新公告:</text>
    </div>
    <scroller scroll-direction="horizontal" :scrollable="false" style="width: 580px;margin-left: 10px">
      <text class="announcement-text" ref="test" :style="{width: announTextWidth + 'px'}">{{bulletinText}}</text>
    </scroller>
  </div>
</template>
<script>
	import _c from '@/Global.vue'

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
      	console.log(1)
				setTimeout(() => {
					animation.transition(el, {
						styles: {
							transform: 'translateX(-102%)'
						},
						duration: 10000,
						delay: 0
					}, () => {
						console.log(2)
						animation.transition(el, {
							styles: {
								transform: 'translateX(0)'
							},
							duration: 0,
							delay: 0
						}, () => {})
					});
				}, 10000);
      },
			invalid: (obj, testEl) => {
        let self = obj
        let el = testEl
      	let time = setTimeout(function(){
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
							},
							duration: 0,
							delay: 0
						}, () => {
							// ???
            })
					});

					clearTimeout(time)
          self.invalid(self, el)
        }, 10000)
      }
    },
		mounted() {
			const testEl = this.$refs.test

			if (this.announTextWidth > 650) {
        this.invalid(this, testEl)
			}
    },
    computed: {
      announTextWidth() {
      	return this.bulletinText.length * 22 + 22
      }
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