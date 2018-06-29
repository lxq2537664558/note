<template>
  <div>
    <!--<head-nav-text @tabTo="onTabTo" :navTitle="navTitle" :navRight="{title: 'VIP说明', url: 'VIPexplanation'}"></head-nav-text>-->
    <!--账号信息-->
    <div class="bc-f h100 fdr fjsb pl50 pr50">
      <div class="fjc">
        <div><text class="star-text">VIP {{user.currentLevel}}</text></div>
        <image :src="starLogo" alt="" class="star-img" style="top: 25px;"></image>
      </div>
      <div class="w385 fdc fjc">
        <div class="bc-e f-cent pos-r bor-r10">
          <div class="star-progress" :style="{right: levelProgress + 'px'}"></div>
          <text class="f24 f1">{{user.currentScore}}/{{user.preScore}}</text>
        </div>
        <div class="fic">
          <text v-if="user.isUpdate && user.preLevel" @click="clickUpdate" class="f24 pt10 font-color-2">(点击升级 VIP{{user.preLevel}})</text>
          <text v-else class="f24 pt10 font-color-2">{{user.preLevel ? '(再投注 ' + upgradeIntegral + ' 普升 VIP' +
            user.preLevel + ')' : '(已是最高等级 ヾ(◍°∇°◍)ﾉﾞ)'}}</text>
        </div>
      </div>
    </div>
    <!--选择礼品进行兑换-->
    <div class="h70 fdr bc-e pr20 pl20">
      <div class="f-3 fis fjc">
        <!--<image :src="left_arrow" alt="" class="star-img"></image>-->
      </div>
      <div class="f1 fdr fjc">
        <div class="fjc">
          <div><text class="star-text">VIP {{user.preLevel || user.currentLevel}}</text></div>
          <image :src="starLogo" alt="" class="star-img" style="top: 10px"></image>
        </div>
        <div class="ml10 fjc">
          <text class="font-color-2 f30">{{user.preLevel ? '等级奖励' : '已是最高等级'}}</text>
        </div>
      </div>
      <div class="f-3 fie fjc">
        <!--<image :src="right_arrow" alt="" style="height: 45px;width: 45px;"></image>-->
      </div>
    </div>
    <!--奖品-->
    <div class="h80 fdr f-cent bc-f">
      <text class="font-color-2 f30 mr40">奖励</text>
      <!--<image :src="moneyLog" alt="" style="height: 45px;width: 45px;"></image>-->
      <text class="iconfont detail-icon">&#xe629;</text>
      <text class="ml10 mr30 f30 f-c-3">{{user.reward}}</text>
    </div>
    <div class="bc-e h15"></div>

    <div class="f1 bc-f">
      <scroller class="pos-a" offset-accuracy="300" loadmoreoffset="300">
        <!--活动介绍-->
        <div class="h70 f-cent mb10">
          <text class="font-color-2 f30">活动介绍</text>
        </div>
        <div class=" bor-r10 ml15 mr15 pr20 pl20 pt30 pb30 bor-1">
          <div v-for="(v, key) of activityList" class="fdr mb5">
            <text class="w40 f26 fie pre-level">{{key + 1}}.
            </text>
            <text style="flex: 1;font-size: 26px;flex-wrap: wrap;color: #666">{{v.title}}</text>
          </div>
        </div>
        <!--<scroller style="height: 710px;background-color: #f1f1f1"></scroller>-->
      </scroller>
    </div>
    <!--确认框-->
    <dialog title="确认升级吗?"
                content="升级为不可逆操作"
                :show="confirmShow"
                :single="false"
                @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked">
    </dialog>
  </div>
</template>

<script>
	import dialog from '@/assets/components/dialog';
	import _c from '@/Global.vue'

	import util from '@/assets/util'


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
					currentScore: 0,
					preScore: 10000,
					reward: '60积分',
					// 当前账号能否升级
					isUpdate: false,
				},
				// 钱logo
				moneyLog: _c.sUrl + '/images/money.png',

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
				if (this.user.currentScore == 0) {
					return 385
				}
				if (this.user.preScore < this.user.currentScore) {
					this.user.isUpdate = true
					return 0
				}

				return 385 - (this.user.currentScore / this.user.preScore) * 385
			}
		},
		methods: {
      // 点击升级
			clickUpdate() {
				this.confirmShow = true
			},
      // 取消按钮
			wxcDialogCancelBtnClicked() {
				this.confirmShow = false;
			},
      // 确认升级
			wxcDialogConfirmBtnClicked() {
				let self = this

				util.questApi('member/upgrade', {}, function (ret) {
					util.dataCheck(self.$store, ret, function (data) {
						self.changeScore(data)
					})
				})

				this.confirmShow = false;
			},
			// 渲染数据
			changeScore(data) {
				this.user = data
				this.$store.dispatch('setUserInfo', {level_id: data.currentLevel})
				this.user.reward = data.rankScore ? data.rankScore + '积分' : '已是最高分(敬请期待)'
			},
			// 初始化数据
			getLevelData() {
				let self = this
				util.questApi('member/memberLevel', {}, function (ret) {
					util.dataCheck(self.$store, ret, function (data) {
						self.changeScore(data)
					})
				})
			}
		},
		components: {
			dialog
		},
		mounted() {
			// this.$parent.closeLoadding()
		},
		created() {
			// 获取等级数据
			this.getLevelData()
			// 设置导航头

			// 设置头导航
			this.$store.dispatch('setHeadNav', {
				title: '活动详情',
				leftButton: 'back',
				rightButton: 'text',
				rightText: 'VIP说明',
				rightUrl: 'VIPexplanation'
			})

		}
	}
</script>

<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .font-color-2
    color: #b72021

  .star-img
    position: absolute
    height: 45px
    width: 45px

  .star-text
    background-color: #fecc1c
    color: #b72021
    font-size: 24px
    margin-left: 25px
    padding-left: 25px
    padding-right: 10px
    border-radius: 5px

  .star-progress
    background-color: #fcec35
    justify-content: center
    position: absolute
    top: 0
    left: 0
    bottom: 0
    border-radius: 10px

  .detail-icon
    font-size: 50px
    height: 54px
    width: 54px
    color: $main_color

  .pre-level
    color: $font_color
    padding-top: 3px
</style>`\