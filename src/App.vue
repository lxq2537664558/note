<template>
  <div class="app-wrapper">
    <router-view class="r-box"></router-view>
    <tab-bar :currentPage="currentPage" @tabTo="onTabTo"></tab-bar>
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
	import _c from '@/Global.vue'

	import {WxcLoading} from 'weex-ui';

	import util from './assets/util';
	import tabBar from './assets/components/tabBar.vue';
	import formH from './assets/components/formH.vue'
	import tipH from './assets/components/tipH.vue'

	// const navigator = weex.requireModule('navigator')
	const storage = weex.requireModule('storage')
	const modal = weex.requireModule('modal');

	export default {
		data() {
			return {
				// 当前页面
				// currentPage: 'Home',
				currentPage: 0,
				// currentPage: 'IntegralExchange',
				// 遮罩底层
				bottomMaskShow: false,
				// 加载按钮
				loading: {
					show: false,
					text: '加载中...',
				},// 提示框
				tipList: {
					tipTopUrl: _c.sUrl + '/images/tip_top.png',
					imageSuccess: _c.sUrl + '/images/image_success.png',
					imageLulu: _c.sUrl + '/images/image_lulu.png',
					// 展示样式
					// type: 'default',
					// type: 'imageText',
					// type: 'lulu',
					type: 'default',
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
					// 是否显示
					show: false
				},
				// 登录表单
				submitForm: {
					show: true,
					// show: true,
					title: '绑定会员账号',
					list: [
						{
							name: 'username',
							placeholder: '请输入您的会员账号',
							value: ''
						}
					],
					descr: '(会员绑定后只能联系客服进行修改, 请谨慎操作)',
					submitUrl: 'member/login',
					submitAct: (rst) => {
						this.userInfo = rst.data
						storage.setItem('userInfo', JSON.stringify(rst.data), e => {
						})

						modal.toast({
							message: '登录成功',
							duration: 0.3
						})

						if (_c.authUrlJump.indexOf(this.auhtLoginUrl) > -1) {
							this.onTabTo({data: {key: this.auhtLoginUrl}})
						}
					}
				},
				formList: {
					show: false
        },
				// 登录信息
				userInfo: {},
				// 登录验证url
				auhtLoginUrl: '',
        // 公告
        announcement: ''
			}
		},
		components: {
			'tab-bar': tabBar,
			WxcLoading,
			'form-h': formH,
			'tip-h': tipH
		},
		created() {
			this.init()
			// this.clearUserInfo()
      // 监听安卓返回事件
      this.backListener()
		},
    mounted() {
			// 获取设备信息
			this.getDevInfo()
    },
		methods: {
			onTabTo(_result) {
				// console.log(_result)
				let _key = _result.data.key || '';
				if (this.$router) {
					this.auhtLoginUrl = ''
					if (this.auth(_key) ) {
						this.currentPage = _key
						this.openLoading()
						// 尝试
						// navigator.push({
             //  url: util.getEntryUrl(_key),
						  // animated: "true"
						// });
						this.$router.push('/' + _key)
					}
				} else {
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
			login() {
				// 绑定会员提示

        // 登录
				this.formList = this.submitForm
				this.formList.show = true
			},
			init() {
				let self = this
				storage.getItem('userInfo', e => {
					if (e.result == 'success') {
						let userInfo = {}
						if (e.data) {
							userInfo = JSON.parse(e.data)
						}
						self.userInfo = userInfo
					} else {}
				})
        // 获取公告 轮播图
			},
			clearLogin(data) {
				modal.alert({
					message: data.message,
					duration: 1
				}, function (value) {
				})

				if (data.code == 101) {
					this.clearUserInfo()
				}
			},
      clearUserInfo() {
				util.setCache('userInfo', null)
				this.userInfo = {}
			},
			auth(page) {
				if (_c.authUrlArr.indexOf(page) > -1) {
					// 需要登录验证的  页面
					if (!this.userInfo.username) {
						this.auhtLoginUrl = page
						modal.alert({
							message: '请先绑定会员',
							duration: 0.3
						}, () => {
							this.login()
						})

						return false;
					}
				}
				return true
			},
			getDevInfo() {
				util.POST('log/getDevInfo', JSON.stringify(weex.config), () => {
				}, () => {
				}, () => {
				})
			},
      backListener() {
				// let that = this
				const globalEvent = weex.requireModule('globalEvent')
				globalEvent.addEventListener("androidback", (e) => {
					// 安装范返回键监控   后期处理
					// console.log(e)
					// that.$router.go(-1)
        })
      }
		}
	}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
    color: #333;
  }

  /*.iconfont {}*/
</style>
<style scoped>
  .app-wrapper {
    background-color: #f4f4f4;
  }

  .r-box {
    position: absolute;
    top: 0;
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