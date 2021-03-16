<template>
  <div>
    <v-form @submit.prevent="submitForm" class="py-5">
      <v-text-field 
        outlined
        v-model="user.email" 
        label="Email" 
        type="email" 
        prepend-inner-icon="mdi-email"/>
      <v-text-field 
        outlined      
        v-model="user.password" 
        label="Password" 
        type="password" 
        prepend-inner-icon="mdi-lock"/>
      <v-btn 
        block 
        class="accent secondary--text" 
        type="submit"
      >Login!</v-btn>
    </v-form>
    <v-snackbar
      color="primary"
      v-model="loggingIn"
      :timeout="-1"
    >
      {{snackbarText}} 
    </v-snackbar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import LoginMutation from "../gql/login.gql"

  export default Vue.extend({
    name: 'LoginForm',

    data: () => ({
      user: {
        email: "me@davidkortleven.nl",
        password: "Apassa"
      },
      snackbarText: "",
      loggingIn: false
    }),
    methods: {
      submitForm(){
        this.snackbarText = "Logging in..." 
        this.loggingIn = true
        
        this.$apollo.mutate({
          mutation: LoginMutation,
          variables: {
            email: this.user.email,
            password: this.user.password,
          } 
        }).then((response: any) => {
          if(response.data.userLogin){
            this.handleLoginSuccess(response.data.userLogin.credentials)
          }else{
            this.snackbarText = "Could not login, please try again."
            this.loggingIn = true
          }          
        }).catch((data) => {
          this.snackbarText = "Could not login, please try again."
          this.loggingIn = true
        })
        return false
      },
      handleLoginSuccess(creds: any){
        this.$store.commit("authentication/login", {accessToken: creds.accessToken, uid: creds.uid, client: creds.client})
        this.$router.push("dashboard")
      }
    }
  })
</script>
