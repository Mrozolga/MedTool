<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Wybierz pacjenta
        </v-card-title>
        <v-list subheader>
          <v-list-tile
            v-for="item in items[0]"
            :key="item"
            avatar
            @click="$router.push({ name: 'patient', params: { pid: item }})"
          >
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-btn color="teal darken-3" dark v-on:click="addpatient">Dodaj</v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import db from '../firebase/init'

  export default {
    name: 'welcomewidnow',
    data () {
      return {
        dialog: true,
        items: []
      }
    },
    methods: {
      addpatient () {
        this.$router.push({name: 'addpatient'})
      },
      returnUser () {
        var array = []
        var usersCollectionRef = db.collection('users')
        usersCollectionRef.where('mail', '==', firebase.auth().currentUser.email).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, ' => ', doc.data())
              array.push(doc.data().patients)
            })
          },
          console.log('Koncze then')
        ).catch(function (error) {
          console.log('Error getting documents: ', error)
        })
        this.items = array
      }
    },
    mounted () {
      console.log('Updateuje')
      this.returnUser()
    }
  }
</script>

<style scoped>

</style>
