/**
 * 定义本地测试接口，最好与正式接口一致，尽可能减少联调阶段修改的工作量
 */
// 引入mockjs
import Mock from 'mockjs'
// 引入模板函数类
import user from './modules/user'
import apiUrl from '../request/apiUrl'
const { mock } = Mock // Mock函数

// 使用拦截规则拦截命中的请求
/**
 * 匹配到路由即不再请求服务器；
 * 此mock请求不在浏览器Network 中显示，可通过console.log 查看结果数据
 * */
// mock( url, post/get, 返回的数据);

mock(new RegExp(`${apiUrl.get_goods}`), 'get', user.info)
