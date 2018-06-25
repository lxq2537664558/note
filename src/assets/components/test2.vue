<template>
    <div>
        <text>test2</text>
        <router-view></router-view>
    </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
    },
    created() {
        this.$router.push('/test1')
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
