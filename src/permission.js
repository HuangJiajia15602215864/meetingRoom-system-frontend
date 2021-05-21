import router from './router'
import {
  constantRoutes,
  asyncRoutes
} from './router'
import store from './store'
import {
  getToken
} from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/pcLogin', '/mobileLogin', '/pcRegister', '/404']

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()

  if (hasToken) { // 已登录
    if (to.path === '/pcLogin' || to.path === '/mobileLogin') { // 访问登录页，则直接跳转到预订页
      next({
        path: store.getters.device === 'desktop'?'/pcBook':'/mobileBook'
      })
    } else if (from.path === '/pcLogin') { // 来自登录页，根据管理员和普通用户的差别控制路由
      if (store.getters.role === 1) {
        router.options.routes = constantRoutes
        router.options.routes = constantRoutes.concat(asyncRoutes)
        router.addRoutes(asyncRoutes)
      } else {
        router.options.routes = constantRoutes
      }
      next()
    }else {// 普通情况
      next()
    }
  } else { // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if(store.getters.device == 'desktop'){
        next(`/pcLogin?redirect=${to.path}`)
      }else{
        next(`/mobileLogin?redirect=${to.path}`)
      }
    }
  }
})