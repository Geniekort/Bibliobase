<template>
  <div >
    <div v-if="$apollo.queries.import.loading">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-form @submit.prevent="submitForm" class="py-5">
        <v-row>
          <v-col cols=12 md=4>
            <v-text-field 
              outlined
              v-model="editImport.name" 
              label="Name of import" 
              type="name" 
              prepend-inner-icon="mdi-rename-box"/>
            <v-card class="mb-7 pb-3">
              <v-card-title>Settings</v-card-title>
              <v-card-text class="text-no-wrap" >
                <v-select
                  :items="metaOptions.formats"
                  v-model="editImport.meta.format"
                  label="File format"
                ></v-select>
                <v-select
                  :items="metaOptions.separators"
                  v-model="editImport.meta.columnSeparator"
                  label="Column separator character"
                ></v-select>
                <v-switch
                  v-model="editImport.meta.headers"
                  :label="`File has headers?`"
                ></v-switch>
              </v-card-text>
            </v-card>
            <v-btn          
              class="accent secondary--text mt-5" 
              type="submit"
              :loading="submitting"
            >Save Import</v-btn>
          </v-col>
          <v-col cols=12 md=8 class="">
            <v-card class="mb-7 pb-3" :loading="processingFile">
              <v-card-title>Raw file content</v-card-title>
              <v-card-text class="text-no-wrap" >
                <code class="d-block overflow-auto text-left" style="max-height:300px" v-html="previewRawData" >
                </code>
              </v-card-text>
            </v-card>

            <v-card class="mb-7 pb-3" :loading="processingFile">
              <v-card-title>Parsed records preview</v-card-title>
              <v-card-text class="text-wrap" >
                {{queriedImport.parsedData}}
              </v-card-text>
            </v-card>
            
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
    
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from "vue-property-decorator";
  import _ from "lodash"
  import UpdateMutation from "@/gql/mutations/import/update.gql"
  import ImportQuery from "@/gql/queries/imports/show.gql"
  import { SmartQuery } from 'vue-apollo-decorators';
  import { ImportQueryResult } from '@/gql/queries/imports/ImportQueryResult';
    
  @Component({
  })
  export default class ImportEditForm extends Vue {
    @Prop()
    projectId: number;

    @Prop()
    importId: number;
    submitting = false;
    showingSnackbar = false;
    snackbarText = "...";
    processingFile = false;
    metaOptions = {
      formats: [{text: ".CSV", value: "csv"}],
      separators: [
        { text: "Semicolumn (;)", value: ";" },
        { text: "Comma (,)", value: "," },
        { text: "Tabs (\\t)", value: "\t" },
      ]
    }

    editImport = {
      name: "Loading...",
      rawData: "Loading...",
      meta: {
        format: "",
        columnSeparator: "",
        headers: false,
      },
      createdAt: ""
    }

    get previewRawData(){
      return this.editImport.rawData.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

    submitForm(){
      this.submitting = true     
      this.$apollo.mutate({
          mutation: UpdateMutation,
          variables: {
            id: this.importId,
            parseData: true,
            input: {
              name: this.editImport.name,
              meta: this.editImport.meta
            }            
          } 
        }).then((response: any) => {
          this.submitting = false   
        }).catch((data) => {
          console.error("Could not save import", data)
          this.snackbarText = "Could not save import: " + data
          this.showingSnackbar = true
          this.submitting = false
        }) 
    }

    @SmartQuery<ImportEditForm>({
      query: ImportQuery,
      variables() {
        return {
          id: this.importId
        }
      },
      result(result, key){
        this.editImport.name = result.data.import.name
        this.editImport.rawData = result.data.import.rawData
        this.editImport.meta.format = result.data.import.meta.format
        this.editImport.meta.columnSeparator = result.data.import.meta.columnSeparator
        this.editImport.meta.headers = result.data.import.meta.headers
        
      }
    })
    import: ImportQueryResult;
    

    get queriedImport(){ return this.import || {} }
  }
</script>
