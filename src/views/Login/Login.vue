<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="loginIn">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <!-- form默认点击任意按钮会提交表单。prevent禁止默认行为 -->
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone: rightPhone }"
                @click.prevent="getCode"
              >
                {{ countdown ? `已发送(${countdown}s)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  v-if="showPwd"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  v-else
                />
                <div
                  class="switch_button"
                  :class="showPwd ? 'on' : 'off'"
                  @click="showPwd = !showPwd"
                >
                  <div class="switch_circle" :class="{ right: showPwd }"></div>
                  <span class="switch_text">{{ showPwd ? 'abc' : '' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:3000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captchaImg"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <!-- $router.back() -->
      <a href="javascript:" class="go_back" @click="$router.go(-1)">
        <i class="iconfont icongprev"></i>
      </a>
    </div>

    <alert-tip
      :alertText="alertText"
      v-if="showAlert"
      @closeTip="closeTip"
    ></alert-tip>
  </div>
</template>

<script>
import { reqPwdLogin, reqSendCode, reqSmsLogin } from '../../api'

export default {
  name: 'Login',
  data() {
    return {
      // true代表短信登录；false为密码登录
      loginWay: true,
      phone: '',
      countdown: 0,
      showPwd: false,
      pwd: '',
      name: '',
      // 短信验证码
      code: '',
      // 图形验证码
      captcha: '',
      alertText: '',
      showAlert: false
    }
  },
  computed: {
    rightPhone() {
      // /^1[3456789]\d{9}$/
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    async getCode() {
      // 如果当前没有计时 this.countdown === 0
      // 避免已经在倒计时重复点击，使其累加加快速度
      if (!this.countdown) {
        // 启动倒计时
        this.countdown = 30
        const intervalId = setInterval(() => {
          this.countdown--
          if (this.countdown <= 0) {
            // 停止计时
            clearInterval(intervalId)
          }
        }, 1000)

        // 发送ajax请求,获取短信验证码
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          this._showAlert(result.msg)

          if (this.countdown) {
            this.countdown = 0
            clearInterval(this.intervalId)
            this.intervalId = undefined
          }
        }
      }
    },
    async loginIn() {
      let result

      // 预校验
      if (this.loginWay) {
        // 短信登录
        const { rightPhone, phone, code } = this
        if (!rightPhone) {
          // 手机号不正确
          this._showAlert('手机号不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码必须是6为数字
          this._showAlert('验证码必须是6为数字')
          return
        }

        // 发送ajax请求短信登录
        result = await reqSmsLogin({ phone, code })
      } else {
        // 密码登录
        const { name, pwd, captcha } = this
        if (!name) {
          // 用户名必须指定
          this._showAlert('用户名必须指定')
          return
        } else if (!pwd) {
          this._showAlert('密码必须指定')
          return
        } else if (!captcha) {
          this._showAlert('验证码必须指定')
          return
        }

        // 发送ajax请求密码登录
        result = await reqPwdLogin({ name, pwd, captcha })
      }

      if (this.countdown) {
        this.countdown = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }

      // 根据登录请求接口处理
      if (result.code === 0) {
        const userInfo = result.data
        // 将用户信息保存到vuex
        console.log(userInfo)
        this.$store.dispatch('recordUserInfo', userInfo)
        // this.$store.commit('record_user', userInfo)

        this.$router.replace('/mine')
      } else {
        // 登录失败时，自动刷新图片验证码
        this.getCaptcha()
        this._showAlert(result.msg)
      }
    },
    closeTip() {
      this.showAlert = false
      this.alertText = ''
    },
    getCaptcha() {
      // console.log(event)
      // 地址变化才会重新发请求(ajax请求跨域)。 event时登录失败，无法重新触发事件刷新验证码
      // event.target.src = 'http://localhost:3000/captcha?time=' + Date.now()
      this.$refs.captchaImg.src =
        'http://localhost:3000/captcha?time=' + Date.now()
    },
    _showAlert(text) {
      this.showAlert = true
      this.alertText = text
    }
  }
}
</script>

<style lang="stylus" scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(30px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
