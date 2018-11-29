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
      key: '',
      name: '',
      user: null,
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
      UserKey: ''
    }),
    methods: {
      addToDb () {
          this.slug = slugify(this.login, {
            replacement: '-',
            remove: /[$*@%_+~().!:]/g,
            lower: true
          })
        this.returnUser(this.slug)
        db.collection('patients').doc(this.slug).set({
          name: this.name,
          surname: this.surname,
          date: this.date,
          carer: firebase.auth().currentUser.email,
          login: this.slug,
          rules: []
        })
      },
      returnUser (slug) {
        var usersCollectionRef = db.collection('users')
        usersCollectionRef.where('mail', '==', firebase.auth().currentUser.email).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, ' => ', doc.data())
              usersCollectionRef.doc(doc.id).update({
                patients: firebase.firestore.FieldValue.arrayUnion(slug)
              })
            })
          },
          console.log('Koncze then')
        ).catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      }
    }
  }
</script>

<style scoped>
</style>
