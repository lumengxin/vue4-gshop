<template>
  <div class="shop">
    <shop-header></shop-header>
    <div class="tab">
      <div class="tab-item">
        <!-- 默认的是push, 多次点击后, 退出时会一直在子路由中跳转 -->
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>

    <!-- 利用缓存，解决子路由间切换，购物车中信息与列表不一致 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from './ShopHeader.vue'

export default {
  name: 'Shop',
  components: {
    ShopHeader
  },
  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins'

.tab
  height 2.5rem
  line-height 2.5rem
  background #fff
  bottom-border-1px(rgba(7,17,27,0.1))
  .tab-item
    float left
    width: 33.3333%
    text-align center
    font-size .875rem
    color rgb(77,85,93)
    a
      display block
      position relative
      &.router-link-active
        color #02a774
        &::after
          content ''
          position absolute
          left 50%
          bottom .0625rem
          width 2.1875rem
          height .125rem
          transform translateX(-50%)
          background #02a774
</style>
