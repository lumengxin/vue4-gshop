import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入部分组件
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import loading from './assets/images/loading.gif'

import 'components/regesiter.js'
import './mock/mockServer.js'
// data-fns代替moment,轻量级
import './filters'

/* 可视化分析打包文件的包：webpack-bundle-analyzer
npm run build --report
*/
import 'stylus/reset.styl'

Vue.config.productionTip = false

// 注册mint-ui全局组件
Vue.component(Button.name, Button)

Vue.use(VueLazyload, {
  // 直接使用相对路径，会出现304
  // loading: './assets/images/loading.gif'
  loading
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
