<template>
     <div id="nav">
      <v-toolbar color="teal darken-4" dark>
        <v-toolbar-title>MedTool</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>{{ login }}</v-btn>
          <router-link to="/login" tag="button" v-on:click.native="logout()">Logout</router-link>
        </v-toolbar-items>
      </v-toolbar>
    </div>
</template>

<script>
  export default {
    name: 'Navbar',
    props: {
      login: String
    }
  }
</script>

<style scoped>

</style>
