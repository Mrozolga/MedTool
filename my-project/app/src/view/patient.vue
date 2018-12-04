<template>
  <v-container elevation-2>
    <v-layout row>
      <v-flex xs4 pt-4>
        <v-avatar :tile="tile" :size="200" color="grey lighten-4">
          <img src="https://picsum.photos/510/300?random" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-container class="text-xs-left">
        <v-list subheader>
          <v-list-tile>
            <v-flex xs2 display-1 font-weight-regular pt-3>
              Imię:
            </v-flex>
            <v-flex xs1 display-1 font-weight-light pt-3>
              {{ this.patient.name }}
            </v-flex>
          </v-list-tile>
          <v-list-tile>
            <v-flex xs3 display-1 font-weight-regular pt-3>
              Nazwisko:
            </v-flex>
            <v-flex xs1 display-1 font-weight-light pt-3 pl-2>{{ this.patient.surname }}
            </v-flex>
          </v-list-tile>
          <v-list-tile>
            <v-flex xs5 display-1 font-weight-regular pt-3>
              Kalendarz wizyt:
            </v-flex>
            <v-flex pt-3>
              <v-btn v-on:click="calendar">Otwórz</v-btn>
            </v-flex>
          </v-list-tile>
        </v-list>
      </v-container>
      <v-flex pt-2 pl-5>
        <v-list-container>
          <v-btn color="teal darken-3" dark v-on:click="adddrug">Dodaj lek</v-btn>
        </v-list-container>
      </v-flex>
    </v-layout>
    <v-layout pt-5>
      <v-list-tile>
        <v-flex xs4 display-1 font-weight-regular pt-5>
          Przyjmowane leki:
        </v-flex>
      </v-list-tile>
    </v-layout>
    <v-layout row>
      <v-layout column pt-5>
        <v-flex pt-5 xs2>
          <v-list-tile
            v-for="item in this.rules"
            :key="item.medicine"
            @click="openWindow(item.medicine)"
          >
            <v-list-tile-content>
              <v-flex heading font-weight-light pl-3 xs3>
                <v-list-tile-title v-html="item.medicineName"></v-list-tile-title>
              </v-flex>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
      </v-layout>
      <v-layout pt-5>
        <v-flex v-if="this.show" pa-5 xs9 elevation-3>
          <v-layout row pl-2>
            <v-flex headline font-weight-regular xs3>Nazwa:</v-flex>
            <v-flex headline font-weight-light xs2 pl-2>{{ showElement.medicineName }}</v-flex>
          </v-layout>
          <v-layout row pl-2>
            <v-flex headline font-weight-regular xs3>Dni:</v-flex>
            <v-flex headline font-weight-light xs2 pl-2>{{ showElement.days.toString() }}</v-flex>
          </v-layout>
          <v-layout row pl-2>
            <v-flex headline font-weight-regular xs3>Godziny:</v-flex>
            <v-flex headline font-weight-light xs2 pl-2>{{ showElement.hours.toString() }}</v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import db from '../firebase/init'

  export default {
    name: 'patient',
    props: {
      pid: {
        type: String
      }
    },
    data () {
      return {
        dialog: true,
        drugs: ['Lek1', 'Lek2', 'Lek3', 'Lek4', 'Lek5'],
        patient: [],
        rules: [],
        showElement: null,
        show: false
      }
    },
    methods: {
      adddrug () {
        this.$router.push({name: 'addmedicines', params: {pid: this.pid}})
      },
      calendar () {
        this.$router.push({name: 'calendar'})
      },
      openWindow (medicine) {
        var tmp = this.showElement
        this.showElement = this.rules.find(el => el.medicine === medicine)
        if (tmp.medicine !== this.showElement.medicine) {
          this.show = true
        } else {
          this.show = !this.show
        }
      }
    },
    computed: {
      getPatient () {
        return db.collection('patients').doc(this.pid).get().then(doc => {
          if (doc) {
            var data = doc.data()
            this.patient = data
            for (var i = 0; i < this.patient.rules.length; i++) {
              console.log(this.patient.rules.length)
              console.log(this.patient.rules[i])
              db.collection('rules').doc(this.patient.rules[i]).get().then(doc => {
                if (doc) {
                  var data = doc.data()
                  this.rules.push(data)
                } else {
                  console.log('No document exists')
                }
              }).catch(error => { console.log('Error: ' + error) })
            }
          } else {
            console.log('No document exists')
          }
        }).catch(error => { console.log('Error: ' + error) })
      }
    },
    mounted () {
      this.getPatient()
    }
  }
</script>

<style scoped>

</style>
