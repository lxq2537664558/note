<template>
  <div>
    <head-nav-text @tabTo="onTabTo" :navTitle="navTitle" :navRight="{title: 'VIP说明', url: 'VIPexplanation'}"></head-nav-text>

    <scroller :class="['main-list']" offset-accuracy="300" loadmoreoffset="300" style="background-color: white">
      <!--账号信息-->
      <div style="background-color: #fff;height: 100px;flex-direction: row;justify-content: space-between;padding-left: 50px;padding-right: 50px">
        <div style="justify-content: center;">
          <div style="">
            <text class="star-text">VIP {{user.currentLevel}}</text>
          </div>
          <image :src="starLogo" alt="" style="height: 45px;width: 45px;position: absolute;top: 25px;left: 0;right: 0;bottom: 0;"></image>
        </div>
        <div style="width: 385px;flex-direction: column;justify-content: center">
          <div style="background-color: #eee;;justify-content: center;align-items: center;position: relative;border-radius: 10px">
            <div class="star-progress" :style="{right: levelProgress + 'px'}"></div>
            <text style="font-size: 24px;flex: 1;">{{user.currentScore}}/{{user.preScore}}</text>
          </div>
          <div style="align-items: center">
            <text v-if="user.isUpdate && user.preLevel" @click="clickUpdate" style="font-size: 24px;color: #b72021;padding-top: 10px">(点击升级  VIP{{user.preLevel}})</text>
            <text v-else style="font-size: 24px;color: #b72021;padding-top: 10px">{{user.preLevel ? '(再投注 ' + upgradeIntegral + '  普升 VIP' + user.preLevel + ')' : '(已是最高等级 ヾ(◍°∇°◍)ﾉﾞ)'}}</text>
          </div>
        </div>
      </div>
      <!--选择礼品进行兑换-->
      <div style="height: 70px;flex-direction: row;background-color: #eeeeee;padding-right: 20px;padding-left: 20px">
        <div style="flex: .3;align-items: flex-start;justify-content: center">
          <image :src="left_arrow" alt="" style="width: 45px;height: 45px"></image>
        </div>
        <div style="flex: 1;flex-direction: row;justify-content: center;flex-direction: row">
          <div style="justify-content: center;">
            <div style="">
              <text class="star-text">VIP {{user.preLevel || user.currentLevel}}</text>
            </div>
            <image :src="starLogo" alt="" style="height: 45px;width: 45px;position: absolute;top: 10px;left: 0;right: 0;bottom: 0;"></image>
          </div>
          <div style="margin-left: 10px;justify-content: center">
            <text style="color: #b72021;font-size: 30px;">{{user.preLevel ? '等级奖励' : '已是最高等级'}}</text>
          </div>
        </div>
        <div style="flex: .3;align-items: flex-end;justify-content: center">
          <image :src="right_arrow" alt="" style="height: 45px;width: 45px;"></image>
        </div>
      </div>
      <!--奖品-->
      <div style="height: 80px;flex-direction: row;justify-content: center;align-items: center">
        <text style="color: #b72021;font-size: 30px;margin-right: 40px">奖励</text>
        <imageg :src="moneyLog" alt="" style="height: 45px;width: 45px;"></imageg>
        <text style="margin-left: 10px;margin-right: 30px;font-size: 30px;color: #333">{{user.reward}}</text>
      </div>
      <div style="height: 15px;background-color: #ededed"></div>
      <!--活动介绍-->
      <div style="height: 70px;justify-content: center;align-items: center;margin-bottom: 10px">
        <text style="color: #b72021;font-size: 30px;">活动介绍</text>
      </div>
      <div style="padding-right: 20px;padding-left: 20px;border-radius: 10px;margin-left: 15px;margin-right: 15px;padding-top: 30px;padding-bottom: 30px;border-width: 1px;border-style: solid;border-color: #ccc">
        <div v-for="(v, key) of activityList" style="flex-direction: row;margin-bottom: 5px">
          <text style="width: 40px;font-size: 26px;color: #666;align-items: flex-end;padding-top: 3px">{{key + 1}}. </text>
          <text style="flex: 1;font-size: 26px;flex-wrap: wrap;color: #666">{{v.title}}</text>
        </div>
      </div>
      <!--<scroller style="height: 710px;background-color: #f1f1f1"></scroller>-->
    </scroller>
    <!--确认框-->
    <wxc-dialog title="确认升级吗?"
                content="升级为不可逆操作"
                :show="confirmShow"
                :single="false"
                @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked">
    </wxc-dialog>
  </div>
