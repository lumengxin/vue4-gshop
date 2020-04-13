import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home/Home.vue'
import Order from 'views/Order/Order.vue'
import Search from 'views/Search/Search.vue'
import Mine from 'views/Mine/Mine.vue'
import Login from 'views/Login/Login.vue'

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
    component: Home,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/mine',
    component: Mine,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
