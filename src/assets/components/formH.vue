<template>
  <div v-if="formList.show" class="pos-a lueluelue">
    <!--遮罩层-->
    <div @click="clickCloseMask" class="pos-a overlay"></div>
    <scroller class="w690" style="position: absolute;top: 0;bottom: 0;left: 30px">
      <!--多余的-->
      <div @click="clickCloseMask" class="h280"></div>

      <div class="fdc w690 fic">
        <div class="w690 bc-f bor-r20">
          <!--标题-->
          <div class="h80 f-cent bor-r20">
            <text class="f40 f-c-3">{{formList.title}}</text>
          </div>
          <!--输入框-->
          <div v-for="(item, key) of formList.list" class="h85 mb20 pl40 pr40">
            <div class="f1 h85">
              <!--<input type="text">-->
              <input :type="item.type ? item.type : 'text'"
                     :name="item.field_val" v-model="item.default_data" :key="key"
                     class="f1 bc-e pl30 pr30 f-c-6"
                     style="border-radius: 20px;"
                     :placeholder="item.prompt">
            </div>
          </div>
          <!--提交按钮-->

          <!--详情-->
          <div class="mb10">
            <text v-if="formList.descr" class="f24 desc fac" style="text-align: center">{{formList.descr}}</text>
          </div>
          <div class="h100 fje fic">
            <div @click="clickSubmit" class="w300 h75 f-cent bc-f mb25 bor-r50 submit-but">
              <text class="submit-text">提交</text>
            </div>
          </div>
        </div>
      </div>
      <div @click="clickCloseMask" class="h170 pt80 fic">
        <text @click="clickCloseMask" class="w70 f70 iconfont f-c-f">&#xe6b7;</text>
      </div>
      <!--<div class="h70 w70 fic mt80">-->
      <!--<div-->
      <!--style="width: 76px;height: 76px;margin-top: 75px;border-radius: 50px;justify-content: center;align-items: center;border-width: 3px;border-color: #fff;border-style: solid">-->
      <!--<text style="font-size: 70px;color: #fff;padding-top: 5px;">×</text>-->
      <!--</div>-->
      <!--</div>-->
    </scroller>
  </div>
</template>

<style scoped lang="sass">
  @import '@/assets/common/common.sass'

  .lueluelue
    /*兼容web*/
    z-index: 500

  .overlay
    background-color: rgba(0, 0, 0, .5)

  .form-title
    color: $font_color

  .desc
    color: $font2_color

  .submit-but
    background-color: $main_color

  .submit-text
    color: $font_color
</style>

<script>
	// const modal = weex.requireModule('modal')
	// const stream = weex.requireModule('stream');

	export default {
		props: {
			formList: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {}
		},
		methods: {
			// 遮罩层
			clickCloseMask() {
				this.formList.show = false;
			},
			clickMask() {
				this.clickCloseMask()
			},
			// 提交按钮
			clickSubmit() {
				// 显示 loading
				this.$store.dispatch('showLoading', '提交中...')

				let data = {}
				this.formList.list.forEach(el => {
					// let name =
					data[el.field_val] = el.default_data
				})
				// 请求提交
				this.formList.submitAct(data)

				// 清除输入框内容
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
		created() {
		},
		updated() {
		}
	}
</script>
