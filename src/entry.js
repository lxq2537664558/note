// Vue.use(Vuex)
// }
// import state from '@/vuex/state'
// import mutations from '@/vuex/mutations'
// import getters from '@/vuex/getters'
// import actions from '@/vuex/actions'
//
// const store = new Vuex.Store({
// 	state,
// 	mutations,
// 	getters,
// 	actions
// })

// export default store


/*global Vue*/

/* weex initialized here, please do not move this line */
const router = require('./router')
const store = require('./store')

// Vuex is auto installed on the web



// import Vuex from 'vuex'

// if (WXEnvironment.platform !== 'Web') {

// }

// import state from '@/vuex/state'
// import mutations from '@/vuex/mutations'
// import getters from '@/vuex/getters'
// import actions from '@/vuex/actions'
//
// Vue.use(Vuex)
// const store = new Vuex.Store({
// 	state,
// 	mutations,
// 	getters,
// 	actions
// })


const App = require('@/App.vue')





/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router, store}, App))

