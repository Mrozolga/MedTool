import Router from 'vue-router'
import Vue from 'vue'
import secure from '../view/secure'
import login from '../view/login'
import signup from '../view/signup'
import welcomewindow from '../view/welcomewidnow'
import patient from '../view/patient'
import addpatient from '../view/addpatient'
import adddrug from '../view/adddrug'
import addnewmedicine from '../view/addnewmedicine'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'default',
      component: null
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
      component: welcomewindow,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/patient/:pid',
      name: 'patient',
      props: true,
      component: patient,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addpatient',
      name: 'addpatient',
      component: addpatient,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addmedicines/:pid',
      name: 'addmedicines',
      component: adddrug,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addnewmedicine',
      name: 'addnewmedicine',
      component: addnewmedicine,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

export default router
