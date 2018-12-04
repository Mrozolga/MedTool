<template>
  <div id="app">
    <div v-if="this.$route.name!=='login' && this.$route.name!=='signup'">
      <Navbar :drawer="drawer"></Navbar>
    </div>
    <div v-else>
      <NavbarStart :logPanel="logPanel" :signPanel="signPanel" @sign="signPanelmethod"
                   @log="logPanelmethod" :drawer="drawer"></NavbarStart>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      class="white"
      fixed
      app
      clipped
      disable-resize-watcher
      stateless
    >
      <v-list
        dense
      >
        <template v-for="(item, i) in items">
          <v-list-tile
            :key="i"
            @click="$router.push(item.route)"
          >
            <v-list-tile-action height="110%">
              <v-icon color="primary">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title
                class="navbar"
                ml-4
              >
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-group
          prepend-icon="mdi-plus"
          value="true"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title class="navbar">Add user</v-list-tile-title>
          </v-list-tile>
          <template v-for="(item, i) in user">
            <v-list-tile
              :key="i"
              @click="$router.push(item.route)"
            >
              <v-list-tile-action height="80%">
                <v-icon color="primary" style="position:relative; left:20px;">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  class="navbar"
                >
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
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
        items: [
          {icon: 'mdi-home', text: 'HOME', route: {name: 'Home'}},
          {icon: 'mdi-account-search', text: 'Search', route: {name: 'Search'}},
          {icon: 'mdi-calendar-plus', text: 'Add Event', route: {name: 'AddEvent'}},
          {icon: 'mdi-account-group', text: 'Add Group', route: {name: 'AddGroup'}}
        ],
        drawer: false
      }
    },
    mounted () {
      if (firebase.auth().currentUser.email === null) {
        this.$router.replace({name: 'login'})
      }
    },
    methods: {
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
    }
  }
</script>

<style>
  body {
    font-family: Roboto, serif;
  }
</style>

