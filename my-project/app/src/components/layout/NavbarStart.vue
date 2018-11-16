<template>
  <div id="nav">
    <v-toolbar color="teal darken-4" dark>
      <v-toolbar-title>MedTool</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-on:click="sign"> Sign Up </v-btn>
        <v-btn flat v-on:click="log"> Log in </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'NavbarStart',
    props: {
      logPanel: Boolean,
      signPanel: Boolean
    },
    methods: {
      sign() {
        this.$emit('sign')
      },
      log() {
        this.$emit('log')
      }
    }
  }
</script>

<style scoped>

</style>
