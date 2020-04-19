import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECORD_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  RESET_CART
} from './mutation-types'
import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },

  [RECEIVE_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops
  },

  [RECORD_USER](state, { userInfo }) {
    state.userInfo = userInfo
  },

  [RESET_USER](state) {
    state.userInfo = {}
  },

  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },

  [INCREMENT_FOOD_COUNT](state, { food }) {
    // food中开始没有count属性
    if (!food.count) {
      // 第一次点击增加没有，值设置为1
      // count为新增属性（没有数据绑定）
      // food.count = 1
      /* Vue.set(对象，属性名，属性值): 
      向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新 
      const count = 'count'; Vue.set(food, count, 1)
      */
      Vue.set(food, 'count', 1)

      // 将food添加到购物车列表中
      state.shopcart.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, { food }) {
    // 根据界面设置开始没有 -
    // 由于 - 绑定有动画，可能连续点击多下 至负值
    if (food.count) {
      food.count--
      if (food.count === 0) {
        // 数量减到0时，从购物车中移除
        state.shopcart.splice(state.shopcart.indexOf(food), 1)
      }
    }
  },

  [RESET_CART](state) {
    // 清除food中的count
    state.shopcart.forEach(food => (food.count = 0))

    // 清除购物车中所有项(对象为引用数组类似，其他地方food需要额外操作)
    state.shopcart = []
  }
}
