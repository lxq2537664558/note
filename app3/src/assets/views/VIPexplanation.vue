<template>
  <div>
    <head-nav-text @tabTo="onTabTo" :navTitle="navTitle" ></head-nav-text>

    <scroller :class="['main-list']" offset-accuracy="300" loadmoreoffset="300" style="background-color: white">
      <!--VIP升级说明    -->
      <div style="background-color: #eee;height: 60px;justify-content: center;align-items: center">
        <text style="color: #a92427;font-size: 30px">◆ VIP升级说明 ◆</text>
      </div>
      <!--等级列表-->
      <div style="background-color: #fff;padding-bottom: 20px;padding-left: 20px;padding-right: 20px;padding-top: 20px;">
        <div style="flex: 1;border-color: #ccc;border-style: solid;border-width: 1px;border-radius: 20px;flex-direction: column">
          <div v-for="(level, key) of VIPLevel" :class="[(key != VIPLevel.length - 1 ? 'bottom' : '')]" style="height: 100px;flex-direction: row;justify-content: center">
            <div style="flex: 1;justify-content: center;align-items: center;">
              <text style="color: #555;">{{level.title}}</text>
            </div>
            <div style="width: 1px;background-color: #ccc"></div>
            <div style="flex: 1;justify-content: center;align-items: center;">
              <text style="color: #555">{{level.gold_max}}</text>
            </div>
            <div style="width: 1px;background-color: #ccc"></div>
            <div style="flex: 1;justify-content: center;align-items: center;">
              <text style="color: #555;">1{{level.lottery}}</text>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 10px;background-color: #ededed"></div>
      <!--活动介绍-->
      <div style="height: 70px;justify-content: center;align-items: center;margin-bottom: 10px">
        <text style="color: #b72021;font-size: 30px;">◆ 活动介绍 ◆</text>
      </div>
      <div style="padding-right: 20px;padding-left: 20px;border-radius: 10px;margin-left: 15px;margin-right: 15px;padding-top: 30px;padding-bottom: 30px;border-width: 1px;border-style: solid;border-color: #ccc">
        <div v-for="(v, key) of activityList" style="flex-direction: row;margin-bottom: 5px">
          <text style="width: 40px;font-size: 26px;color: #666;align-items: flex-end;padding-top: 3px">{{key + 1}}. </text>
          <text style="flex: 1;font-size: 26px;flex-wrap: wrap;color: #666">{{v.title}}</text>
        </div>
      </div>
      <!--<scroller style="height: 710px;background-color: #f1f1f1"></scroller>-->
    </scroller>
  </div>
</template>
<script>
	import _globalConfig from '@/Global.vue'
	const _c = _globalConfig

	import HeadNavText from '../components/headNavText.vue';
	import util from '../util'

  export default {
    data() {
      return {
      	// 导航标签
      	navTitle: 'VIP说明',
        // VIP 列表
        VIPLevel: [
					{
						'title': '等级',
						'gold_max': '有效投注',
						'lottery': '晋级积分'
					},
					{
						'title': 'VIP0',
						'gold_max': '0.00',
						'lottery': '0.0'
					},
					{
						'title': 'VIP1',
						'gold_max': '1000.00',
						'lottery': '18.0'
					},
					{
						'title': 'VIP1',
						'gold_max': '1000.00',
						'lottery': '18.0'
					},
					{
						'title': 'VIP1',
						'gold_max': '1000.00',
						'lottery': '18.0'
					},
					{
						'title': 'VIP1',
						'gold_max': '1000.00',
						'lottery': '18.0'
					},
					{
						'title': 'VIP1',
						'gold_max': '1000.00',
						'lottery': '18.0'
					},
        ],
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
        ]
      }
    },
    computed: {
    	upgradeIntegral() {
    		return this.user.nextLevelIntegral - this.user.integral
      },
      levelProgress() {
				// 等级进度条  right 385  = 0     right 0 = 100
				return 385 - Math.floor((this.user.nextLevelIntegral - this.user.integral) / this.user.nextLevelIntegral * 385)
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
      init() {
				let self = this
				util.GET('member/level', {}, e => {
					console.log(e)
					let list = []
          e.data.data.forEach((el) => {
          	el.title = 'VIP' + el.level_name
            el.lottery = el.rank_gold
						list.push(el)
            console.log(el)
          })

					list.unshift({
						'title': '等级',
						'gold_max': '有效投注',
						'lottery': '晋级积分'
          })

					self.VIPLevel = list
				}, e => {
					console.log(e)
				}, () =>{this.$parent.clearLogin()})
      }
		},
    components: {
		  'head-nav-text': HeadNavText,
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
    margin-left: 20px;
    background-color: #fecc1c;
    padding-left: 40px;
    font-size: 24px;
    padding-right: 10px;
    border-radius: 7px;
    color: #b72021;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: #999;
    border-right-color: #999;
    border-right-style: solid;
    border-right-width: 1px;
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
  .bottom {
    border-bottom-color: #ccc;
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }
</style>
