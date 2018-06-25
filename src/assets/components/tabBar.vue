<template>
    <div class="pos-a tab-page">
        <div class="slider-parent w750 f1" style="">
            <slot></slot>
        <!--<slider class="slider pos-a" @change="changeSlider" style="" :index="currentIndex">-->
            <!--</slider>-->
        </div>
        <div class="tab-bar fdr w750" :style="{height: (isIOS ? (isIPhoneX ? tabHeight + 78 : tabHeight + 40) : tabHeight) + 'px'}">
            <div v-for="(v, index) in tabContent" class="f1 f-cent" @click="clickTab(index)" :style="{height: tabHeight + 'px'}" style="">
                <text :class="['iconfont',  'tab-icon', (currentIndex == index) ? 'tab-text-active' : 'tab-text']">{{deFont(v.icon)}}</text>
                <text :class="['tab-title', (currentIndex == index) ? 'tab-text-active' : 'tab-text']">{{v.title}}</text>
            </div>
        </div>
    </div>
</template>

<script>
import Utils from '@/assets/util.js'

export default {
  props: {
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
    return {
      currentIndex: 0
    }
  },
  methods: {
    clickTab(index) {
      this.currentIndex = index
      this.$emit('changeTab', index)
    },
    // changeSlider(e) {
    //   this.currentIndex = e.index
    //   this.$emit('changeTab', e.index)
    // },
    deFont(text) {
      return Utils.decodeIconFont(text)
    }
  },
  mounted() {
  },
  created() {
    this.isIPhoneX = Utils.isIPhoneX()
    this.isIOS = Utils.isIOS()
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

.tab-title
    font-size: 22px

.tab-text
    color: $shallow_color

.tab-text-active
    color: $main_color

</style>
