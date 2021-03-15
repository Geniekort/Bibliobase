<template>
  <div>
    <v-form class="py-5">
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
        @click.prevent="submitForm"  
      >Login!</v-btn>
    </v-form>
    <v-snackbar
      color="primary"
      v-model="loggingIn"
    >
      Logging in... {{user.email}}, {{user.password}}     
    </v-snackbar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'LoginForm',

    data: () => ({
      user: {

      },
      loggingIn: false
    }),
    methods: {
      submitForm(){
        this.loggingIn = true
        return false
      }
    }
  })
</script>
