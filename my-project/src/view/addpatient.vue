<template>
  <div class="text-xs-center">
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
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="login"
              :rules="nameRules"
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
        <v-btn color="teal darken-2">Zapisz</v-btn>
      </v-card>
     </v-container>
  </div>
</template>

<script>
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
      nameRules: [
        v => !!v || 'Login jest wymagany',
      ],
      date: '',
      dateMask: '##-##-####',
      dateRules: [
        v => !!v || 'Data urodzenia jest wymagana',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail jest wymagany',
        v => /.+@.+/.test(v) || 'E-mail musi być prawidłowy'
      ]
    })
  }
</script>

<style scoped>

</style>
