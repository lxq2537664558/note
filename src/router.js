/*global Vue*/
import Router from 'vue-router'

import Home from '@/assets/views/Home'
import RouteCenter from '@/assets/views/RouteCenter'
import DiscountCenter from '@/assets/views/DiscountCenter'
import MyCenter from '@/assets/views/MyCenter'
import MsgRecode from '@/assets/views/MsgRecode'
import Setting from '@/assets/views/Setting'
import IntegralExchange from '@/assets/views/IntegralExchange'
import ActivityDetails from '@/assets/views/ActivityDetails'
import VIPexplanation from '@/assets/views/VIPexplanation'

Vue.use(Router)

module.exports = new Router({
	routes: [
		{
			path: '/Home',
			name: 'Home',
			component: Home
		},
		{
			path: '/routeCenter',
			name: 'RouteCenter',
			component: RouteCenter
		},
		{
			path: '/DiscountCenter',
			name: 'DiscountCenter',
			component: DiscountCenter
		},
		{
			path: '/MyCenter',
			name: 'MyCenter',
			component: MyCenter
		},
		{
			path: '/MsgRecode',
			name: MsgRecode,
			component: MsgRecode
		},
		{
			path: '/Setting',
			name: Setting,
			component: Setting
		},
		{
			path: '/IntegralExchange',
			name: IntegralExchange,
			component: IntegralExchange
		},
		{
			path: '/ActivityDetails',
			name: ActivityDetails,
			component: ActivityDetails
		},
		{
			path: '/VIPexplanation',
			name: VIPexplanation,
			component: VIPexplanation
		}
	]
})
