import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import firebase from 'firebase'
import VueScheduler from 'v-calendar-scheduler';
import 'v-calendar-scheduler/lib/main.css';

Vue.use(Vuetify)
let app = null

Vue.use(VueScheduler, {
  locale: 'pl',
  labels: {
      today: 'Dziś',
      back: 'Poprzedni',
      next: 'Następny',
      month: 'Miesiąc',
      week: 'Tydzień',
      day: 'Dzień',
      all_day: 'Cały dzień'
  },
  timeRange: [6,20],
  availableViews: ['month', 'day'],
  initialDate: new Date(),
  initialView: 'month',
  use12: true,
  showTimeMarker: true,
  eventDisplay: null
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: {App},
      router
    })
  }
})

Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
