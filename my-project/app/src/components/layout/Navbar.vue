<template>
  <div id="nav">
    <v-toolbar color="teal darken-4" dark>
      <v-toolbar-title>MedTool</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>{{ login }}</v-btn>
        <v-btn tag="button" v-on:click.native="logout()">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'Navbar',
    props: {
      login: String
    },
    methods: {
      logout () {
        firebase.auth().signOut().then(() =>
          this.$router.replace({name: 'login'}))
      }
    }
  }
</script>

<style scoped>

</style>
