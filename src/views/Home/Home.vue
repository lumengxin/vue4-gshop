<template>
  <div class="msite">
    <!--首页头部-->
    <header-top :title="address.address">
      <router-link tag="span" class="header_search" slot="left" to="/search">
        <i class="iconfont icongsearch"></i>
      </router-link>
      <router-link
        tag="span"
        class="header_login"
        slot="right"
        :to="userInfo._id ? '/userinfo' : '/login'"
      >
        <span class="header_login_text" v-if="userInfo._id">
          <i class="iconfont iconguser"></i>
        </span>
        <span class="header_login_text" v-else>登录|注册</span>
      </router-link>
    </header-top>
    <div class="msite-container">
      <!--首页导航-->
      <nav class="msite_nav">
        <div
          v-if="categorys.length"
          class="swiper-container"
          :data="categorysArr"
        >
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(categorys, index) in categorysArr"
              :key="index"
            >
              <a
                href="javascript:"
                class="link_to_food"
                v-for="(category, index) in categorys"
                :key="index"
              >
                <div class="food_container">
                  <img :src="baseImgUrl + category.image_url" />
                </div>
                <span>{{ category.title }}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img v-else src="../../assets/images/msite_back.svg" alt="" />
      </nav>
      <!--首页附近商家-->
      <shop-list></shop-list>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
import ShopList from './ShopList'
// import BScroll from '@better-scroll/core'

export default {
  name: 'Home',
  components: {
    'shop-list': ShopList
  },
  data() {
    return {
      baseImgUrl: 'https://fuss10.elemecdn.com'
    }
  },
  computed: {
    ...mapState(['address', 'categorys', 'userInfo']),
    /* 将一维数组categorys处理为轮播用的二维数组 */
    categorysArr() {
      const { categorys } = this
      // 空的二维大数组
      const arr = []
      // 大数组中的小数组
      let minArr = []
      categorys.forEach(c => {
        // 如果当前小数组满了，创建一个新的
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果小数组为空，保存到大数组
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 当前数据项保存到小数组
        minArr.push(c)
      })
      return arr
    }
  },
  watch: {
    // 数据获取到并更新到页面后，再创建Swiper对象
    categorys() {
      // setTimeout可以实现，但不友好
      this.$nextTick(() => {
        // 完成界面更新，执行回调（需要写到数据更新后面）
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
        // new BScroll('.msite-container', {
        //   click: true
        // })
      })
    }
  }
  /*  mounted() {
    var mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      // direction: 'vertical',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination'
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar'
      }
    })
    console.log(mySwiper)
  } */
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins.styl'

.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
</style>
