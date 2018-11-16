<template>
  <div id="nav">
    <v-toolbar color="teal darken-4" dark>
      <v-toolbar-title>MedTool</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>{{ setUser }}</v-btn>
        <v-btn tag="button" v-on:click.native="logout()">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'Navbar',
    methods: {
      logout () {
        firebase.auth().signOut().then(() =>
          this.$router.replace({name: 'login'}))
      }
    },
    computed:
      {
        setUser () {
          var user = firebase.auth().currentUser
          var name, email
          if (user != null) {
            name = user.displayName
            email = user.email
          }
          console.log(user.email)
          return user.email
        }
      }
  }
</script>

<style scoped>

</style>
