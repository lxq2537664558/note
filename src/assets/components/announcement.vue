<template>
  <div style="height: 40px;flex-direction: row;background-color: #fff;border-bottom-color: #f1f1f1;border-bottom-width: 1px;border-bottom-style: solid;background-color: #fff">
    <div style="width:150px;flex-direction: row;justify-content: flex-end;align-items: center;">
      <image :src="newBulletinLog" alt="" style="width: 30px;height: 30px;margin-right: 5px"></image>
      <text style="font-size: 24px;font-weight: 500;color: #333;">最新公告:</text>
    </div>
    <scroller scroll-direction="horizontal" :scrollable="false" style="width: 580px;margin-left: 10px">
      <text class="announcement-text" ref="textEl" :style="{width: announTextWidth + 'px'}">{{bulletinText}}</text>
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
				// bulletinText: '不计输赢天天返回优惠无需申请, 美东时间: 2018/4/30111 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        textEl: null
			}
    },
    methods: {
			// 公告动画
      bulletinA(elText) {
        let self = this
        let el = elText
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
              },
              duration: 0,
              delay: 0
            }, () => {})
          });
          setTimeout(() => {
            self.bulletinA(el)
          }, 10000)
        }, 2000);
			},
      annon() {
      	let width = this.bulletinText.length * 22 + 22
				if (width > 650) {
					let el = this.textEl
					if (el) {
						this.bulletinA(el)
					}
				}
				return width
			}
    },
		mounted() {
			this.textEl = this.$refs.textEl
    },
    computed: {
      announTextWidth() {
				return this.annon()
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