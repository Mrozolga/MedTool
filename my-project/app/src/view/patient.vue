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
          Pacjent
        </v-card-title>
        <v-container>
          <v-avatar :tile="tile" :size="200" color="grey lighten-4">
            <img src="https://picsum.photos/510/300?random" alt="avatar">
          </v-avatar>
        </v-container>
        <v-container class="text-xs-left">
          <v-list subheader>
            <v-list-tile>
              Imię:
            </v-list-tile>
            <v-list-tile>
              Nazwisko:
            </v-list-tile>
            <v-list-tile>
              Kalendarz wizyt:
              <v-btn v-on:click="calendar">Otwórz</v-btn>
            </v-list-tile>
            <v-list-tile>
              Przyjmowane leki:
            </v-list-tile>
            <v-list-tile
                  v-for="item in items"
                  :key="item"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-html="item"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-container>
                <v-btn color="teal darken-3" dark v-on:click="adddrug">Dodaj lek</v-btn>
              </v-list-container>
          </v-list>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'patient',
    data () {
      return {
        dialog: true,
        items: ['Lek1', 'Lek2', 'Lek3', 'Lek4', 'Lek5']
      }
    },
    methods: {
      adddrug () {
         this.$router.push({name: 'adddrug'})
      },
      calendar () {
         this.$router.push({name: 'calendar'})
      }
    }
  }
</script>

<style scoped>

</style>
