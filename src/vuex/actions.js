import util from '@/assets/util.js';

const actions = {
	// 设置会员信息
	setUserInfo({ commit }, obj) {
		commit('userInfo', obj)
	},
	// 获取公告和轮播图
	advert({ commit }){
		util.GET('oaSystem/advert', {}, e => {
			commit('announcement', e.data.data.bulletinText)
			commit('sliderList', e.data.data.sliderList)
		}, e => {
		}, (e) => {
		})
	},
	// 显示登录表单
	showLoginForm({ commit }, obj) {
		let self = this
		this.dispatch('showForm', {
			show: true,
			title: '绑定会员账号',
			list: [
				{
					field_val: 'username',
					prompt: '请输入您的会员账号',
					default_data: ''
				}
			],
			descr: '(会员绑定后只能联系客服进行修改, 请谨慎操作)',
			// submitUrl: 'member/login',
			submitAct: (data) => {
				util.questApi('member/login', data, function(ret){
					util.dataCheck(self, ret, function(data) {
						// 存进 vuex
						self.dispatch('setUserInfo', data)

						// 关闭表单
						self.dispatch('showForm', {
							show: false
						})
						// 登录提示
						util.alterTip('登录成功', 0.3)

						// 是否跳转
						let url = self.getters.jumpUrl
						if (url && Object.keys(url).length > 0) {
							// 清除跳转
							self.dispatch('setJumpUrl', {})
							util.toUrl(obj, url)
						}
					})
				})
			}
		})
	},
	// 修改表单显示
	showForm({ commit }, obj) {
		commit('submitForm', obj)
	},
	// 显示 loading
	showLoading({ commit }, text) {
		let obj = { show: true }
		if (text) {
			obj.text = text
		}
		commit('loading', obj)
	},
	// 关闭 loading
	closeLoading({ commit }) {
		commit('loading', {
			show: false
		})
	},
	// 设置导航头
	setHeadNav({ commit }, obj) {
		commit('headNav', obj)
	},
	// 导航头初始化
	setHeadNavInit({ commit }) {
		commit('headNav', {
			title: '',
			leftButton: 'msgCenter',
			rightButton: 'default'
		})
	},
	// 设置当前页
	setCurrentIndex({ commit }, index) {
		commit('currentIndex', index)
	},
	// 签到
	clickSignIn({ commit }) {
		let self = this
		util.getStorage('lastSignIn', e => {
			if (e.result == 'success' && e.data == (new Date()).toLocaleDateString()) {
				util.alterTip('今天已签到, 请明天再进行该操作', 1)
			} else {
				util.questApi('member/register', {}, function(ret){
					util.dataCheck(self, ret, function(data) {
						// 提示
						self.dispatch('showSignIn')

						// 缓存 最后一签到日期
						util.setCache('lastSignIn', (new Date()).toLocaleDateString())
					})
				})
			}
		})
	},
	// 显示签到成功
	showSignIn({ commit }) {
		// 成功
		this.dispatch('setTipList', {
			show: true,
			type: 'image'
		})
	},
	// 查看登录状态
	catStatus({ commit }, action) {
		let self = this
		util.questApi('member/status', {}, function(ret){
			util.dataCheck(self, ret, function(data) {
				// 成功执行方法
				action()
			})
		})
	},
	// 设置要跳转的页面
	setJumpUrl({ commit }, path) {
		commit('jumpUrl', path)
	},
	// 设置提示表单
	setTipList({ commit }, obj) {
		commit('tipList', obj)
	},
	openTipList({ commit }, obj) {
		obj.show = true
		this.dispatch('setTipList', obj)
	},
	closeTipList({ commit }, obj) {
		obj.show = false
		this.dispatch('setTipList', obj)
	}
}

export default actions
