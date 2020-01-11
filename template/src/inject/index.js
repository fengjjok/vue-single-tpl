/**
 * inject
 */
import { http } from '@request/http'
import utils from '@utils'
import { directives } from '../utils/directives' /* 导入所有指令 */
export default {
  install: (Vue) => {
    Vue.prototype.$http = http // axios 实例
    Vue.prototype.$_ = utils._ // lodash
    Vue.prototype.$utils = utils.tool // 工具类方法
    Vue.prototype.$md5 = utils.MD5 // md5
    /**
     * 全局指令注册
     * */
    Object.keys(directives).map(t => {
      Vue.directive(t, directives[t])
    })
    /**
     * 全局注册过滤器
     * */
    Object.keys(utils.filters).forEach(key => {
      Vue.filter(key, utils.filters[key])
    })
  }
}
