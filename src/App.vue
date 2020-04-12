<template>
  <div id="app">
    <router-view />
    <footer-guide></footer-guide>
  </div>
</template>

<script>
import FooterGuide from 'components/common/FooterGuide'

export default {
  name: 'App',
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus">
#app
  background pink
</style>
