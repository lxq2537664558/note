<template>
    <tab-bar :tab-content="tabContent" @changeTab="changeTab">
            <head-nav @onTabTo="onTabTo"></head-nav>
        <router-view></router-view>
    </tab-bar>
</template>

<script>
import tabBar from '@/assets/components/tabbar.vue'
import HeadNav from '@/assets/components/headNav.vue';
import _c from '@/config.js'

export default {
  components: { tabBar, HeadNav },
  name: 'App',
  data () {
    return {
      tabContent: _c.tabContent,
      userInfo: {
        id: 0
      }
    }
  },
  mounted() {
    this.loadFonts()
  },
  methods: {
    loadFonts() {
      let domModule = weex.requireModule('dom');
      domModule.addRule('fontFace', {
        'fontFamily': "iconfont",
        'src': "url('http://at.alicdn.com/t/font_716301_bgu2sk8o83s.ttf')"
      })
    },
    changeTab(e) {
      console.log('e', e);
    },
    urlTo(url) {
      this.$router.push({path: url})
    },
    onTabTo(e) {
      console.log(e)
    }
  },
  created() {
    console.log(this.$store.default.state.aaa)
    this.urlTo('/Home')
    // 初始化加载首页
  }
}
</script>

<style scoped lang="sass">
@import '@/assets/common/common.sass'


</style>
