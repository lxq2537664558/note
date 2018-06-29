<template>
  <div>
    <!--账号信息-->
    <div class="bc-f h100 fdr fic fjsb pl50 pr50">
      <div class="fdr f-cent">
        <text class="iconfont username-icon">&#xe637;</text>
        <text class="username f1 f30 ml5">账号: {{user.username}}</text>
      </div>
      <div class="fdr f-cent">
        <text class="iconfont integral-icon">&#xe671;</text>
        <text class="username f1 f30 ml5">当前积分: {{user.score}}</text>
      </div>
    </div>
    <!--选择礼品进行兑换-->
    <div class="h80 fdr bc-e pr20 pl20">
      <div class="f-3 fis fjc">
        <!--<image :src="left_arrow" alt="" style="width: 45px;height: 45px"></image>-->
      </div>
      <div class="f1 fdr f-cent">
        <!--<image :src="giftLogo" alt="" style="height: 40px;width: 40px"></image>-->
        <text class="f40 iconfont prize-icon">&#xe711;</text>
        <text class="ml10 f30 prize-text">选择礼品进行兑换</text>
      </div>
      <div class="f-3 fie fjc">
        <!--<image :src="right_arrow" alt="" style="height: 45px;width: 45px;"></image>-->
      </div>
    </div>

    <div class="f1">
      <scroller class="pos-a" offset-accuracy="300" loadmoreoffset="300">
        <!--礼品-->
        <div v-for="gift in giftList" class="bc-f h120 mb20 fdr f-cent">
          <div class="f1 fdr f-cent">
            <text class="t-red">{{gift.title}}</text>
            <text class="text"> 元现金筹码</text>
          </div>
          <div class="w1 bc-a h50"></div>
          <div class="f1 fdr f-cent">
            <text class="text">库存:</text>
            <text class="t-red">{{gift.stock}}</text>
          </div>
          <div class="w1 bc-a h50"></div>
          <div class="f1 fdr f-cent">
            <text class="text">所需积分:</text>
            <text class="t-red">{{gift.need_integral}}</text>
          </div>
          <div @click="clickExchange(gift)" class="f-9 h120 bc-f f-cent confirm">
            <text class="f28 f-c-3">确认兑换</text>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
	import _c from '@/Global.vue'
	import util from '@/assets/util'

	export default {
		data() {
			return {
				giftList: []
			}
		},
		methods: {
			clickExchange(item) {
				let self = this
				if (item.score > this.user.score) {
					// 积分不够
					self.$store.dispatch('openTipList', {
						type: 'default',
						text: '您当前积分不足 ' + item.score + ' (╯︵╰)'
					})
				} else if (item.inStock < 1) {
					// 库存不够
					self.$store.dispatch('openTipList', {
						type: 'default',
						text: '库存不足 (╯︵╰)'
					})
				} else {
					// 确认兑换
					self.$store.dispatch('openTipList', {
            type: 'submit',
            submitShow: true,
            submitText: '10元现金筹码',
            currentScore: self.user.score,
            needScore: item.score,
            submitAct: () => {
							util.questApi('member/exchangePrizeApi', {prize_id: item.id}, function (ret) {
								util.dataCheck(self.$store, ret, function (data) {
									self.$store.dispatch('openTipList', {
										type: 'imageText',
										text: data.message,
									})

                  // 改变积分
                  self.$store.dispatch('setUserInfo', {
                  	score: data.score
                  })
								}, function(message) {
									self.$store.dispatch('openTipList', {
										type: 'default',
										text: message + '(╯︵╰)'
									})
								})
							})
            }
					})

				}
			},
			getPrize() {
				let self = this
				util.questApi('member/prizeList', {}, function (ret) {
					util.dataCheck(self.$store, ret, function (data) {
						// console.log(data)
						// 会员信息
						self.$store.dispatch('setUserInfo', {
							score: data.userInfo['score']
						})
            // 礼品
						self.giftList = data.list
					})
				})
			}
		},
    computed: {
      user() {
      	let num = this.$store.state.userInfoS
      	return this.$store.getters.getUserInfo
      }
    },
		mounted() {
			// this.$parent.closeLoadding()
		},
		created() {
			// 获取数据
			this.getPrize()
      // 设置头导航
			this.$store.dispatch('setHeadNav', {
				title: '签到积分兑换',
				leftButton: 'back',
				rightButton: 'text'
			})
      //
      // console.log(this.$store.state.userInfo)
		}
	}
</script>
<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .username
    color: $font_color

  .username-icon
    font-size: 50px
    height: 54px
    width: 54px
    color: #fecd2e

  .integral-icon
    font-size: 40px
    height: 44px
    width: 44px
    color: #fecd2e

  .prize-icon
    color: $main_color

  .prize-text
    color: $font2_color

  .text
    height: 28px
    font-size: 24px
    color: $font_color

  .t-red
    padding-top: 2px
    height: 24px
    font-size: 24px
    color: #a21a11

  .confirm
    background-color: $main_color

</style>