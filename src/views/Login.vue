<template>
  <v-container fill-height>
    <v-row class="align-center justify-center">
      <v-col cols="12" sm="5">
        <v-card class="px-3">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <span>Please login using your email and password.</span>
            <login-form></login-form>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import LoginForm from "@/components/authentication/LoginForm.vue"

@Component({
  components: {
    LoginForm
  },
})
export default class Login extends Vue {}
</script>
