<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          v-bind="attrs"
          v-on="on"
          class="mt-5 mx-3"
          text
        >
          Delete Import
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Are you sure?
        </v-card-title>

        <v-card-text class="my-2">
          Are you sure you want to delete this import?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="dialog = false"
          >
            No, take me away
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="deleteImport"
          >
            Yes, delete import
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from "vue-property-decorator";
  import _ from "lodash"
  import DeleteMutation from "@/gql/mutations/import/delete.gql"

  @Component
  export default class ImportDeleteButton extends Vue {
    @Prop()
    projectId: number;

    @Prop()
    importId: number;

    dialog = false;
    submitting = false;

    /**
     * Submit the form. When succesful, go back to the index page
     */
    deleteImport(){
      
      this.submitting = true     
      
      this.$apollo.mutate({
          mutation: DeleteMutation,
          variables: {
            id: this.importId  
          } 
        }).then((response: any) => {
          this.dialog = false
          this.$router.push({name: "imports_index"})
        }).catch((data) => {
          console.error("Could not delete import", data)
          this.dialog = false
        })
    }
  }
</script>
