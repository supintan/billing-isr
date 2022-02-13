import Vue from 'vue'
import Router from 'vue-router'
import Ability from '@/config/Ability'
import CustomNotification from '@/helpers/custom-notification'
import { getToken } from '@/services/UrlConfig'
// import { canNavigate } from '@/config/RouteProtection'
import FetchAbility from '@/services/Ability'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: () => import('@/views/authentication/Error'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/authentication/Login'),
    },
    {
      path: '/error-401',
      name: 'not-authorized',
      component: () => import('@/views/authentication/NotAuthorized'),
    },
    {
      path: '/error-404',
      name: 'not-found',
      component: () => import('@/views/authentication/Error'),
    },
  ],
})

const auth = {
  loggedIn() {
    return localStorage.getItem('accessToken')
  },
}

if (getToken()) {
  FetchAbility
  .getData()
  .then(AbilityData => {
    if (AbilityData) {
      Ability.update(AbilityData)
    } else {
      CustomNotification.notif('warning', 'Hak akses gagal dimuat', 'Disebabkan karena jaringan/session telah berakhir')
      Ability.update([])
    }
  })
}

router.beforeEach((to, from, next) => {
  let authrequired = false
  if (to && to.meta && to.meta.auth) authrequired = true
  // Ubah jika ingin menerapkan CASL di route
  // console.log(to.meta.action, to.meta.resource)
  if (to.meta.resource && to.meta.action && !Ability.can(to.meta.action, to.meta.resource)) {
    console.log('not-authorized')
    next({ name: 'not-authorized' })
    return false
  }

  next()
  if (authrequired) {
    if (auth.loggedIn()) {
      if (to.name === 'login') {
        window.location.href = '/'
        return false
      } else {
        next()
      }
    } else {
      if (to.name !== 'login') {
        window.location.href = '/login'
        return false
      }
      next()
    }
  } else {
    if (auth.loggedIn() && to.name === 'login') {
      window.location.href = '/'
      return false
    } else {
      next()
    }
  }
})

import NProgress from 'nprogress'

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800)
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
