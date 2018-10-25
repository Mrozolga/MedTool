<template>
  <div id="app">
    <div v-if="this.$route.name!=='login' && this.$route.name!=='signup'"><Navbar :login="login"></Navbar></div>
    <div v-else><NavbarStart :logPanel="logPanel" :signPanel="signPanel" @sign="signPanelmethod"
                             @log="logPanelmethod"></NavbarStart></div>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from './components/layout/Navbar'
  import NavbarStart from './components/layout/NavbarStart'
  import firebase from 'firebase'

  export default {
    name: 'App',
    components: {NavbarStart, Navbar},
    data () {
      return {
        authenticated: false,
        mockAccount: {
          username: 'cisco',
          password: 'cisco'
        },
        logPanel: true,
        signPanel: false,
        login: firebase.auth().currentUser.email
      }
    },
    mounted () {
      if (firebase.auth().currentUser.email===null) {
        this.$router.replace({name: 'login'})
      }
    },
    methods: {
      logout () {
          firebase.auth().signOut().then(() =>
            this.$router.replace({name: 'login'}))
      },
      signPanelmethod () {
        this.signPanel = true
        this.logPanel = false
        this.$router.replace({name: 'signup'})
      },
      logPanelmethod () {
        this.logPanel = true
        this.signPanel = false
        this.$router.replace({name: 'login'})
      }
    },
    computed: {
      myProps () {
        return {
          login: this.login
        }
      }
    }
  }
</script>

