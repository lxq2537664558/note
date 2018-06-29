import util from '@/assets/util.js';

const mutations = {
  // 会员信息
	userInfo(state, obj) {
		if (obj && Object.keys(obj).length > 0) {
			for(let i in obj ){
				state.userInfo[i] = obj[i]
			}

			// 缓存会员数据
			util.setCache('userInfo', JSON.stringify(state.userInfo), e => {})
		}else{
			// 清空userInfo
			state.userInfo = {}

			// 清空缓存
			util.setCache('userInfo', null, e => {})
		}

		// 记录修改状态  触发监听
		state.userInfoS += 1
  },
	// 头部导航
	headNav(state, obj) {
		state.headNav = obj
	},
	// 公告
	announcement(state, text) {
  	state.announcement = text
	},
	// 轮播图
	sliderList(state, list) {
  	state.sliderList = list
	},
	// 表单
	submitForm(state, obj) {
  	state.submitForm = obj
	},
	// 提示
	tipList(state, obj) {
		state.tipList = obj
	},
	// 加载
	loading(state, obj) {
		state.loading = obj
	},
	// 修改当前页
	currentIndex(state, index) {
		state.currentIndex = index
	},
	// 记录跳转页面路径
	jumpUrl(state, path) {
		state.jumpUrl = path
	},
	// 提示框
	tipList(state, obj){
		// 初始化 按钮为false
		state.tipList.submitShow = false

		if (obj && Object.keys(obj).length > 0) {
			for(let i in obj ){
				state.tipList[i] = obj[i]
			}
		}else{
			state.tipList = {}
		}
		// 记录修改状态  触发监听
		// state.tipListS += 1
	}
}

export default mutations
