<template>
  <div class="search">
    <header-top title="搜索"></header-top>
    <form class="search_form" @submit.prevent="getData">
      <input
        type="search"
        name="search"
        placeholder="请输入商家或美食名称"
        class="search_input"
        v-model="keywords"
      />
      <input type="submit" name="submit" class="search_submit" />
    </form>
    <section class="list" v-if="!noResult">
      <ul class="list_container">
        <!-- 字符串写法 :to="'/shop?id=' + item.id" -->
        <router-link
          :to="{ path: '/shop', query: { id: shop.id } }"
          tag="li"
          class="list_li"
          v-for="(shop, index) in shopList"
          :key="index"
        >
          <section class="item_left">
            <img v-lazy="imgBaseUrl + shop.image_path" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ shop.name }}</span>
              </p>
              <p>月售{{ shop.recent_order_num || shop.month_sales }}单</p>
              <p>
                {{ shop.float_minimum_order_amount }}元起送 / 距离{{
                  shop.distance
                }}
              </p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>

    <div class="search_none" v-else>很抱歉，暂无搜索结果!</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqSearchShop } from '../../api'
export default {
  name: 'Search',
  computed: {
    ...mapState(['latitude', 'longitude'])
  },
  watch: {
    shopList(value) {
      if (!value.length) {
        this.noResult = true
      } else {
        // 有结果时，重置noResult; 防止下一次没结果出错
        this.noResult = false
      }
    }
  },
  data() {
    return {
      keywords: '',
      shopList: [],
      noResult: false,
      imgBaseUrl: 'http://cangdu.org:8001/img/'
    }
  },
  methods: {
    async getData() {
      // this.noResult = flase
      const geohash = this.latitude + ',' + this.longitude
      const keywords = this.keywords.trim()

      const result = await reqSearchShop(geohash, keywords)
      if (result.code === 0) {
        this.shopList = result.data
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins.styl'

.search
  width 100%
  .search_form
    clearFix()
    margin-top 45px
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight 400
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #02a774
        font-size 16px
        color #fff
        background-color #02a774
  .list
    .list_container
      background-color #fff
      .list_li
        display flex
        justify-content center
        padding .625rem
        border-bottom .0625rem solid $bc
        .item_left
          margin-right .625rem
          .restaurant_img
            width 3.125rem
            height 3.125rem
            display block
        .item_right
          font-size .75rem
          flex 1
          .item_right_text
            p
              line-height .75rem
              margin-bottom .375rem
              &:last-child
                margin-bottom 0
  .search_none
    margin 0 auto
    color #333
    background-color #fff
    text-align center
    margin-top .125rem
</style>
