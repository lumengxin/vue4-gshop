<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: index === currentIndex }"
            @click="changeMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <!-- v-if判断图片是否有，没有时不会报错 -->
              <img :src="good.icon" alt="" class="icon" v-if="good.icon" />
              <span>{{ good.name }}</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFoodDetail(food)"
              >
                <div class="icon">
                  <img v-lazy="food.icon" width="77" height="77" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice">
                      ￥{{ food.oldPrice }}
                    </span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart></shop-cart>
    </div>

    <food-detail :foodDetail="foodDetail" ref="foodRef"></food-detail>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import { mapState } from 'vuex'
import CartControl from './CartControl'
import FoodDetail from './FoodDetail'
import ShopCart from './ShopCart'

export default {
  name: 'ShopGoods',
  components: {
    CartControl,
    FoodDetail,
    ShopCart
  },
  computed: {
    /* 计算属性执行：初始时，和相关数据发生变化 */
    ...mapState(['goods']),
    // 计算得到当前分类的下标
    currentIndex() {
      const { scrollY, tops } = this
      const index = tops.findIndex((top, index) => {
        // scrollY >= 当前top && scrollY < 下一个top
        return scrollY >= top && scrollY < tops[index + 1]
      })
      return index
    }
  },
  data() {
    return {
      // 右侧滑动的Y轴坐标
      scrollY: 0,
      // 右侧分类li的top组成的数组
      tops: [],
      foodDetail: {}
    }
  },
  methods: {
    changeMenuItem(index) {
      // console.log(index)
      const y = -this.tops[index]

      // 优化，点击后菜单立马变颜色
      this.scrollY = -y

      this.foodsScroll.scrollTo(0, y, 200)
    },
    showFoodDetail(food) {
      this.foodDetail = food
      this.$refs.foodRef.toggleShowFood()
    },
    _initScroll() {
      new BScroll('.menu-wrapper', {
        click: true
      })

      // const 改为 this. 其他地方可以引用changeMenuItem
      this.foodsScroll = new BScroll('.foods-wrapper', {
        // 配合配置项使用，绑定的事件才能生效
        // 3 可以解决惯性滑动时不计算，无法正确定位
        probeType: 2,
        // 有时会出现不配置，原生点击事件也能生效。最好加上
        click: true
      })

      // 给右侧列表绑定scroll监听事件
      // eslint-disable-next-line no-unused-vars
      this.foodsScroll.on('scroll', ({ x, y }) => {
        // console.log(x, y)
        this.scrollY = Math.abs(y)
      })
      // 给右侧列表绑定scrollEnd监听事件, 解决惯性滑动问题
      // eslint-disable-next-line no-unused-vars
      this.foodsScroll.on('scrollEnd', ({ x, y }) => {
        console.log('scrollEnd', x, y)
        this.scrollY = Math.abs(y)
      })
    },
    _initTops() {
      // 1 初始化tops
      const tops = []
      let top = 0
      // 第一个tops为0
      tops.push(top)

      // 2 收集 找到所有分类的li
      // const lis = document.getElementsByClassName('food-list-hook')
      // 更快定位 this.$refs.foodsUl.children || ...
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      // console.log(lis, typeof lis)
      // lis Object, 伪数组变成真数组
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })

      // 3 更新数据
      this.tops = tops
      console.log(tops)
    }
  },
  mounted() {
    this.$store.dispatch('getShopGoods', () => {
      // goods数据为异步获取，在回调中更新数据后再执行
      // 并且视图更新后
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins.styl'

.goods
  display flex
  position absolute
  top 12.1875rem
  bottom 2.875rem
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 5rem
    width 5rem
    background #f3f5f7
    .menu-item
      display table
      height 3.375rem
      width 3.5rem
      padding 0 .75rem
      line-height .875rem
      &.current
        position relative
        margin-top -0.0625rem
        color $green
        background #fff
        font-weight 700
        z-index 10
        .text
          border-none()
      .text
        display table-cell
        width 3.5rem
        vertical-align middle
        font-size .75rem
        bottom-border-1px(rgba(7,17,27,.1))
        .icon
          display inline-block
          vertical-align top
          width .75rem
          height .75rem
          margin-right .125rem
          background-size .75rem .75rem
          background-repeat no-repeat
  .foods-wrapper
    flex 1
    .title
      padding-left .875rem
      height 1.625rem
      line-height 1.625rem
      border-left .125rem solid #d9dde1
      font-size .75rem
      color rgba(147,153,159,1)
      background #f3f5f7
    .food-item
      display flex
      margin 1.125rem
      padding 1.125rem
      bottom-border-1px(rgba(7,17,27,.1))
      &:last-child
        border-none()
        margin-bottom  0
      .icon
        flex 0 0 4.6875rem
        margin-right .625rem
        // border 1px solid
      .content
        flex 1
        .name
          margin .125rem 0 .5rem 0
          height  .875rem
          line-height .875rem
          font-size .875rem
          color rgb(7,17,27)
        .desc, .extra
          line-height  .625rem
          font-size .625rem
          color rgb(147,153,159)
        .desc
          line-height .75rem
          margin-bottom .5rem
        .extra
          .count
            margin-right .75rem
        .price
          font-weight 700
          line-height 1.5rem
          .now
            margin-right .5rem
            font-size .875rem
            color rgb(240,20,20)
          .old
            text-decoration line-through
            font-size .625rem
            color rgb(147,153,159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom .75rem
</style>
