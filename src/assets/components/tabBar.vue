<template>
    <div class="pos-a tab-page">
        <div class="slider-parent w750 f1" style="">
            <slot></slot>
        <!--<slider class="slider pos-a" @change="changeSlider" style="" :index="currentIndex">-->
            <!--</slider>-->
        </div>
        <div class="tab-bar fdr w750" :style="{height: (isIOS ? (isIPhoneX ? tabHeight + 78 : tabHeight + 40) : tabHeight) + 'px'}">
            <div v-for="(v, index) in tabContent" class="f1 fic" style="" @click="clickTab(v, index)" :style="{height: tabHeight + 'px'}">
                <text style="margin-top: 20px" :class="['iconfont',  'tab-icon', currentIndex == index ? 'tab-text-active' : 'tab-text']">{{deFont(v.icon)}}</text>
                <text :class="['tab-title', currentIndex == index ? 'tab-text-active' : 'tab-text']">{{v.title}}</text>
            </div>
        </div>
    </div>
</template>

<script>
import util from '@/assets/util.js';

export default {
  props: {
  	currentIndex: {
  		type: Number,
      default: 0
    },
    tabHeight: {
      type: Number,
      default: 120
    },
    tabContent: {
      type: Array,
      default: () => ([])
    }
  },
  data(){
    return {}
  },
  methods: {
    clickTab(v, index) {
			if (this.currentIndex != index) {
				// this.currentIndex = index
        v.index = index

        // this.$router.push('/' + v.path)
				util.toUrl(this, v)
				// this.$emit('changeTab', v)
			}
    },
    // changeSlider(e) {
    //   this.currentIndex = e.index
    //   this.$emit('changeTab', e.index)
    // },
    deFont(text) {
      return util.decodeIconFont(text)
    }
  },
  mounted() {},
  created() {
    this.isIPhoneX = util.isIPhoneX()
    this.isIOS = util.isIOS()
  }
}
</script>

<style scoped lang="sass">
@import '@/assets/common/common.sass'

.tab-page
  background-color: $default_background_color

.slider-parent

.slider

.tab-bar
  background-color: $dark_color

.tab-icon
  font-size: 48px
  width: 52px
  height: 52px

.tab-title
  font-size: 22px
  /*padding-top: 5px*/

.tab-text
  color: $shallow_color

.tab-text-active
  color: $main_color

</style>
