import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    /**
     * 路由拦截鉴权
     * */
    if (to.meta.title) document.title = to.meta.title // 动态设置title
    next()
  } else {
    next()
  }
})
export default router
