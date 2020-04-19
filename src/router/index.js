import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from 'views/Home/Home.vue'
// import Order from 'views/Order/Order.vue'
// import Search from 'views/Search/Search.vue'
// import Mine from 'views/Mine/Mine.vue'
import Login from 'views/Login/Login.vue'
import Shop from 'views/Shop/Shop.vue'
import ShopInfo from 'views/Shop/ShopInfo.vue'
import ShopGoods from 'views/Shop/ShopGoods.vue'
import ShopRatings from 'views/Shop/ShopRatings.vue'

// 用import函数引入路由组件，实现路由懒加载
// 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
const Home = () => import('views/Home/Home.vue')
const Order = () => import('views/Order/Order.vue')
const Search = () => import('views/Search/Search.vue')
const Mine = () => import('views/Mine/Mine.vue')

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
  },
  {
    path: '/shop',
    component: Shop,
    // redirect: '/shop/info',
    children: [
      {
        path: '/shop/info',
        component: ShopInfo
      },
      {
        path: '/shop/goods',
        component: ShopGoods
      },
      {
        path: '/shop/ratings',
        component: ShopRatings
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
