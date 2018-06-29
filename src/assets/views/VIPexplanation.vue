<template>
  <div>
    <!--<head-nav-text @tabTo="onTabTo" :navTitle="navTitle" ></head-nav-text>-->

    <scroller class="pos-a bc-f pb20" offset-accuracy="300" loadmoreoffset="300">
      <!--VIP升级说明    -->
      <!--<div style="background-color: #eee;height: 60px;justify-content: center;align-items: center">-->
        <!--<text style="color: #a92427;font-size: 30px">◆ VIP升级说明 ◆</text>-->
      <!--</div>-->
      <!--等级列表-->
      <div class="bc-f pb20 pl20 pr20 pt20">
        <div class="f1 bor-1 bor-r20 fdc">
          <div v-for="(level, key) of VIPLevel" :class="[(key != VIPLevel.length - 1 ? 'bottom' : '')]" class="h100 fdr fjc">
            <div class="f1 f-cent">
              <text class="font-color">{{level.level_name}}</text>
            </div>
            <div class="w1 bc-c"></div>
            <div class="f1 f-cent">
              <text class="font-color">{{level.gold_min}}</text>
            </div>
            <div class="w1 bc-c"></div>
            <div class="f1 f-cent">
              <text class="font-color">{{level.rank_integral}}</text>
            </div>
          </div>
        </div>
      </div>
      <div class="h10 bc-e"></div>
      <!--活动介绍-->
      <div class="h70 f-cent mb10">
        <text class="font-color-2 f30">◆ 活动介绍 ◆</text>
      </div>
      <div class="pr20 pl20 bor-r10 ml15 mr15 pt30 pb30 bor-1">
        <div v-for="(v, key) of activityList" class="fdr mb5">
          <text class="w40 f26 font-color fie pt3">{{key + 1}}. </text>
          <text class="f1 f26 fww font-color" >{{v.title}}</text>
        </div>
      </div>
      <!--<scroller style="height: 710px;background-color: #f1f1f1"></scroller>-->
    </scroller>
  </div>
</template>
<script>
	import util from '@/assets/util'

  export default {
    data() {
      return {
        // VIP 列表
        VIPLevel: [
					{
						'level_name': '等级',
						'gold_min': '有效投注',
						'rank_integral': '晋级积分'
					},
					{
						'level_name': '0',
						'gold_min': '10000',
						'rank_integral': '60'
					},
					{
						'level_name': '1',
						'gold_min': '10000',
						'rank_integral': '60'
					},
					{
						'level_name': '2',
						'gold_min': '100000',
						'rank_integral': '180'
					},
					{
						'level_name': '3',
						'gold_min': '300000',
						'rank_integral': '300'
					},
					{
						'level_name': '4',
						'gold_min': '500000',
						'rank_integral': '600'
					},
					{
						'level_name': '5',
						'gold_min': '1000000',
						'rank_integral': '900'
					},
					{
						'level_name': '6',
						'gold_min': '3000000',
						'rank_integral': '1200'
					},
					{
						'level_name': '7',
						'gold_min': '5000000',
						'rank_integral': '1800'
					},
					{
						'level_name': '8',
						'gold_min': '8000000',
						'rank_integral': '3000'
					},
					{
						'level_name': '9',
						'gold_min': '10000000',
						'rank_integral': '4800'
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
    computed: {},
    methods: {
			getVipLevel() {
				let self = this
				util.questApi('member/level', {}, function (ret) {
					util.dataCheck(self.$store, ret, function (data) {
						self.VIPLevel = data
						self.VIPLevel.unshift({
							'level_name': '等级',
							'gold_min': '有效投注',
							'rank_integral': '晋级积分'
						})
					})
				})
      }
		},
    components: {},
		mounted() {
			// this.$parent.closeLoadding()
		},
    created() {
    	// 获取vip等级
			this.getVipLevel()
			// 设置头导航
			this.$store.dispatch('setHeadNav', {
				title: 'VIP说明',
				leftButton: 'back',
				rightButton: 'text'
			})
    }
  }
</script>
<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .font-color
    color: $font_color

  .font-color-2
    color: $font2_color

  .bottom
    border-bottom-color: #ccc
    border-bottom-style: solid
    border-bottom-width: 1px

</style>
