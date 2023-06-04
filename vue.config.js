const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/playStatsApi": {
        changeOrigin: true,
        target: 'https://api.brawlstars.com',
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
      "/prepan": {
        changeOrigin: true,
        target: 'https://prepan.top',
        pathRewrite: {
          '^/prepan': ''
        }
      },
      "/ucloud": {
        changeOrigin: true,
        target: 'http://117.50.197.50:8081',
        pathRewrite: {
          '^/ucloud': ''
        }
      }
    }
  }
})
