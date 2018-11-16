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
            v-for="item in items"
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
  export default {
    name: 'welcomewidnow',
    data () {
      return {
        dialog: true,
        items: ['Pacjent1', 'Pacjent2']
      }
    },
    methods: {
      addpatient () {
          this.$router.push({name: 'addpatient'})
      }
    }
  }
</script>

<style scoped>

</style>
