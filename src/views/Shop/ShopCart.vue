<template>
  <div>
    <div class="shop-cart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrap">
            <div class="logo" :class="{ highlight: totalCount }">
              <i
                class="iconfont icongcart"
                :class="{ highlight: totalCount }"
              ></i>
            </div>
            <div class="num" v-if="totalCount">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{ highlight: totalCount }">
            ￥{{ totalPrice }}
          </div>
          <div class="desc">另需配送费￥{{ info.deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{ payText }}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in shopcart" :key="index">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CartControl from './CartControl'
import BScroll from '@better-scroll/core'
import { MessageBox } from 'mint-ui'

export default {
  name: '',
  components: {
    CartControl
  },
  computed: {
    ...mapState(['shopcart', 'info']),
    ...mapGetters(['totalCount', 'totalPrice']),
    payClass() {
      const { totalPrice } = this
      const { minPrice } = this.info

      return totalPrice >= minPrice ? 'enough' : 'not-enough'
    },
    payText() {
      const { totalPrice } = this
      const { minPrice } = this.info
      if (totalPrice === 0) {
        return `￥${minPrice}元起送`
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`
      } else {
        return '去结算'
      }
    },
    listShow() {
      // 总数量为0 直接不显示
      if (this.totalCount === 0) {
        // 购物车中数量减到0时，isShow重置为flase; 否则添加商品会直接打开购物车列表
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isShow = false
        return false
      }

      if (this.isShow) {
        this.$nextTick(() => {
          // isShow切换时，创建了多个BScroll对象，导致click事件叠加，购物车内数量增加幅度不对
          // new BScroll('.list-content', {
          //   click: true
          // })

          // 保证BScrolld的实例是一个单例
          if (!this.scroll) {
            this.scroll = new BScroll('.list-content', {
              click: true
            })
          } else {
            // 解决单例时，有时进入不能重新计算导致无法滑动
            this.scroll.refresh()
          }
        })
      }

      return this.isShow
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    toggleShow() {
      // 总数量大于0时，才执行切换显隐逻辑；
      // 防止没有数量点击时，将isShow改为true, 添加商品会直接打开购物车列表
      if (this.totalCount > 0) {
        this.isShow = !this.isShow
      }
    },
    clearCart() {
      MessageBox.confirm('确定要清空购物车吗?').then(
        // eslint-disable-next-line no-unused-vars
        action => {
          this.$store.dispatch('clearShopCart')
        },
        () => {
          // 取消操作
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins'

.shop-cart
  position fixed
  left 0
  bottom 0
  width 100%
  height 3rem
  z-index 50
  .content
    display flex
    background #141d27
    font-size 0
    color rgba(255,255,255,.4)
    .content-left
      flex 1
      .logo-wrap
        display inline-block
        vertical-align top
        position relative
        top -0.625rem
        margin 0 .75rem
        padding .375rem
        width 3.5rem
        height 3.5rem
        box-sizing border-box
        border-radius 50%
        background #141d27
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background #2b343c
          &.highlight
            background $green
          .icongcart
            font-size 1.5rem
            line-height 2.75rem
            color #80858a
            &.highlight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 1.5rem
          height 1rem
          line-height 1rem
          text-align center
          border-radius 1rem
          font-size .5625rem
          font-weight 700
          color #ffffff
          background rgb(240,20,20)
          box-shadow 0 .25rem .5rem 0 rgba(0,0,0,.4)
      .price
        display inline-block
        vertical-align top
        margin-top .3125rem
        line-height 1.5rem
        padding-right .75rem
        box-sizing border-box
        font-size 1rem
        font-weight 700
        color #fff
        &.highlight
          color #fff
      .desc
        display inline-block
        vertical-align bottom
        font-size .625rem
        margin-bottom .9375rem
        margin-left -2.8125rem
    .content-right
      flex 0 0 6.5625rem
      width 6.5625rem
      .pay
        height 3rem
        line-height 3rem
        text-align center
        font-size .75rem
        font-weight 700
        color #fff
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
  .shopcart-list
    position absolute
    left 0
    top 0
    width 100%
    z-index -1
    transform translateY(-100%)
    &.move-enter-active, &.move-leave-active
      transition transform .3s
    &.move-enter, &.move-leave-to
      transform translateY(0)
    .list-header
      height 2.5rem
      line-height 2.5rem
      padding 0 1.125rem
      background #f3f5f7
      border-bottom .0625rem solid rgba(7,17,27,.1)
      .title
        float left
        font-size .875rem
        color rgb(7,17,27)
      .empty
        float right
        font-size .75rem
        color rgb(0,160,220)
    .list-content
      padding 0 1.125rem
      max-height 13.5625rem
      overflow hidden
      background #fff
      .food
        position relative
        padding .75rem 0
        box-sizing border-box
        bottom-border-1px(rgba(7,17,27,.1))
        .name
          font-size .875rem
          line-height 1.5rem
          color rgb(7,17,27)
        .price
          position absolute
          right 5.625rem
          bottom .75rem
          line-height 1.5rem
          font-size .875rem
          font-weight 700
          color rgb(240,20,20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom .375rem
.list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>
