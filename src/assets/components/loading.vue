<template>
  <div @click="clickTest" v-if="show" class="pos-a overlay f-cent">
    <!--加载图标-->
    <div class="bor-r20" style="width: 150px;height: 150px;background-color: rgba(0, 0, 0, 0.8);align-items: center;
    justify-content: center;">
      <image :src="logo" style="width: 75px;height: 75px"></image>
      <text v-if="text" class="loading-text">{{text}}</text>
    </div>
  </div>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			text: {
				type: String,
				default: ''
			},
			logo: {
				type: String,
				default: 'https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif'
			}
		},
		methods: {
			clickTest() {

			}
		},
		data() {
			return {}
		}
	}
</script>

<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .overlay
    background-color: rgba(0, 0, 0, 0.2)
    z-index: 501

  .loading-text
    color: #ffffff
    font-size: 24px
    line-height: 30px
    height: 30px
    margin-top: 10px
    text-overflow: ellipsis
    width: 140px
    text-align: center
</style>