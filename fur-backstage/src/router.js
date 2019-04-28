import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 前端
    {
      path: '/forders',
      name: 'forders',
      component: () => import('./views/qian/Forders'),
      children: [
        {
          path: '',
          name: '', 
          component: () => import('./views/qian/Fallorder.vue'),
        },
        {
          path: 'fallorder',
          name: 'fallorder',
          component: () => import('./views/qian/Fallorder.vue'),
        },
        {
          path: 'fonpay',
          name: 'fonpay',
          component: () => import('./views/qian/Fonpay.vue'),
        },
        {
          path: 'fonend',
          name: 'fonend',
          component: () => import('./views/qian/Fonend.vue'),
        },
        {
          path: 'fonreceive',
          name: 'fonreceive',
          component: () => import('./views/qian/Fonreceive.vue'),
        },
        {
          path: 'ffinish',
          name: 'ffinish',
          component: () => import('./views/qian/Ffinish.vue'),
        },
        {
          path: 'freturn',
          name: 'freturn',
          component: () => import('./views/qian/Freturn.vue'),
        }
      ]
    },
    // 后台
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'shippinghandler',
          name: 'shippinghandler',
          component: () => import('./views/ShippingHandler.vue'),
          children: [

            {
              path: 'oderdetails/:id',
              name: 'oderdetails',
              component: () => import('./views/OderDetails.vue'),
            }
          ]
        },
        {
          path: 'logisticsmanage',
          name: 'logisticsmanage',
          component: () => import('./views/LogisticsManage.vue'),
        },
        {
          path: 'ordermodify',
          name: 'ordermodify',
          component: () => import('./views/OrderModify.vue'),
        },
        {
          path: 'returnsmanagement',
          name: 'returnsmanagement',
          component: () => import('./views/ReturnsManagement.vue'),
        },
        {
          path: 'orderstatistics',
          name: 'orderstatistics',
          component: () => import('./views/OrderStatistics.vue'),
        },
        {
          path: 'transactionstatistics',
          name: 'transactionstatistics',
          component: () => import('./views/TransactionStatistics.vue'),
        }
      ]
    }

  ]
})
