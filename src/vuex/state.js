import _c from '@/Global.vue'

const state = {
	// 会员信息
	userInfo: {},
	userInfoS: 0,
	// 头部菜单
	headNav: {
		title: '',
		leftButton: 'msgCenter',
		rightButton: 'default',
		rightText: '',
		rightUrl: ''
	},
	// 公告
	announcement: '最新公告',
	// 轮播图
	sliderList: [
		{
			logo: _c.sUrl + '/images/load_750_280.gif',
			url: '1'
		},
		{
			logo: _c.sUrl + '/images/load_750_280.gif',
			url: '1'
		},
		{
			logo: _c.sUrl + '/images/load_750_280.gif',
			url: '1'
		}
	],
	// 表单
	submitForm: {
		show: false,
		title: '绑定会员账号',
		list: [
			{
				name: 'username',
				placeholder: '请输入您的会员账号',
				value: ''
			}
		],
		descr: '',
	},
	// 提示
	tipList: {
		// 是否显示
		show: false,
		// 提交按钮
		submitShow: false,
		tipTopUrl: _c.sUrl + '/images/tip_top.png',
		imageSuccess: _c.sUrl + '/images/image_success.png',
		imageLulu: _c.sUrl + '/images/image_lulu.png',
		// 展示样式
		// type: 'submit',
		// type: 'imageText',
		// type: 'lulu',
		// type: 'default',
		// type: 'image',
		// 内容
		// text: '您当前积分不足100',
		text: '兑换成功',
		luluText: '周俸禄',
		luluCoin: 300,
		luluCoinText: '彩金',

		submitText: '10元现金筹码',
		currentScore: 666,
		needScore: 100
	},
	// 加载按钮
	loading: {
		show: false,
		text: '加载中...',
	},
	// 默认页
	currentIndex: 0,
	// 跳转地址路径
	jumpUrl: {}
}

export default state
