<template>
  <div class="ratings" ref="ratingRef">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ info.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star-score :score="info.serviceScore" :size="36"></star-score>
            <span class="score">{{ info.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star-score :score="info.foodScore" :size="36"></star-score>
            <span class="score">{{ info.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ info.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <div class="ratings-select">
        <div class="ratings-type border-1px">
          <span
            class="block positive"
            :class="{ active: selectType === 2 }"
            @click="setSelectType(2)"
          >
            全部<span class="count">{{ ratings.length }}</span>
          </span>
          <span
            class="block positive"
            :class="{ active: selectType === 0 }"
            @click="setSelectType(0)"
          >
            满意<span class="count">{{ positiveCount }}</span>
          </span>
          <span
            class="block negative"
            :class="{ active: selectType === 1 }"
            @click="setSelectType(1)"
          >
            不满意
            <span class="count">{{ ratings.length - positiveCount }}</span>
          </span>
        </div>
        <div
          class="switch"
          :class="{ on: onlyShowText }"
          @click="toggleShowType"
        >
          <span class="iconfont icongselect"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="ratings-wrapper">
        <ul>
          <li
            class="ratings-item"
            v-for="(rating, index) in filterRatings"
            :key="index"
          >
            <div class="avatar">
              <img :src="rating.avatar" width="28" alt="" />
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <star-score :socre="ratings.score"></star-score>
                <span class="delivery">{{ rating.deliveryTime }}分钟</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend">
                <span
                  class="iconfont"
                  :class="rating.rateType === 0 ? 'iconglike' : 'icongdislike'"
                ></span>
                <span
                  class="item"
                  v-for="(reco, index) in rating.recommend"
                  :key="index"
                  >{{ reco }}</span
                >
              </div>
              <div class="time">
                {{ rating.rateTime | dataFormat('YYYY/DD/MM HH:mm:ss') }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BScroll from '@better-scroll/core'

export default {
  data() {
    return {
      selectType: 2,
      onlyShowText: true
    }
  },
  computed: {
    ...mapState(['info', 'ratings']),
    ...mapGetters(['positiveCount']),
    filterRatings() {
      const { ratings, onlyShowText, selectType } = this

      return ratings.filter(rating => {
        const { rateType, text } = rating
        /* true && true = true
          条件1:
              selectType: 0/1/2
              rateType: 0/1
              selectType===2 || selectType===rateType
          条件2
              onlyShowText: true/false
              text: 有值/没值
              !onlyShowText || text.length>0
        */
        // return true
        return (
          (selectType === 2 || selectType === rateType) &&
          (!onlyShowText || text.length > 0)
        )
      })
    }
  },
  methods: {
    setSelectType(type) {
      this.selectType = type
    },
    toggleShowType() {
      this.onlyShowText = !this.onlyShowText
    }
  },
  mounted() {
    this.$store.dispatch('getShopRatings', () => {
      this.$nextTick(() => {
        new BScroll(this.$refs.ratingRef, {
          click: true
        })
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins'

.ratings
  position absolute
  top 12.1875rem
  left 0
  bottom 0
  background #fff
  width 100%
  overflow hidden
  .overview
    display flex
    padding 1.125rem 0
    .overview-left
      flex 0 0 8.5625rem
      padding .375rem 0
      width 8.5625rem
      text-align center
      border-right .0625rem solid rgba(7,17,27,.1)
      @media only screen and (max-width: 20rem)
        flex 0 0 7.5rem
        width 7.5rem
      .score
        margin-bottom .375rem
        line-height 1.75rem
        font-size 1.5rem
        color rgb(255,153,0)
      .title
        margin-bottom .5rem
        line-height .75rem
        font-size .75rem
        color rgb(7,17,27)
      .rank
        line-height .625rem
        font-size .625rem
        color rgb(147,153,159)
    .overview-right
      flex 1
      padding .375rem 0 .375rem 1.5rem
      @media only screen and (max-width: 20rem)
        padding-left .375rem
      .score-wrapper
        margin-bottom .5rem
        font-size 0
        .title
          display inline-block
          line-height 1.125rem
          vertical-align top
          font-size .75rem
          color rgb(7,17,27)
        .star
          display inline-block
          margin 0 .75rem
          vertical-align top
        .score
          display inline-block
          line-height 1.125rem
          vertical-align top
          font-size .75rem
          color rgb(255,153,0)
      .delivery-wrapper
        font-size 0
        .title
          font-size .75rem
          line-height 1.125rem
          color rgb(7,17,27)
        .delivery
          margin-left .75rem
          font-size .75rem
          color rgb(147,153,159)
  .split
    width 100%
    height 1rem
    border-top .0625rem solid rgba(7,17,27,.1)
    border-bottom .0625rem solid rgba(7,17,27,.1)
    background #f3f5f7
  .ratings-select
    .ratings-type
      padding 1.125rem 0
      margin 0 1.125rem
      // top-border-1px(rgba(7,17,27,.1))
      font-size 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icongselect
          color: $green
      .icongselect
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
  .ratings-wrapper
    padding: 0 18px
    .ratings-item
      display: flex
      padding: 18px 0
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27)
        .star-wrapper
          margin-bottom: 6px
          font-size: 0
          .star
            display: inline-block
            margin-right: 6px
            vertical-align: top
          .delivery
            display: inline-block
            vertical-align: top
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .text
          margin-bottom: 8px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
        .recommend
          line-height: 16px
          font-size: 0
          .iconglike, .icongdislike, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
          .iconglike
            color: $yellow
          .icongdislike
            color: rgb(147, 153, 159)

          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
