
/**
 * 路由页面配置
 *
 * meta 标签配置
 * @param {String} title 网站标题
 * @param {String} requireAuth 是否需要登录
 *
 */
import NetworkClose from '@view/networkClose'
const Home = () => import(/* webpackChunkName: "home" */ '@view/home')
const About = () => import(/* webpackChunkName: "home" */ '@view/about')

const routes = [
  {
    path: '/networkClose',
    name: 'NetworkClose',
    meta: 14,
    component: NetworkClose
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
      requireAuth: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
      requireAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: 'about',
      requireAuth: false
    }
  }
]

export default routes
