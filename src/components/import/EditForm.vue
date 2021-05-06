<template>
  <div >
    <div v-if="$apollo.queries.import.loading">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-form @submit.prevent="submitForm" class="py-5" ref="form">
        <v-row>
          <v-col cols=12 sm=5 md=4 lg=3>
            <v-text-field 
              outlined
              v-model="editImport.name" 
              label="Name of import" 
              type="name" 
              prepend-inner-icon="mdi-rename-box"
              :rules="[v => !!v || 'Required']"
              
              />
            <v-card class="mb-7 pb-3">
              <v-card-title>Settings</v-card-title>
              <v-card-text class="text-no-wrap" >
                <v-textarea
                  label="Comments"
                  />
                <v-text-field
                  label="Link to datasheet"
                  value="[To be implemented]"
                  disabled
                  />
                <v-select
                  :items="metaOptions.formats"
                  v-model="editImport.meta.format"
                  label="File format"
                  :required="true"
                  :rules="[v => !!v || 'Required']"
                  @change="preparseData"
                  :disabled="!metaEditable"
                ></v-select>
                <v-select
                  :items="metaOptions.separators"
                  v-model="editImport.meta.columnSeparator"
                  label="Column separator character"
                  :rules="[v => !!v || 'Required']"
                  @change="preparseData"
                  :disabled="!metaEditable"

                ></v-select>
                <v-switch
                  v-model="editImport.meta.headers"
                  :label="`File has headers?`"
                  @change="preparseData"
                  :disabled="!metaEditable"
                ></v-switch>
              </v-card-text>
            </v-card>
            <import-delete-button :importId="importId"
            />
            <v-btn
              color="primary"
              class="mt-5" 
              type="submit"
              :loading="submitting"
            >Save Import</v-btn>
          </v-col>
          <v-col cols=12 sm=7 md=8 lg=9 class="">
            <v-card class="mb-7 pb-3" :loading="processingFile">
              <v-card-title>Raw file content</v-card-title>
              <v-card-text class="text-no-wrap" >
                <code class="d-block overflow-auto text-left" style="max-height:300px" v-html="previewRawData" >
                </code>
              </v-card-text>
            </v-card>

            <v-card class="mb-7 pb-3" :loading="preparsingFile" v-if="previewParsedData && previewParsedData.length > 0">
              <v-card-title>Parsed records preview</v-card-title>
              <v-card-text class="text-wrap" >
                <import-preview-records-table :records="previewParsedData"/>
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
  import PreparseMutation from "@/gql/mutations/import/preparse.gql"
  import ImportQuery from "@/gql/queries/imports/show.gql"
  import { SmartQuery } from 'vue-apollo-decorators';
  import { ImportQueryResult } from "@/interfaces/interfaces"
  import ImportPreviewRecordsTable from "@/components/import/PreviewRecordsTable.vue"    
  import ImportDeleteButton from "@/components/import/DeleteButton.vue"    
  import { VForm } from '@/store/interfaces';

  @Component({
    components: {
      ImportPreviewRecordsTable,
      ImportDeleteButton
    }
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
    preparsingFile = false;
    previewParsedData = null;
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

    get metaEditable(){
      return !this.queriedImport.parsed;
    }

    /**
     * Submit the form. When succesful, go back to the index page
     */
    submitForm(){
      if(!(this.$refs.form as VForm).validate()){
        return false
      }
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
        }).then(() => {
          this.submitting = false
          // Refetch after mutation, for easy update of cache.          
          this.$apollo.queries.import.refetch()
          this.$router.push({name: "imports_index"})
        }).catch((data) => {
          console.error("Could not save import", data)
          this.snackbarText = "Could not save import: " + data
          this.showingSnackbar = true
          this.submitting = false
        }) 
    }

    /**
     * Preparse the data to show effects of meta settings selection
     */
    preparseData(){
      this.preparsingFile = true
      this.$apollo.mutate({
          mutation: PreparseMutation,
          variables: {
            id: this.importId,
            input: {
              meta: this.editImport.meta
            }            
          } 
        }).then((response: any) => {
          this.previewParsedData = response.data.preparseImport.import.parsedData
          this.preparsingFile = false
        }).catch((data) => {
          console.error("Could not preparse import", data)
          this.snackbarText = "Could not preparse import: " + data
          this.showingSnackbar = true
          this.preparsingFile = false
        }) 
    }

    @SmartQuery<ImportEditForm>({
      query: ImportQuery,
      deep: false,
      fetchPolicy: "network-only",
      variables() {
        return {
          id: this.importId
        }
      },
      result(result, key){
        this.editImport.name = result.data.import.name
        this.editImport.rawData = result.data.import.rawData
        if(result.data.import.meta){
          this.editImport.meta.format = result.data.import.meta.format
          this.editImport.meta.columnSeparator = result.data.import.meta.columnSeparator
          this.editImport.meta.headers = result.data.import.meta.headers
        }
        this.previewParsedData = result.data.import.parsedData
        this.$apollo.queries.import.skip = true
      },
    })
    import: ImportQueryResult;
    

    get queriedImport(){ return this.import || {} }
  }
</script>
