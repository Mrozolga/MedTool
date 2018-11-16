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
          Leki
        </v-card-title>
        <v-list-tile
            v-for="item in items"
            :key="item"
            avatar
        >
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="item"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-btn color="teal darken-3" dark v-on:click="adddrugtobase">Dodaj nowy lek</v-btn>
        </v-list-tile>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'adddrug',
    data () {
      return {
        dialog: true,
        items: ['AAC', 'Danazol', 'Halset', 'Ibum']
      }
    },
    methods: {
      adddrugtobase () {
         this.$router.push({name: 'adddrugtobase'})
      }
    }
  }
</script>

<style scoped>

</style>
