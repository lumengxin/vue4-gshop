<template>
  <div class="cart-control">
    <transition name="move">
      <div
        class="iconfont icongdelete"
        v-if="food.count"
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{ food.count }}</div>
    <!-- stop 阻止事件冒泡到父元素 -->
    <div class="iconfont icongadd" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  name: 'CartControl',
  props: {
    food: Object
  },
  data() {
    return {}
  },
  methods: {
    updateFoodCount(isAdd) {
      this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins'

.cart-control
  font-size 0
  .icongdelete
    display inline-block
    padding .375rem
    line-height 1.5rem
    font-size 1.5rem
    color $green
    &.move-enter-active, &.move-leave-active
      transition all .3s
    &.move-enter, &.move-leave-to
      opacity 0
      transform translateX(15px) rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    width .75rem
    padding-top .375rem
    line-height 1.5rem
    text-align center
    font-size .625rem
    color rgb(147,153,159)
  .icongadd
    display inline-block
    padding .375rem
    line-height 1.5rem
    font-size 1.5rem
    color $green
</style>
