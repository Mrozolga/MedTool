<template>
  <v-container>
    <v-toolbar dark color="teal darken-3">
      <v-toolbar-title>
        Nowy Lek
      </v-toolbar-title>
      <v-spacer>
      </v-spacer>
    </v-toolbar>
    <v-form v-model="valid">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Nazwa"
        required
      ></v-text-field>
      <v-textarea
        v-model="description"
        label="Opis"
      ></v-textarea>
      <v-text-field
        v-model="dose"
        label="Dawkowanie *(bedzie wybor z mini kalendarza albo dropdown lista)*"
        required
      ></v-text-field>
      <v-btn-toggle v-model="toggle_exclusive">
        <!--<v-btn flat>-->
          <!--PON-->
        <!--</v-btn>-->
        <!--<v-btn flat>-->
          <!--WT-->
        <!--</v-btn>-->
        <!--<v-btn flat>-->
          <!--ŚR-->
        <!--</v-btn>-->
        <!--<v-btn flat>-->
          <!--CZW-->
        <!--</v-btn>-->
        <!--<v-btn flat>-->
          <!--PT-->
        <!--</v-btn>-->
        <!--<v-btn flat>-->
          <!--SOB-->
        <!--</v-btn>-->
        <!--<v-btn flat>-->
          <!--NDZ-->
        <!--</v-btn>-->
      </v-btn-toggle>
    </v-form>
    <v-btn color="grey lighten-2" @click="cancel()">Anuluj</v-btn>
    <v-btn color="teal darken-2" @click="addDrToDb()">Zapisz</v-btn>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import db from '../firebase/init'
  import slugify from 'slugify'

  export default {
    name: 'addnewmedicine',
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Nazwa jest wymagana',
      ],
      slug: '',
      user: null,
      description: '',
      dose: '',
      medicineId: ''
    }),
    methods: {
      addDrToDb () {
        this.makeId()
        db.collection('medicines').doc(this.medicineId).set({
          name: this.name,
          description: this.description,
          dose: this.dose
        })
      },
      cancel () {
        this.$router.push({name: 'addmedicines'})
      },
      makeId () {
        this.medicineId = this.name.toLowerCase().replace(/\s/g, '')
      }
    }
  }
</script>

<style scoped>

</style>
