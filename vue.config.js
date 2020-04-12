'use strict'

module.exports = {
  // productionSourceMap: false,
  devServer: {
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        api: '@/api',
        assets: '@/assets',
        components: '@/components',
        views: '@/views',
        stylus: '@/assets/stylus'
      }
    }
  }
}