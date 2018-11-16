<template>
  <v-container>
    <v-toolbar dark color="teal darken-3">
      <v-toolbar-title>
        Nowy Pacjent
      </v-toolbar-title>
      <v-spacer>
      </v-spacer>
    </v-toolbar>
    <v-form v-model="valid">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Imię"
        required
      ></v-text-field>
      <v-text-field
        v-model="surname"
        :rules="surnameRules"
        label="Nazwisko"
        required
      ></v-text-field>
      <v-text-field
        v-model="login"
        :rules="loginRules"
        label="Login"
        required
      ></v-text-field>
      <v-text-field
        v-model="date"
        label="Data urodzenia"
        :mask="dateMask"
        :rules="dateRules"
        required
      ></v-text-field>
    </v-form>
    <v-btn color="grey lighten-2">Anuluj</v-btn>
    <v-btn color="teal darken-2" @click="addToDb()">Zapisz</v-btn>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import db from '../firebase/init'
  import slugify from 'slugify'

  export default {
    name: 'addpatient',
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Imię jest wymagane',
      ],
      surname: '',
      surnameRules: [
        v => !!v || 'Nazwisko jest wymagane',
      ],
      login: '',
      loginRules: [
        v => !!v || 'Login jest wymagany',
      ],
      date: '',
      dateMask: '##-##-####',
      dateRules: [
        v => !!v || 'Data urodzenia jest wymagana',
      ],
      slug: '',
      user: null
    }),
    methods: {
      addToDb () {
        this.slug = slugify(this.login, {
          replacement: '-',
          remove: /[$*@%_+~().!:]/g,
          lower: true
        })
        db.collection('patients').doc(this.slug).set({
          name: this.name,
          surname: this.surname,
          date: this.date,
          carer: firebase.auth().currentUser.email,
          login: this.slug
        }),
          db.collection('users').doc('olga').update({
            patients: this.slug
          })
      }
    }
  }
</script>

<style scoped>
</style>
