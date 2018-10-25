import Router from 'vue-router'
import Vue from 'vue'
import secure from '../view/secure'
import login from '../view/login'
import signup from '../view/signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/secure',
      name: 'secure',
      component: secure
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    }
  ]
})
