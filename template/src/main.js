{{#if_eq platform "mobile"}}
import 'lib-flexible'
{{/if_eq}}
import Vue from 'vue'
import App from './App.vue'
import router from './router'
{{#if vuex}}
import store from './store'
{{/if}}
import inject from './inject'
import FastClick from 'fastclick'

/**
 * 按需加载vant组件
 */
import { Toast, Loading } from 'vant'
Vue.use(Toast, Loading)

/**
 * 只有开发环境才使用mock数据
 * */
if (process.env.VUE_APP_ENV === 'development') {
  // require('./mock')
}

Vue.use(inject)

/**
 * 消除物理点击和 click 移动浏览器上的事件触发之间的300毫秒延迟
 */
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false

new Vue({
  router,
  {{#if vuex}}
  store,
  {{/if}}
  created () {
    // 此处为神策埋点注册功能
    /** this.$http({
      url: this.$apiUrl.vip_scData,
      success: (res) => {
        console.log('res ===>', res)
        this.$sensors.initSensors(res.res)
      }
    }) */
    this.handleAddListener('load', this.getTimings)
  },
  methods: {
    handleAddListener (type, fn) {
      if (window.addEventListener) {
        window.addEventListener(type, fn)
      } else {
        window.attachEvent('on' + type, fn)
      }
    },
    getTimings () {
      try {
        let perforTiming = performance.timing
        let LoadTime = (perforTiming.loadEventEnd - perforTiming.loadEventStart) / 1000
        if (LoadTime < 0) {
          setTimeout(() => {
            this.getTimings()
          }, 200)
          return
        }
        let DOMContentLoaded = (perforTiming.domContentLoadedEventEnd - perforTiming.domContentLoadedEventStart) / 1000
        let whiteScreen = (perforTiming.responseStart - perforTiming.navigationStart) / 1000
        let url = window.location.href
        if (url.indexOf('?')) {
          url = url.split('?')[0]
        }
        sensors.track('pageLoadTimeFE', {
          'plateform': 'H5',
          'whiteScreen': whiteScreen.toFixed(2),
          'DOMContentLoaded': DOMContentLoaded.toFixed(2),
          'Load': LoadTime.toFixed(2),
          'info': LoadTime.toFixed(2) + 's ->' + url
        })
      } catch (error) {
        console.log(performance.timing)
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
