const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/playStatsApi": {
        changeOrigin: true,
        target: 'https://cr.is-a.dev',
        pathRewrite: {
          '^/playStatsApi': ''
        }
      },
      "/demo": {
        changeOrigin: true,
        target: 'https://prepan.top/bs_m',
        pathRewrite: {
          '^/demo': ''
        }
      },
    }
  }
})
