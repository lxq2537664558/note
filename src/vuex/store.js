import Vue from 'vue'
import Vuex from 'vuex'

//if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
//}


import state from '@/vuex/state'
import mutations from '@/vuex/mutations'
import getters from '@/vuex/getters'
import actions from '@/vuex/actions'

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
