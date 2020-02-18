const path = require('path')
const env = process.env.VUE_APP_ENV
const outputDir = `releases-${env}`
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  outputDir: outputDir,
  publicPath: process.env.VUE_APP_SYS_PUBLICPATH,
  // assetsDir: 'static',
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `@import "@/style/common.scss";`
      }
    }
  },
  chainWebpack: config => {
    // 关闭文件过大时产生的警告
    config.performance.set('hints', false)
    // 设置别名
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@view', path.resolve(__dirname, 'src/views'))
      .set('@assets', path.resolve(__dirname, 'src/assets'))
      .set('@utils', path.resolve(__dirname, 'src/utils'))
      .set('@compon', path.resolve(__dirname, 'src/components'))
      .set('@request', path.resolve(__dirname, 'src/request'))
  },
  // 第三方插件配置
  pluginOptions: {
    vconsole: {
      enable: env !== 'production'
    }
  },
  configureWebpack: config => {
    if (process.env.use_analyzer) {
      return {
        plugins: [
          // 使用包分析工具
          new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: process.env.VUE_CLI_MODERN_BUILD
          })
        ]
      }
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    // https: false,
    hotOnly: true,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      '/api': {
        target: 'https://localhost', // 后台接口域名
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
