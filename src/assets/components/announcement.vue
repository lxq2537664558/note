<template>
  <div class="announcement h40 fdr">
    <div class="announcement-tip w150 fdr f-cent">
      <!--<image :src="newBulletinLog" alt="" class="w30 h30 mr5 mt5"></image>-->
      <text class="iconfont mr5 announcement-icon f30" style="width: 30px">&#xe6bc;</text>
      <text class="f-c-3 f24">最新公告:</text>
    </div>
    <scroller scroll-direction="horizontal" :scrollable="false" class="ml10 w580" >
      <text class="announcement-text h40 f22 ml10 pt3" ref="textEl" :style="{width: announTextWidth + 'px'}">{{bulletinText}}</text>
    </scroller>
  </div>
</template>
<script>
	import _c from '@/Global.vue'

	const animation = weex.requireModule('animation')
	const dom = weex.requireModule('dom')

  export default {
    data() {
    	return {
				newBulletinLog: _c.sUrl + '/images/new_bulletin.png',
				// bulletinText: '',
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
			},
      // init() {}
    },
		mounted() {
			this.textEl = this.$refs.textEl
    },
    computed: {
      announTextWidth() {
				return this.annon()
      },
			bulletinText() {
      	return this.$store.getters.getAnnouncement
      }
    },
    watch: {},
    created() {
    	// this.init();
    }
  }
</script>
<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .announcement
    border-bottom-color: #f1f1f1
    border-bottom-width: 1px
    border-bottom-style: solid
    background-color: #fff

  .announcement-tip
    justify-content: flex-end

  .announcement-icon
    color: $main_color

  .announcement-text
    color: $font_color

</style>