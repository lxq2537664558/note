<template>
  <div>
    <announcement></announcement>
    <!--优惠办理中心-->
    <div class="h60 fdr bc-e">
      <div class="f1 fjc fis">
        <!--<image :src="left_arrow" alt="" style="width: 45px;height: 45px"></image>-->
      </div>
      <div class="f1 fdr f-cent">
        <!--<image :src="discountLogo" alt="" style="height: 40px;width: 40px"></image>-->
        <text class="f40 iconfont discount-icon">&#xe634;</text>
        <text class="ml10 f30 discount-text">优惠办理中心 - {{text}}</text>
      </div>
      <div class="f1 fjc fie">
        <!--<image :src="right_arrow" alt="" style="height: 45px;width: 45px;"></image>-->
      </div>
    </div>
    <div class="f1 pos-r">
      <scroller class="pos-a" offset-accuracy="300" loadmoreoffset="300">
      <!--列表-->
        <div class="fdr fww fjsb">
          <div @click="clickDiscount(discount)" v-for="(discount, k) of discountList" class="fdr w370 bc-f h120 mb5 fic discount-item">
            <div class="f-2 f-cent">
              <text class="w50 h50 bor-r25 pt5 f36 discount-number">{{k + 1}}</text>
            </div>
            <div class="f-8">
              <text class="f28 discount-item-text">{{discount.active_name}}</text>
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
	import _c from '@/Global.vue'
	import AnCement from '@/assets/components/announcement.vue';
	import util from '@/assets/util'

  export default {
    components: {
			'announcement': AnCement
		},
    data (){
    	return {
				// 公告
				// bulletinText: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
				// 左箭头
				left_arrow: _c.sUrl + '/images/left_arrow_2.png',
				// 右箭头
				right_arrow: _c.sUrl + '/images/right_arrow_2.png',
				// 优惠办理logo
				discountLogo: _c.sUrl + '/images/discount.png',
				// 优惠列表
    		discountList: [
					{
						id: 0,
						active_name: '实时返水',
						url: '1'
					},
					{
						id: 0,
						active_name: '糖果派对&连环夺宝',
						url: '1'
					},
					{
						id: 0,
						active_name: '老虎机注单, 位数1个8',
						url: '1'
					},
					{
						id: 0,
						active_name: '幸运抽抽乐',
						url: '1'
					},
					{
						id: 0,
						active_name: '九周年亿元现金回馈',
						url: '1'
					},
					{
						id: 0,
						active_name: '云闪付APP 秒到账',
						url: '1'
					},
					{
						id: 0,
						active_name: '老虎机注单, 位数1个8',
						url: '1'
					}
        ],
        // 遮罩层 显示
        maskShow: false,

    		testUrl: _c.sUrl + '/images/new_bulletin.png',
        text: ''
      }
    },
    methods: {
    	clickDiscount(discount) {
    		let self = this
				self.$store.dispatch('showForm', {
					show: true,
					title: discount.active_name,
					list: [
						{
							name: 'username',
							placeholder: '请输入您的会员账号',
							value: ''
						}
					],
					descr: '(会员绑定后只能联系客服进行修改, 请谨慎操作)',
					// submitUrl: 'member/login',
					submitAct: (data) => {
						util.questApi('member/login', data, function(ret){
							util.dataCheck(self, ret, function(data) {
								// 存进 vuex
								self.dispatch('setUserInfo', data)

								// 关闭表单
								self.dispatch('showForm', {
									show: false
								})
								// 登录提示
								util.alterTip('登录成功', 0.3)

								// 是否跳转
								let url = self.getters.jumpUrl
								if (url && Object.keys(url).length > 0) {
									// 清除跳转
									self.dispatch('setJumpUrl', {})
									util.toUrl(obj, url)
								}
							})
						})
					}
				})
    		console.log(discount)
			},
			getDiscountData() {
				let self = this
				// util.questApi('Active/activeList', {}, function (ret) {
				util.questApi('Active/makeCode', {}, function (ret) {
					util.dataCheck(self.$store, ret, function (data) {
						// self.discountList = data
						self.text = data
					})
				})
      }
    },
		mounted() {
			// this.$parent.closeLoadding()
		},
    created() {
    	// 加载活动数据
      this.getDiscountData()
    }
  }
</script>
<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .discount-icon
    color: $main_color

  .discount-text
    color: $font2_color

  .discount-item
    margin-left: 2px
    margin-right: 2px

  .discount-number
    color: $shallow_color
    text-align: center
    background-color: #fb9640

  .discount-item-text
    color: $font_color
</style>