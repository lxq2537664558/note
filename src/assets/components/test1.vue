<template>
    <div>
        <text>test1</text>
        <router-view></router-view>
    </div>
</template>
<script>
  import _c from '@/Global.vue'

  // const animation = weex.requireModule('animation')
  // const dom = weex.requireModule('dom')

  export default {
    // props: ['bulletinText'],
    data() {
      return {
      }
    },
    methods: {
    },
    created() {
      this.$router.push('./test2')
    }
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
