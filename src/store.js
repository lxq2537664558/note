

// import Vue from 'vue'
import Vuex from 'vuex'


import state from '@/vuex/state'
import mutations from '@/vuex/mutations'
import getters from '@/vuex/getters'
import actions from '@/vuex/actions'

Vue.use(Vuex)

module.exports = new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})

// export default store
