<template>
  <div v-if="tipList.show" style="align-items: center;position: fixed;top: 0;left: 0;right: 0;bottom: 0;">
    <div @click="clickMask" style="background-color: rgba(0, 0, 0, .5);position: absolute;top: 0;bottom: 0;left: 0;right: 0"></div>
    <scroller style="width: 690px;">
      <div style="margin-top: 250px;flex-direction: column;width: 690px;align-items: center;">
        <div style="width: 690px;border-radius: 20px;">
          <!--tip-top-->
          <div style="height: 300px;">
            <image :src="tipList.tipTopUrl" alt="" style="height: 300px;width: 690px"></image>
          </div>
          <!--tip-center-->
          <div style="background-color: #ffffff;border-bottom-left-radius: 20px;border-bottom-right-radius: 20px">
            <!--tip-text default-->
            <div v-if="tipList.type == 'default'" style="justify-content: center;align-items: center;margin-top: 70px;">
                <text style="font-size: 38px;color: #666666;padding-bottom: 100px">{{tipList.text}}</text>
            </div>
            <!--tip-text image-text -->
            <div v-if="tipList.type == 'imageText'" style="justify-content: center;align-items: center;margin-bottom: 100px;margin-top: 70px;flex-direction: row">
              <image :src="tipList.imageSuccess" alt="" style="width: 75px;height: 75px;margin-right: 50px"></image>
              <text style="font-size: 38px;color: #555555">{{tipList.text}}</text>
            </div>
            <!--tip-text lulu -->
            <div v-if="tipList.type == 'lulu'" style="flex-direction: column;align-items: center">
              <div style="flex-direction: row;height: 200px;width: 600px;border-style: solid;border-color: #eee;border-width: 1px;;border-radius: 5px;border-left-width: 0px">
                <div style="width: 15px">
                  <image :src="tipList.imageLulu" alt="" style="height: 200px;width: 15px"></image>
                </div>
                <div style="flex: .9;justify-content: center;align-items: center">
                  <text style="font-size: 38px;color: #555">{{tipList.luluText}}</text>
                </div>
                <div style="flex: 1.1;flex-direction: row;justify-content: center;align-items: center;border-left-color: #eee;border-left-width: 1px;border-left-style: dashed">
                  <text style="font-size: 60px;color: #fdcb2e">{{tipList.luluCoin}}</text>
                  <text style="font-size: 32px;color: #666;margin-left: 5px;margin-top: 10px">{{tipList.luluCoinText}}</text>
                </div>
              </div>
              <div style="height: 120px;flex-direction: row;justify-content: center;align-items: center">
                <image :src="tipList.imageSuccess" alt="" style="width: 75px;height: 75px;margin-right: 50px"></image>
                <div><text style="font-size: 38px;color: #555">{{tipList.text}}</text></div>
              </div>
            </div>

            <!--tip-text submit -->
            <div v-if="tipList.type == 'submit'" style="justify-content: center;align-items: center;margin-bottom: 0;margin-top: 35px;flex-direction: column">
              <div style="flex-direction: row;height: 50px;justify-content: center;align-items: center">
                <text style="font-size: 32px;color: #555">确定兑换</text>
                <text style="font-size: 32px;color: #ff8f2e">{{tipList.submitText}}</text>
              </div>
              <div style="flex-direction: row;height: 50px;justify-content: center;align-items: center;">
                <text style="font-size: 26px;color: #555">当前积分: </text>
                <text style="font-size: 26px;color: #f40000;font-weight: bold;padding-top: 5px">{{tipList.currentScore}}</text>
              </div>
              <div style="flex-direction: row;height: 50px;justify-content: center;align-items: center;">
                <text style="font-size: 26px;color: #555">所需积分: </text>
                <text style="font-size: 26px;color: #feca2e;font-weight: bold;padding-top: 5px">{{tipList.needScore}}</text>
              </div>
              <!--<img :src="tipList.imageSuccess" alt="" style="width: 75px;height: 75px;margin-right: 50px">-->
              <!--<text style="font-size: 38px;font-size: #555555">{{tipList.text}}</text>-->
            </div>

            <!--提交按钮-->
            <div v-if="tipList.submitShow" style="height: 150px;justify-content: flex-end;align-items: center;">
              <div  @click="clickSubmit"
                   style="width: 300px;height: 75px;justify-content: center;align-items: center;background-color: #ffcb2f;margin-bottom: 25px;border-radius: 50px">
                <text style="color: #333333">确认</text>
              </div>
            </div>
          </div>
        </div>
        <div @click="clickCloseMask" style="height: 150px;width: 690px;align-items: center">
          <div
              style="width: 75px;height: 75px;margin-top: 75px;border-radius: 50px;justify-content: center;align-items: center;border-width: 3px;border-color: #fff;border-style: solid">
            <text style="font-size: 70px;color: #fff;padding-top: 5px;">×</text>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
	import _c from '@/Global.vue'
  const modal = weex.requireModule('modal')

	import {WxcMask} from 'weex-ui';
	import util from '../util';

	export default {
		props: ['tipList'],
		data() {
			return {}
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