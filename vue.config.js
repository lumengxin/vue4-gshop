'use strict'

const BASE_URL = process.env.BASE_URL

module.exports = {
  publicPath: BASE_URL,
  assetsDir: 'static',
  // productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      // 匹配所有以'/api'开头的请求路径
      '/api-gshop': {
        // 代理目标的基础路径
        target: 'http://localhost:3001',
        // 支持跨域
        changeOrigin: true,
        // 重写路径：去掉路径中开头的'/api'
        pathRewrite: {
          '^/api-gshop': ''
        }
      }
    }
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
