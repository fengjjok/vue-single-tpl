/**
 * 定义常用工具方法
 * _开头方法为局部方法，不对外暴露
 * */
import MD5 from 'md5'

/**
 * 模拟 sort 排序 (解决 Safari 下 sort 的 BUG)
 * @param  {Array}   array 需要排序的数组
 * @param  {Function} fn   排序函数
 * @return {Array}         返回排序后的数组
 */
const _sort = (array, fn) => {
  for (let i = 0; i < array.length - 1; i++) {
    let isSorted = true
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (fn(array[j], array[j + 1]) > 0) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        isSorted = false
      }
    }
    if (isSorted) {
      return false
    }
  }
}

const tool = {
  /**
   * 请求参数加密
   * 规则自行调整
   */
  signGenerate: function (res) {
    let objs = this.paramSort(res)
    let strs = ''
    for (let i = 0; i < objs.length; i++) {
      strs += objs[i][0] + '' + ((objs[i][1] === null || objs[i][1] === undefined) ? '' : objs[i][1])
    }
    strs = MD5(process.env.VUE_APP_API_APPSECRET + strs + process.env.VUE_APP_API_APPSECRET).toLowerCase()
    return strs
  },
  paramSort: function (res) {
    let str = []
    // 将对象转成数组
    for (let i in res) {
      str.push([i, res[i]])
    }
    // 对数组进行排序
    _sort(str, function (a, b) {
      return a[0] > b[0]
    })
    return str
  },
  /**
   * 判断ios 手机
   */
  isIOS: function () {
    let isIphone = navigator.userAgent.includes('iPhone')
    let isIpad = navigator.userAgent.includes('iPad')
    return isIphone || isIpad
  },
  /**
   * 获取url 参数
   */
  getUrlParam: function (name, url = window.location.href) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    let searchCan = url.split('?')[1]
    let r = searchCan ? searchCan.substr(0).match(reg) : null // 匹配目标参数
    if (r != null) return decodeURIComponent(r[2]); return null // 返回参数值
  },
  /**
   * 判断微信环境
   */
  isWechatEnv: function () {
    const ua = window.navigator.userAgent.toLowerCase()
    return ua.indexOf('micromessenger') !== -1
  },
  /**
   * 跳转页面不记录URL
   */
  urlReplace: function (uri) {
    let href = uri
    if (href && /^#|javasc/.test(href) === false) {
      if (history.replaceState) {
        history.replaceState(null, document.title, href.split('#')[0] + '#')
        location.replace('')
      } else {
        location.replace(href)
      }
    }
  }
}

export {
  tool
}
