<template>
  <div v-if="formList.show" style="align-items: center;position: fixed;top: 0;left: 0;right: 0;bottom: 0;">
    <div @click="clickMask" style="background-color: rgba(0, 0, 0, .5);position: absolute;top: 0;bottom: 0;left: 0;right: 0"></div>
    <scroller style="width: 690px;">
      <div style="margin-top: 280px;flex-direction: column;width: 690px;align-items: center;">
        <div style="width: 690px;background-color:#fff;border-radius: 20px">
          <!--标题1-->
          <div style="height:80px;justify-content: center;align-items: center;border-radius: 20px">
            <text style="font-size: 40px;color: #444">{{formList.title}}</text>
          </div>
          <!--输入框-->
          <div v-for="(item, key) of formList.list"
               style="height: 85px;margin-bottom: 20px;padding-left: 40px;padding-right: 40px">
            <div style="flex: 1;height: 85px">
              <!--<input type="text">-->
              <input :type="item.type ? item.type : 'text'"
                     :name="item.name" v-model="item.value" :key="key"
                     style="flex: 1;background-color: #ededed;border-radius: 20px;padding-left: 30px;padding-right: 30px;color: #333"
                     :placeholder="item.placeholder">
            </div>
          </div>
          <!--提交按钮-->

          <!--详情-->
          <div style="margin-bottom: 10px">
            <text v-if="formList.descr" style="font-size: 24px;color: #ed3f14;text-align: center">{{formList.descr}}</text>
          </div>
          <div style="height: 100px;justify-content: flex-end;align-items: center;">
            <div @click="clickSubmit"
                style="width: 300px;height: 75px;justify-content: center;align-items: center;background-color: #ffcb2f;margin-bottom: 25px;border-radius: 50px">
              <text style="color: #555">提交</text>
            </div>
          </div>
        </div>
        <div @click="clickCloseMask" style="height: 150px;width: 690px;align-items: center">
          <div
              style="width: 76px;height: 76px;margin-top: 75px;border-radius: 50px;justify-content: center;align-items: center;border-width: 3px;border-color: #fff;border-style: solid">
            <text style="font-size: 70px;color: #fff;padding-top: 5px;">×</text>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
  const modal = weex.requireModule('modal')

	import {WxcMask} from 'weex-ui';
	import util from '../util';

	const stream = weex.requireModule('stream');

	export default {
		props: ['formList'],
		data() {
			return {}
		},
		components: {WxcMask},
		methods: {
			clickCloseMask() {
				this.formList.show = false;
			},
			clickMask() {
				this.clickCloseMask()
			},
      // 提交按钮
      clickSubmit() {
				if (this.formList.submitUrl) {
					// console.log(this.formList)
					util.GET(this.formList.submitUrl, this.formList.list, (rst) => {
						// 成功
						this.formList.submitAct(rst.data)
						this.clickCloseMask()
					}, (rst) => {
						// 失败
						modal.alert({
							message: rst.data.message,
							duration: 1
						}, function (value) {
						})
					})

					this.clearForm()
				} else {
					modal.alert({
						message: '请求失败, 请联系客服!',
						duration: 0.3
					}, function (value) {
					})
        }
      },
      // 清空输入框
      clearForm() {
				// this.$refs["input1"].blur()
				this.formList.list.forEach((el, key) => {
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
