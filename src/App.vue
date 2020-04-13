<template>
  <div id="app">
    <router-view />
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
import FooterGuide from 'components/FooterGuide/FooterGuide'

export default {
  name: 'App',
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
