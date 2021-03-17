
<template>
  <v-btn
    @click="logout"
    text
  >
    <v-icon>mdi-logout</v-icon>
  </v-btn>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";

@Component
export default class LogoutButton extends Vue {
  logout(){
    this.$store.commit("authentication/logout")
    this.$router.push({name: "login"})
  }

}
</script>
