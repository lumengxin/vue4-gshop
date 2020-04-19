<template>
  <div class="shop-info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{ info.description }}</span>
            <span>
              由商家提供配送服务，约{{ info.deliveryTime }}分钟送达，距离{{
                info.distance
              }}
            </span>
          </div>
          <div class="delivery-money">配送费￥{{ info.deliveryPrice }}</div>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div
            class="activity-item"
            v-for="(support, index) in info.supports"
            :key="index"
            :class="supportClass[support.type]"
          >
            <span class="content-tag">
              <span class="mini-tag">{{ support.name }}</span>
            </span>
            <span class="activity-content">{{ support.content }}</span>
          </div>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list">
            <li class="pic-item" v-for="(pic, index) in info.pics" :key="index">
              <img :src="pic" alt="" width="120" height="120" />
            </li>
          </ul>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li>
            <span class="bold">品类</span>
            <span>{{ info.category }}</span>
          </li>
          <li>
            <span class="bold">商家电话</span>
            <span>{{ info.phone }}</span>
          </li>
          <li>
            <span class="bold">地址</span>
            <span>{{ info.address }}</span>
          </li>
          <li>
            <span class="bold">营业时间</span>
            <span>{{ info.workTime }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from '@better-scroll/core'

export default {
  data() {
    return {
      supportClass: ['activity-green', 'activity-red', 'activity-orange']
    }
  },
  computed: {
    ...mapState(['info'])
  },
  watch: {
    info() {
      // 当前页面刷新，更新数据
      this.$nextTick(() => {
        this._initScroll()
      })
    }
  },
  methods: {
    _initScroll() {
      new BScroll('.shop-info')

      // dom结构中，ul不是被li撑开。解决：1.调整css; 2.js计算ul高度
      const ul = document.querySelector('.pic-wrapper > .pic-list')
      const liWidth = 120
      const liMargin = 6
      const count = this.info.pics.length
      ul.style.width = (liWidth + liMargin) * count - liMargin + 'px'

      new BScroll('.pic-wrapper', {
        // 图片水平滑动
        scrollX: true
      })
    }
  },
  mounted() {
    // 从其他组件进入时info数据已经有了，watch中不会执行
    // 但是，当前页面刷新时，数据开始还没有
    // new BScroll('.shop-info')
    if (!this.info.pics) {
      // 如果没有数据，直接结束，watch侦听
      return
    }

    // 有数据时，直接mounted中创建
    this._initScroll()
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins'

.shop-info
  position: absolute
  top: 195px
  bottom: 0
  left: 0
  width: 100%
  background: #fff;
  overflow: hidden
  .section
    padding 16px 14px 14px
    font-size 16px
    background-color #fff
    color #666
    border-bottom 1px solid #eee
    position relative
    .section-title
      color #000
      font-weight 700
      line-height 16px
      > .iconfont
        float right
        color #ccc
    .delivery
      margin-top 16px
      font-size 13px
      line-height 18px
      .delivery-icon
        width 55px
        font-size 11px
        margin-right 10px
        display inline-block
        text-align center
        color #fff
        background-color #0097ff
        padding 1px 0
        border-radius 4px
      .delivery-money
        margin-top 5px

    .activity
      margin-top 16px
      .activity-item
        margin-bottom 12px
        display flex
        font-size 13px
        align-items center
        &.activity-green
          .content-tag
            background-color rgb(112, 188, 70)
        &.activity-red
          .content-tag
            background-color rgb(240, 115, 115)
        &.activity-orange
          .content-tag
            background-color: rgb(241, 136, 79)
        .content-tag
          display inline-block
          border-radius 2px
          width 36px
          height: 18px
          margin-right 10px
          color #fff
          font-style normal
          position relative
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 24px
            transform scale(.5)
            transform-origin 0 0
            display flex
            align-items center
            justify-content center
    .pic-wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      margin-top 16px
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin: 0
    .detail
      margin-bottom -16px
      > li
        display flex
        justify-content space-between
        align-items center
        margin-right -10px
        padding 16px 12px 16px 0
        line-height 16px
        bottom-border-1px(#ddd)
        font-size 13px
        > .bold
          font-weight 700
          color #333
        &:last-child
          border-none()


  .split
    width: 100%
    height: 16px
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background: #f3f5f7
</style>
