<template>
  <v-content>
    <v-layout row>
      <v-flex xs5 pa-5>
        <v-card>
          <v-toolbar color="teal darken-4" dark>
            <v-toolbar-title class="text-xs-center">Twoi pacjenci</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
            </v-btn>
          </v-toolbar>

          <v-list subheader>
            <v-list-tile
              v-for="item in items"
              :key="item"
              avatar
              @click=""
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'secure',
    data () {
      return {
        items: ['Pacjent1', 'Pacjent2']
      }
    },
    mounted () {
      console.log('uzytkownik' + firebase.auth().currentUser.email)
    }
  }
</script>

<style>
  body {
    font-family: Calibri;
  }
</style>
