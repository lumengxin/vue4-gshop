<template>
  <div id="app">
    <router-view />
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
import FooterGuide from 'components/FooterGuide/FooterGuide'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    FooterGuide
  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  },
  mounted() {
    // this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserInfo()

    this.$store.dispatch('getFoodCategory')
    this.$store.dispatch('getShopList')
    this.$store.dispatch('getShopInfo')
  }
}
</script>

<style lang="stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
