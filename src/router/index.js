import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index.vue'),
    children: [
      {
        path: '/merchant/list',
        component: () => import(/* webpackChunkName: "index" */ '../views/Merchant/index.vue'),
      },
      {
        path: '/merchant/form/:id?',
        component: () => import(/* webpackChunkName: "index" */ '../views/Merchant/MerchantForm.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "index" */ '../views/Login'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
