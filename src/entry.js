/*global Vue*/

/* weex initialized here, please do not move this line */
const router = require('./router')




// Vuex is auto installed on the web



const App = require('@/index.vue')

const store = require('@/vuex/store.js')


/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router, store}, App))

