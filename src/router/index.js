import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home/Home.vue'
import Order from 'views/Order/Order.vue'
import Search from 'views/Search/Search.vue'
import Mine from 'views/Mine/Mine.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/mine',
    component: Mine
  }
]

const router = new VueRouter({
  routes
})

export default router
