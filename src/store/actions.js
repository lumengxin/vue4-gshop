import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECORD_USER,
  RESET_USER,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  RESET_CART
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategory,
  reqShopList,
  reqUserInfo,
  reqLoginOut,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings
} from '../api'

export default {
  // 异步获取地址
  async getAddress({ commit, state }) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)

    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },

  // 异步食品分类信息
  async getFoodCategory({ commit }) {
    const result = await reqFoodCategory()

    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },

  // 异步获取商家列表
  async getShopList({ commit, state }) {
    const { longitude, latitude } = state
    const result = await reqShopList(longitude, latitude)

    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },

  // 同步记录用户信息
  recordUserInfo({ commit }, userInfo) {
    commit(RECORD_USER, { userInfo })
  },

  // 异步获取用户信息，根据session中user_id
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECORD_USER, { userInfo })
    }
  },

  // 异步登出
  async logout({ commit }) {
    const result = await reqLoginOut()
    if (result.code === 0) {
      console.log('loginout')
      // 登出后重置vuex中用户信息
      commit(RESET_USER)
    }
  },

  // 异步获取商家列表
  async getShopInfo({ commit }) {
    const result = await reqShopInfo()
    console.log(result)

    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 异步获取商品列表
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()

    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })

      // 数据更新后，通知组件
      // callback()
      // 判断callback是否有传，可选
      callback && callback()
    }
  },
  // 异步获取商品评论
  async getShopRatings({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      callback && callback()
    }
  },

  // 同步更新food中count数量
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },

  clearShopCart({ commit }) {
    commit(RESET_CART)
  }
}
