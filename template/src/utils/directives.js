/**
 * 自定义指令
 * */
const directives = {
  focus: {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    }
  }
}
export {
  directives
}
