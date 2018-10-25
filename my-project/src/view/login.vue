<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center pt-5>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="teal darken-4">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field name="login" label="Login" type="text" v-model="username">mdi-account
                  </v-text-field>
                  <v-text-field id="password" name="password" label="Password" type="password"
                                v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal darken-4" dark v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<!--<template>-->
<!--<div id="login">-->
<!--<h1>Login</h1>-->
<!--<input type="text" name="username" v-model="input.username" placeholder="Username" />-->
<!--<input type="password" name="password" v-model="input.password" placeholder="Password" />-->
<!--<button type="button" v-on:click="login()">Login</button>-->
<!--</div>-->
<!--</template>-->

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        if (this.username != '' && this.password != '') {
          firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(cred =>
            console.log(cred.user))
          this.$router.push({name: 'welcomewindow'})
        }
      }
    }
  }
</script>
