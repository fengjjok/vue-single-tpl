module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    // ECMAScript 模块
    sourceType: 'module',
    // 想使用的额外的语言特性:
    ecmaFeatures: {
      // 允许在全局作用域下使用 return 语句
      globalReturn: true,
      // impliedStric
      impliedStrict: true,
      // 启用 JSX
      jsx: true
    }
  },
  plugins: [
    'vue'
  ],
  /**
   * 'off'    或 0 - 关闭规则
   * 'warn'   或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * 'error'  或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // console
    'no-console': process.env.VUE_APP_ENV === 'production' ? 1 : 0,
    // alert、confirm 和 prompt
    'no-alert': 1,
    // 使用 node 全局变量 global
    'no-undef': 0,
    // 强制在 function 的左括号之前使用一致的空格
    'space-before-function-paren': [2, 'always'],
    // allow async-await
    'generator-star-spacing': 0,
    'space-in-parens': 2,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
