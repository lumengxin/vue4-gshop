<template>
  <div class="footer_guide">
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/home' === $route.path }"
      @click="goTo('/home')"
    >
      <span class="item_icon">
        <i class="icon iconfont iconghome"></i>
      </span>
      <span>外卖</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/search' === $route.path }"
      @click="goTo('/search')"
    >
      <span class="item_icon">
        <i class="icon iconfont icongsearch"></i>
      </span>
      <span>搜索</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/order' === $route.path }"
      @click="goTo('/order')"
    >
      <span class="item_icon">
        <i class="icon iconfont icongorder"></i>
      </span>
      <span>订单</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/mine' === $route.path }"
      @click="goTo('/mine')"
    >
      <span class="item_icon">
        <i class="icon iconfont icongmine"></i>
      </span>
      <span>我的</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'footer'
    }
  },
  methods: {
    goTo(path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins.styl'

.footer_guide
  top-border-1px(#e4e4e4)
  position fixed
  left 0
  bottom 0
  right 0
  width 100%
  height 50px
  background-color #fff
  display flex
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999
    &.on
      color #02a774
    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px
      .iconfont
        font-size 22px
</style>