</template>
<script>
	import { WxcDialog } from 'weex-ui';
	import _globalConfig from '@/Global.vue'
	const _c = _globalConfig

	import HeadNavText from '../components/headNavText.vue';
	import util from '../util'

	const modal = weex.requireModule('modal');

  export default {
    data() {
      return {
      	// 导航标签
      	navTitle: '活动详情',
        // 小星星
				starLogo: _c.sUrl + '/images/star.png',
				// 账号
				user: {
					currentLevel: 0,
					preLevel: 1,
					currentScore: 686,
          preScore: 1000,
					reward: '50彩金',
					// 当前账号能否升级
					isUpdate: false,
				},
				// 左箭头
				left_arrow: _c.sUrl + '/images/left_arrow_2.png',
				// 右箭头
				right_arrow: _c.sUrl + '/images/right_arrow_2.png',
        // 钱logo
        moneyLog : _c.sUrl + '/images/money.png',

        // 账号logo
        userLogo: _c.sUrl + '/images/user_logo.png',
        // 积分logo
        integralLogo: _c.sUrl + '/images/integral_s.png',
        //  活动介绍
        activityList: [
					{
						title: '用户每一笔有效投注都将会永久累计, 累计达到标准, 即可直接普升VIP等级.'
					},
					{
						title: 'VIP等级提升, 系统会自动计算及派发彩金奖励, 等级越高, 派发的彩金奖励越高.'
					},
					{
						title: '无风险投注及电子桌面游戏不计入VIP活动中 (例如: 同时投注庄闲、黑红、大小、单双、投注直注不可超过总数3分之2, 不可同时下注3打、3列等'
					},
					{
						title: '公司保留对活动的最终解释权, 以及在无通知的情况下修改、终止活动的权利, 适用于所有优惠.'
					},
        ],
        // confirm  确认框
        confirmShow: false
      }
    },
    computed: {
    	upgradeIntegral() {
    		return this.user.preScore - this.user.currentScore
      },
      levelProgress() {
				// 等级进度条  right 385  = 0     right 0 = 100
				if (this.user.preScore < this.user.currentScore) {
					this.user.isUpdate = true
					return 0
				}

				return 385 - Math.floor((this.user.preScore - this.user.currentScore) / this.user.preScore * 385)
      }
    },
    methods: {
			onTabTo(url) {
				this.$parent.onTabTo({
					data: {
						key: url
					},
					status: 'navTabTo'
				})
			},
      // 初始化数据
      init() {
        let self = this
				util.GET('member/memberLevel', {}, e => {
					self.changeScore(e.data.data)
        }, e => {
					modal.alert({
						message: e.data.message,
						duration: 1
					}, (value) => {})
        }, () =>{this.$parent.clearLogin()})
      },
			clickUpdate() {
				this.confirmShow = true
			},
      changeScore(data) {
				this.user = data
				this.user.reward = data.rankScore ? data.rankScore + '积分' : '已是最高分(敬请期待)'
			},
			wxcDialogCancelBtnClicked () {
				//此处必须设置，组件为无状态组件，自己管理     取消
				this.confirmShow = false;
			},
			wxcDialogConfirmBtnClicked () {
				//此处必须设置，组件为无状态组件，自己管理     确定
				let self = this
				util.GET('member/upgrade', {}, e => {
					self.changeScore(e.data.data)
				}, e => {
					modal.alert({
						message: e.data.message,
						duration: 1
					}, (value) => {})
				}, () =>{self.$parent.clearLogin()})

				this.confirmShow = false;
			}
		},
    components: {
		  'head-nav-text': HeadNavText,
			WxcDialog
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
    top: 280px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .star-text {
    background-color: #fecc1c;
    color: #b72021;
    font-size: 24px;
    margin-left: 25px;
    padding-left: 25px;
    padding-right: 10px;
    border-radius: 5px
  }
  .star-progress {
    background-color: #fcec35;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-radius: 10px
  }
</style>