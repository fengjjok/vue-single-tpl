
/** postcss-pxtorem 使用说明
 * 如在元素在设计稿的宽度是400像素，
 * 那么在使用postcss-pxtorem时只需给元素的宽度添加px单位即可自动转换为rem值,
 * 如果此元素不需要转换为rem，则单位写成Px即可
 * 例如：.box {
 *  width: 400px;
 *  height: 400Px;
 * }
 */
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      'rootValue': 75, // 根元素字体大小
      'propList': ['*', '!border-radius'], // 可以从px更改为rem的属性
      // 注意：如果有使用第三方UI如VUX，则需要配置下忽略选择器不转换。
      // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
      'selectorBlackList': ['van-loading__spinner']
    }
  }
}
