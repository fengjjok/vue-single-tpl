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
  render: h => h(App)
}).$mount('#app')
