// 用export default 暴露出去,供其他vue文件使用
let visitChannel = ''
export default {
  // 初始化神策数据
  initSensors (res) {
    if (res && res.sc) {
      let common = res.sc
      var Uid = res.uid
      var appVer = common.app_ver
      var isPay = common.pay_type
      // var platform = common.platform
      var isPositivePricePay = common.pt_name
      var courseSubject = common.subject
      var verId = common.ver_id
      var membeType = common.member_type
      visitChannel = common.visit_channel
      // 隐藏打印日志
      sensors.para.show_log = true
      sensors.login(Uid)
      sensors.registerPage({ // 事件公共属性
        app_version: appVer,
        versionID: verId,
        // isPay: isPay,
        isPositivePricePay: isPositivePricePay,
        course_subject: courseSubject,
        // member_type: membeType,
        visit_channel: visitChannel
      })
      // 设置用户属性
      sensors.setProfile({
        member_type: membeType, // 会员类型
        ispay: isPay // 是否付费
      })
    }
  },
  // 神策点击事件数据统计
  getSensors (name, options, callback, self) {
    const obj = {
      'visit_channel': visitChannel // 访问平台
    }
    if (sensors && sensors.track) {
      sensors.track(name, Object.assign(obj, options), function () {
        callback && callback(self)
      })
    }
  },
  // 神策页面浏览数据统计（单页面对应对方法，在路由切换的时候调用，放在全剧钩子函数afterEach中调用）
  getSensorsViewSingle (options, callback, self) {
    const obj = {
      'visit_channel': visitChannel // 访问平台
    }
    if (sensors && sensors.quick) {
      sensors.quick('autoTrackSinglePage', Object.assign(obj, options), function () {
        callback && callback(self)
      })
    }
  },
  // 神策页面浏览数据统计（多页面对应对方法，初始化函数中调用就行）
  getSensorsView (options, callback, self) {
    const obj = {
      'visit_channel': visitChannel // 访问平台
    }
    if (sensors && sensors.quick) {
      sensors.quick('autoTrack', Object.assign(obj, options), function () {
        callback && callback(self)
      })
    }
  }

}
