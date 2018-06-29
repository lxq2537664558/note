<template>
  <div v-if="tipList.show" class="pos-f fic">
    <div @click="clickMask" class="overlay pos-a"></div>
    <div v-if="tipList.type == 'image'" @click="clickMask" class="pos-a f-cent">
      <image :src="signInSuccess" alt="" class="w600 h600"></image>
    </div>
    <scroller v-else class="w690" >
      <div class="h250"></div>
      <div class="fdc w690 fic">
        <div class="w690 bor-r20">
          <!--tip-top-->
          <div class="h300">
            <image :src="tipList.tipTopUrl" alt="" class="h300 w690"></image>
          </div>
          <!--tip-center-->
          <div class="bc-f tip-center">
          <!--tip-text default-->
            <div v-if="tipList.type == 'default'" class="f-cent mt70">
                <text class="f38 font-color pb100">{{tipList.text}}</text>
            </div>
            <!--tip-text image-text -->
            <div v-if="tipList.type == 'imageText'" class="fdr f-cent mb100 mt70">
              <!--<image :src="tipList.imageSuccess" alt="" class="w75 h75 mr50"></image>-->
              <text class="iconfont font-color-main mr50 w75 h75 f70">&#xe6b1;</text>
              <text class="f38 font-color">{{tipList.text}}</text>
            </div>
            <!--tip-text lulu -->
            <div v-if="tipList.type == 'lulu'" class="fdc fic">
              <div class="fdr h200 w600 lulu-center">
                <div class="w15">
                  <image :src="tipList.imageLulu" alt="" class="h200 w15"></image>
                </div>
                <div class="f-9 f-cent">
                  <text class="f38 font-color">{{tipList.luluText}}</text>
                </div>
                <div class="f-11 fdr f-cent lulu-center-right" style="border-left-color: #eee;border-left-width: 1px;border-left-style: dashed">
                  <text class="f60 font-color-main">{{tipList.luluCoin}}</text>
                  <text class="f32 font-color ml5 mt10">{{tipList.luluCoinText}}</text>
                </div>
              </div>
              <div class="h120 fdr f-cent">
                <!--<image :src="tipList.imageSuccess" alt="" class=""></image>-->
                <text class="iconfont font-color-main mr50 w75 h75 f70">&#xe6b1;</text>
                <div><text class="f38 font-color">{{tipList.text}}</text></div>
              </div>
            </div>

            <!--tip-text submit -->
            <div v-if="tipList.type == 'submit'" class="f-cent mt35 fdc">
              <div class="fdr h50 f-cent">
                <text class="f32 font-color">确定兑换</text>
                <text class="f32 font-color-main">{{tipList.submitText}}</text>
              </div>
              <div class="fdr h50 f-cent">
                <text class="f26 font-color">当前积分: </text>
                <text class="f26 font-color-2 fw-b pt5">{{tipList.currentScore}}</text>
              </div>
              <div class="fdr h50 f-cent">
                <text class="f26 font-color">所需积分: </text>
                <text class="f26 font-color-main fw-b pt5">{{tipList.needScore}}</text>
              </div>
              <!--<img :src="tipList.imageSuccess" alt="" style="width: 75px;height: 75px;margin-right: 50px">-->
              <!--<text style="font-size: 38px;font-size: #555555">{{tipList.text}}</text>-->
            </div>

            <!--提交按钮-->
            <div v-if="tipList.submitShow" class="f-cent h150">
              <div @click="clickSubmit" class="w300 h75 f-cent submit-button mb25 bor-r50">
                <text class="f-c-3">确认</text>
              </div>
            </div>
          </div>
        </div>
        <div @click="clickCloseMask" class="h150 fje fic">
          <text @click="clickCloseMask" class="w70 f70 iconfont f-c-f">&#xe6b7;</text>
        </div>
      </div>
    </scroller>
  </div>
</template>

<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .font-color
    color: $font_color

  .font-color-2
    color: $font2_color

  .font-color-main
    color: $main_color

  .overlay
    background-color: rgba(0, 0, 0, .5)

  .tip-center
    border-bottom-left-radius: 20px
    border-bottom-right-radius: 20px

  .lulu-center
    border-style: solid
    border-color: #eeeeee
    border-width: 1px
    border-radius: 5px
    border-left-width: 0

  .submit-button
    background-color: $main_color

</style>

<script>
	import _c from '@/Global.vue'
  const modal = weex.requireModule('modal')

	import {WxcMask} from 'weex-ui';
	import util from '../util';

	export default {
		props: {
			tipList: {
				type: Object,
        default:() => ({
					// 是否显示
					show: false,
					tipTopUrl: _c.sUrl + '/images/tip_top.png',
					imageSuccess: _c.sUrl + '/images/image_success.png',
					imageLulu: _c.sUrl + '/images/image_lulu.png',
					// 展示样式
					// type: 'submit',
					// type: 'imageText',
					// type: 'lulu',
					type: 'default',
					// type: 'image',
					// 内容
					// text: '您当前积分不足100',
					text: '兑换成功',
					luluText: '周俸禄',
					luluCoin: 300,
					luluCoinText: '彩金',

					submitText: '10元现金筹码',
					currentScore: 666,
					needScore: 100,
					// 提交按钮
					submitShow: false,
        })
      }
    },
		data() {
			return {
				// 签到成功logo
				signInSuccess:  _c.sUrl + '/images/sign_in_success.png',
      }
		},
		components: {WxcMask},
		methods: {
			clickCloseMask() {
				this.tipList.show = false;
			},
			clickMask() {
				this.clickCloseMask()
			},
      // 提交按钮
      clickSubmit() {
				this.tipList.submitAct()
      },
      // 清空输入框
      clearForm() {
				// this.$refs["input1"].blur()
				this.tipList.list.forEach((el, key) => {
					el.value = ''
          // 取消选择状态
          // console.log(key)
          // self.$refs.["input"].blur();
        })
      }
		},
		created() {},
		updated() {}
	}
</script>