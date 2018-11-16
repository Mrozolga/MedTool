import Router from 'vue-router'
import Vue from 'vue'
import secure from '../view/secure'
import login from '../view/login'
import signup from '../view/signup'
import welcomewindow from '../view/welcomewidnow'
import patient from '../view/patient'
import addpatient from '../view/addpatient'
import adddrug from '../view/adddrug'
import calendar from '../view/calendar'

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
    },
    {
      path: '/welcomewindow',
      name: 'welcomewindow',
      component: welcomewindow
    },
    {
      path: '/patient/:pid',
      name: 'patient',
      props: true,
      component: patient
    },
        {
      path: '/addpatient',
      name: 'addpatient',
      component: addpatient
    },
    {
      path: '/adddrug',
      name: 'adddrug',
      component: adddrug
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: calendar
    }
  ]
})
