<template>
  <div>
    <head-nav-text @tabTo="onTabTo" :navTitle="navTitle"></head-nav-text>

    <scroller :class="['main-list', isIpx() ? 'w-ipx' : '']" offset-accuracy="300" loadmoreoffset="300">
      <!--账号信息-->
      <div style="background-color: #fff;height: 100px;flex-direction: row;align-items: center;justify-content: space-between;padding-left: 50px;padding-right: 50px">
        <div style="flex-direction: row">
          <image :src="userLogo" alt="" style=";width: 40px;height: 40px;"></image>
          <text style="flex: 1;font-size: 30px;margin-left: 10px;color: #333">账号:  {{user.username}}</text>
        </div>
        <div style="flex-direction: row;">
          <image :src="integralLogo" alt="" style=";width: 40px;height: 40px;"></image>
          <text style="flex: 1;font-size: 30px;margin-left: 10px;color: #333">当前积分:  {{user.integral}}</text>
        </div>
      </div>
      <!--选择礼品进行兑换-->
      <div style="height: 80px;flex-direction: row;background-color: #eeeeee;padding-right: 20px;padding-left: 20px">
        <div style="flex: .3;align-items: flex-start;justify-content: center">
          <image :src="left_arrow" alt="" style="width: 45px;height: 45px"></image>
        </div>
        <div style="flex: 1;flex-direction: row;align-items:center;justify-content: center;">
          <image :src="giftLogo" alt="" style="height: 40px;width: 40px"></image>
          <text style="color: #b72021;margin-left: 10px;font-size: 30px;">选择礼品进行兑换</text>
        </div>
        <div style="flex: .3;align-items: flex-end;justify-content: center">
          <image :src="right_arrow" alt="" style="height: 45px;width: 45px;"></image>
        </div>
      </div>
      <!--礼品-->
      <scroller :class="['gift-list']" style="background-color: #f1f1f1">
      <!--<list :class="['gift-list']" style="background-color: #f1f1f1;">-->
        <div  v-for="gift in giftList" style="background-color: #fff;height: 120px;margin-bottom: 20px;flex-direction: row;align-items: center;justify-content: center">
            <div style="flex: 1;align-items: center;flex-direction: row;justify-content: center;">
              <text class="t-red">{{gift.money}}</text><text class="text">元现金筹码</text>
            </div>
            <div style="width: 1px;background-color: #aaa;height: 50px;"></div>
            <div style="flex: 1;flex-direction: row;justify-content: center;align-items: center">
              <text class="text">库存:  </text><text class="t-red">{{gift.inStock}}</text>
            </div>
            <div style="width: 1px;background-color: #aaa;height: 50px;"></div>
            <div style="flex: 1;justify-content: center;align-items: center;flex-direction: row">
              <text class="text" style="">所需积分: </text><text class="t-red">{{gift.integral}}</text>
            </div>
            <div @click="clickExchange(gift)" style="flex: .9;height: 120px;background-color: #ffcb2f;justify-content: center;align-items: center">
              <text style="font-size: 28px;color: #333;">确认兑换</text>
            </div>
        </div>
      <!--</list>-->
      </scroller>
    </scroller>
  </div>
</template>
<script>
	import _c from '@/Global.vue'

	import HeadNavText from '../components/headNavText.vue';
	import AnCement from '../components/announcement.vue';

	import util from '../util'

  export default {
    data() {
      return {
      	// 导航标签
      	navTitle: '签到积分兑换',
				// 左箭头
				left_arrow: _c.sUrl + '/images/left_arrow_2.png',
				// 右箭头
				right_arrow: _c.sUrl + '/images/right_arrow_2.png',
        // 礼物logo
				giftLogo: _c.sUrl + '/images/gift_s.png',
        // 账号
        user: {
      		username: 'QAQ',
          integral: '666'
        },
        // 账号logo
        userLogo: _c.sUrl + '/images/user_logo.png',
        // 积分logo
        integralLogo: _c.sUrl + '/images/integral_s.png',
        //  route
        giftList: [
        ]
      }
    },
    methods: {
			clickExchange(item) {
				if (item.integral > this.user.integral) {
					// 积分不够
          this.$parent.tipList.show = true
          this.$parent.tipList.type = 'default'
          this.$parent.tipList.text = '您当前积分不足 ' + item.integral + ' (╯︵╰)'
          this.$parent.tipList.submitShow = false
				} else if (item.inStock < 1) {
					// 库存不够
					this.$parent.tipList.show = true
					this.$parent.tipList.type = 'default'
					this.$parent.tipList.text = '库存不足 (╯︵╰)'
					this.$parent.tipList.submitShow = false
				} else {
          // 确认兑换
          this.$parent.tipList.show = true
          this.$parent.tipList.type = 'submit'
          this.$parent.tipList.submitShow = true
          this.$parent.tipList.submitText = '10元现金筹码'
          this.$parent.tipList.currentScore = this.user.integral
          this.$parent.tipList.needScore = item.integral
          this.$parent.tipList.submitAct = () => {
						let self = this
						util.GET('member/exchangePrizeApi', [{name: 'prize_id', value: item.id},], e => {
              // 领取成功
							self.$parent.tipList.show = true
							self.$parent.tipList.type = 'imageText'
							self.$parent.tipList.submitShow = false
							self.$parent.tipList.text = e.data.data.message
							// 会员信息
							self.user.username = e.data.data.username
							self.user.integral = e.data.data.score
						}, e => {
							// 错误消息
							self.$parent.tipList.show = true
							self.$parent.tipList.type = 'default'
							self.$parent.tipList.text = e.data.message + ' (╯︵╰)'
							self.$parent.tipList.submitShow = false
						}, (e) =>{self.$parent.clearLogin(e)})
          }
				}
      },
			onTabTo(url) {
				this.$parent.onTabTo({
					data: {
						key: url
					},
					status: 'navTabTo'
				})
			},
			init() {
				let self = this
				util.GET('member/prizeList', {}, e => {
					// console.log(e.data.data.userInfo['clock_in_score'])
					// 会员信息
          self.user.username = e.data.data.userInfo.username
          self.user.integral = e.data.data.userInfo['score']
          // 礼品
          e.data.data.list.forEach(el => {
          	self.giftList.push({
              money: el.title,
              inStock: el.stock,
              integral: el.need_integral,
              id: el.id
            })
          })
				}, e => {
					modal.alert({
						message: e.data.message,
						duration: 1
					}, (value) => {})
				}, (e) =>{self.$parent.clearLogin(e)})
      },
      isIpx() {
        return _c.isIpx()
      }
    },
    components: {
		  'head-nav-text': HeadNavText,
		  'announcement': AnCement,
    },
		mounted() {
			this.$parent.closeLoadding()
		},
    created() {
    	this.init()
    }
  }
</script>
<style scoped>
  .text{
    font-size: 24px;
    color: #555
  }
  .t-red{
    font-size: 24px;
    color: #a21a15
  }
  .domain {
    flex-direction: row;
    height: 280px;
  }
  .main-list {
    position: fixed;
    top: 110px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .gift-list {
    position: fixed;
    top: 290px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .w-ipx {
    bottom: 140px;
  }
</style>