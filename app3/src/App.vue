<template>
  <div class="app-wrapper">
      <router-view class="r-box" ></router-view>
      <tab-bar :test="test" :currentPage="currentPage" @tabTo="onTabTo"></tab-bar>
      <!--加载图标-->
      <wxc-loading
          :show="loading.show"
          :loading-text="loading.text"
          :interval="'200'"
      >
      </wxc-loading>
      <!--遮罩层-->
      <div v-if="bottomMaskShow" class="mask-black" style="justify-content: center;align-items: center"></div>
      <!--提交表单 第三版-->
      <form-h :formList="formList"></form-h>
      <!--提示层-->
      <tip-h :tipList="tipList"></tip-h>
  </div>
</template>

<script>
	import { WxcLoading } from 'weex-ui';
	import util from './assets/util';
	import tabBar from './assets/components/tabBar.vue';
	import formH from './assets/components/formH.vue'
	import tipH from './assets/components/tipH.vue'
	import _globalConfig from '@/Global.vue'

  const _c = _globalConfig
	const storage = weex.requireModule('storage')
	const modal = weex.requireModule('modal');

  export default {
    data () {
      return {
      	// 当前页面
        currentPage: 'Home',
				// currentPage: 'IntegralExchange',
      	// 遮罩底层
				bottomMaskShow: false,
				// 加载按钮
        loading: {
					show: false,
					text: '加载中...',
				},
        test: null,
        // 提示框
				tipList: {
					tipTopUrl: _c.sUrl + '/images/tip_top.png',
					imageSuccess: _c.sUrl + '/images/image_success.png',
					imageLulu:  _c.sUrl + '/images/image_lulu.png',
					// 展示样式
					// type: 'default',
					// type: 'imageText',
					// type: 'lulu',
					type: 'submit',
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
					submitShow: true,
					// 是否显示
					show: false
				},
				// 登录表单
				submitForm: {
					show: true,
					// show: true,
					title: '请登录会员账号',
					list: [
						{
							name: 'username',
							placeholder: '请输入您的会员账号',
							value: ''
						},
						{
							name: 'password',
							placeholder: '请输入您的密码',
							value: ''
						}
					],
					submitUrl: 'member/login',
					submitAct: (rst) => {
						this.userInfo = rst.data
						storage.setItem('userInfo', JSON.stringify(rst.data), e => {})

						modal.toast({
							message: '登录成功',
							duration: 0.3
						}, function (value) {
						})
					}
				},
				formList: {
					show: false
        },
				// 登录信息
        userInfo: {}
      }
    },
    components: {
      'tab-bar': tabBar,
			WxcLoading,
			'form-h': formH,
			'tip-h': tipH
		},
    created () {
    	// this.clearLogin()
    	this.init()
		},
    methods: {
      onTabTo(_result){
        let _key = _result.data.key || '';
				if(this.$router) {
					this.openLoading();
					// console.log(_key)
          this.currentPage = _key
				  this.$router.push('/' + _key)
        } else {
					// console.log('urlError')
        }
      },
      openLoading() {
				this.loading.show = true
      },
      closeLoadding() {
      	setTimeout(() => {
					this.loading.show = false
				}, 500)
      },
      login(){
				this.formList = this.submitForm
				this.formList.show = true
      },
      init() {
      	let self = this
				storage.getItem('userInfo', e => {
					if (e.result == 'success') {
						self.userInfo = e.data ? JSON.parse(e.data) : {}
					} else {}
        })
			},
      clearLogin() {
      	util.setCache('userInfo', null)
      	this.userInfo = {}
      },
      auth(page) {
      	// console.log(this.userInfo.username)
				if (this.userInfo.username) {

				} else {
					modal.alert({
						message: '请先登录',
						duration: 0.3
					}, () => {
						this.login()
					})
					if (page) {
						this.onTabTo({
							data: {
								key: page
							},
							status: 'auth'
						})
					}
        }
      }
    }
  }
</script>

<style>
  body{
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
    color:#333;
  }
  /*.iconfont {}*/
</style>
<style scoped>
  .app-wrapper{
    background-color: #f4f4f4;
  }
  .r-box{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .mask-black {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90px;
    background-color: #000;
    opacity: .5;
  }


</style>