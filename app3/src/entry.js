/*global Vue*/

/* weex initialized here, please do not move this line */
const router = require('./router');
const App = require('@/App.vue');


new Vue(Vue.util.extend({el: '#root', router}, App));

