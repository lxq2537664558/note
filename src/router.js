/*global Vue*/
import Router from 'vue-router'


import Home from '@/assets/views/Home'
// import RouteCenter from '@/assets/views/RouteCenter'
// import DiscountCenter from '@/assets/views/DiscountCenter'
// import MyCenter from '@/assets/views/MyCenter'
// import MsgRecode from '@/assets/views/MsgRecode'
// import Setting from '@/assets/views/Setting'
// import IntegralExchange from '@/assets/views/IntegralExchange'
// import ActivityDetails from '@/assets/views/ActivityDetails'
// import VIPexplanation from '@/assets/views/VIPexplanation'
import test1 from '@/assets/views/test1'
import test2 from '@/assets/views/test2'
import test3 from '@/assets/views/test3'
import test4 from '@/assets/views/test4'
import test5 from '@/assets/views/test5'


Vue.use(Router)

module.exports = new Router({
  routes: [

    {
      path: '/home',
      // name: 'home',
      component: Home
    }
  ]
})
