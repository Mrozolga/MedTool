<template>
  <v-app id="signup">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center pt-5>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="teal darken-4">
                <v-toolbar-title>Signup form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field name="login" label="Login" type="text" v-model="login"
                                :error-messages="nameErrors" @input="$v.login.$touch()"
                                @blur="$v.login.$touch()">mdi-account
                  </v-text-field>
                  <v-text-field id="password" name="password" label="Password" type="password"
                                v-model="password" required></v-text-field>
                  <v-text-field id="email" name="email" label="E-mail" type="text"
                                v-model="email" :error-messages="emailErrors" @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-flex>{{ this.feedback }}</v-flex>
                <v-btn color="teal darken-4" dark v-on:click="signup">Signup</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import slugify from 'slugify'
  import db from '../firebase/init'
  import firebase from 'firebase'
  import App from '../App'

  export default {
    mixins: [validationMixin],

    validations: {
      login: {required, maxLength: maxLength(10)},
      email: {required, email}
    },
    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.login.$dirty) return errors
        !this.$v.login.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.login.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },
    name: 'signup',
    data () {
      return {
        login: '',
        password: '',
        email: '',
        slug: '',
        feedback: ''
      }
    },
    methods: {
      signup () {
        if (this.login) {
          this.slug = slugify(this.login, {
              replacement: '-',
              remove: /[$*@%_+~().!:]/g,
              lower: true
            }
          )
        }
        console.log(this.slug)
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          console.log(doc)
          if (doc.exists) {
            this.feedback = 'Taki login już istnieje. Wybierz inny.'
          }
          else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred => {
              ref.set({
                login: this.login,
                user_id: cred.user.uid
              })
            }).then(() =>
              this.feedback = 'Taki jest wolny',
              this.$router.push({name: 'login'})
            )
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
