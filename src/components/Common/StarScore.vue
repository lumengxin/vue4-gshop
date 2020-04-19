<template>
  <!-- <div class="star star-24">
    <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span>
  </div> -->
  <div class="star" :class="'star-' + size">
    <span
      v-for="(sc, index) in starClass"
      :key="index"
      class="star-item"
      :class="sc"
    ></span>
  </div>
</template>

<script>
// 星星类名常量
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'

export default {
  name: 'StarScore',
  props: {
    score: {
      type: Number,
      default: 5
    },
    size: {
      type: Number,
      default: 24
    }
  },
  computed: {
    starClass() {
      const { score } = this
      const scs = []
      const scoreInteger = Math.floor(score)
      for (let i = 0; i < scoreInteger; i++) {
        scs.push(CLASS_ON)
      }
      // *10 防止小数不精确
      if ((score - scoreInteger) * 10 >= 5) {
        scs.push(CLASS_HALF)
      }
      while (scs.length < 5) {
        scs.push(CLASS_OFF)
      }

      return scs
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins.styl'

.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('../../assets/images/stars/star48_on')
      &.half
        bg-image('../../assets/images/stars/star48_half')
      &.off
        bg-image('../../assets/images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../assets/images/stars/star36_on')
      &.half
        bg-image('../../assets/images/stars/star36_half')
      &.off
        bg-image('../../assets/images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../assets/images/stars/star24_on')
      &.half
        bg-image('../../assets/images/stars/star24_half')
      &.off
        bg-image('../../assets/images/stars/star24_off')
</style>
