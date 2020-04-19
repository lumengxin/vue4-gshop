<template>
  <div>
    <section class="profile">
      <header-top title="我的"></header-top>
      <section class="profile-number">
        <router-link
          tag="a"
          :to="userInfo._id ? '/userinfo' : '/login'"
          class="profile-link"
        >
          <div class="profile_image">
            <i class="icon iconfont iconguser"></i>
          </div>
          <div class="user-info">
            <p class="user-info-top" v-if="!userInfo.phone">
              {{ userInfo.name || '登录/注册' }}
            </p>
            <p>
              <span class="user-icon">
                <i class="icon iconfont icongphone"></i>
              </span>
              <span class="icon-mobile-number">
                {{ userInfo.phone || '暂无绑定手机号' }}
              </span>
            </p>
          </div>
          <span class="arrow">
            <i class="icon iconfont icongnext"></i>
          </span>
        </router-link>
      </section>
      <section class="profile_info_data border-1px">
        <ul class="info_data_list">
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"> <span>0.00</span>元 </span>
            <span class="info_data_bottom">我的余额</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"> <span>0</span>个 </span>
            <span class="info_data_bottom">我的优惠</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"> <span>0</span>分 </span>
            <span class="info_data_bottom">我的积分</span>
          </a>
        </ul>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 我的订单 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont iconmorder"></i>
          </span>
          <div class="my_order_div">
            <span>我的订单</span>
            <span class="my_order_icon">
              <i class="iconfont icongnext"></i>
            </span>
          </div>
        </a>
        <!-- 积分商城 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont iconmshop"></i>
          </span>
          <div class="my_order_div">
            <span>积分商城</span>
            <span class="my_order_icon">
              <i class="iconfont icongnext"></i>
            </span>
          </div>
        </a>
        <!-- 硅谷外卖会员卡 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont iconmcard"></i>
          </span>
          <div class="my_order_div">
            <span>硅谷外卖会员卡</span>
            <span class="my_order_icon">
              <i class="iconfont icongnext"></i>
            </span>
          </div>
        </a>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 服务中心 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont iconmserver"></i>
          </span>
          <div class="my_order_div">
            <span>服务中心</span>
            <span class="my_order_icon">
              <i class="iconfont icongnext"></i>
            </span>
          </div>
        </a>
      </section>
    </section>

    <section class="profile_my_order border-1px">
      <mt-button
        type="danger"
        style="width:100%;"
        v-if="userInfo._id"
        @click.prevent="loginOut"
      >
        退出登录
      </mt-button>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
  name: 'Mine',
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    loginOut() {
      MessageBox.confirm('确认退出吗?').then(
        // eslint-disable-next-line no-unused-vars
        action => {
          this.$store.dispatch('logout')
        },
        // eslint-disable-next-line no-unused-vars
        action => {
          console.log('取消退出登录')
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/mixins.styl'

.profile
  width 100%
  .profile-number
    margin-top 2.84375rem
    .profile-link
      clearFix()
      position relative
      display block
      background #02a774
      padding 1.25rem .625rem
      .profile_image
        float left
        width 3.75rem
        height 3.75rem
        border-radius 50%
        overflow hidden
        vertical-align top
        .iconguser
          background #e4e4e4
          font-size 3.875rem
      .user-info
        float left
        margin-top .5rem
        margin-left 1rem
        p
          font-weight 700
          font-size 1.125rem
          color #fff
          &.user-info-top
            padding-bottom .5rem
          .user-icon
            display inline-block
            margin-left -.42rem
            margin-right .42rem
            width 1.25rem
            height 1.25rem
            .icongphone
              font-size 1.7rem
              vertical-align text-top
          .icon-mobile-number
            font-size 1rem
            color #fff
      .arrow
        position absolute
        width 1rem
        height 1.5rem
        right .9375rem
        top 40%
        .icongnext
          color #fff
          font-size 1.5rem
  .profile_info_data
    bottom-border-1px(#e4e4e4)
    width 100%
    background #fff
    overflow hidden
    .info_data_list
      clearFix()
      .info_data_link
        float left
        width 33%
        text-align center
        border-right .0625rem solid #f1f1f1
        .info_data_top
          display block
          width 100%
          font-size .875rem
          color #333
          padding .9375rem .3125rem .625rem
          span
            display inline-block
            font-size 1.875rem
            color #f90
            font-weight 700
            line-height 1.875rem
        .info_data_bottom
          display inline-block
          font-size .875rem
          color #666
          font-weight 400
          padding-bottom .625rem
      .info_data_link:nth-of-type(2)
        .info_data_top
          span
            color #ff5f3e
      .info_data_link:nth-of-type(3)
        border 0
        .info_data_top
          span
            color #6ac20b
  .profile_my_order
    top-border-1px(#e4e4e4)
    margin-top .625rem
    background #fff
    .my_order
      display flex
      align-items center
      padding-left .9375rem
      > span
        display flex
        align-items center
        width 1.25rem
        height 1.25rem
        > .iconfont
          margin-left -0.625rem
          font-size 1.875rem
          margin-right 0.625rem
        .iconmorder
          color #02a774
        .iconmshop
          color #ff5f3e
        .iconmcard
          color #f90
        .iconmserver
          color #02a774
      .my_order_div
        width 100%
        border-bottom .0625rem solid #f1f1f1
        padding 1.125rem .625rem 1.125rem
        font-size 1rem
        color #333
        display flex
        justify-content space-between
        span
          display block
        .my_order_icon
          width .625rem
          height .625rem
          .icongnext
            color #bbb
            font-size .625rem
</style>
