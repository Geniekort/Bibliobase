<template>
  <div>
    <v-form @submit.prevent="submitForm" class="py-5">
      <v-text-field 
        outlined
        v-model="newImport.name" 
        label="Name of import" 
        type="name" 
        prepend-inner-icon="mdi-rename-box"/>
      <v-file-input
        accept=".csv"
        label="Select a file"
        outlined
        show-size
        v-model="newImport.file"
        prepend-icon=""
        prepend-inner-icon="mdi-paperclip"
        @change="processFile"
      >
      </v-file-input> 
      <v-card class="mb-7 pb-3" :loading="processingFile">
        <v-card-title>Raw file content</v-card-title>
        <v-card-text class="text-no-wrap" >
          <code class="d-block overflow-auto text-left" style="max-height:300px" v-html="newImport.previewFileContent" >
          </code>
        </v-card-text>
      </v-card>      
      <v-btn          
        class="accent secondary--text mt-5" 
        type="submit"
        :loading="submitting"
      >Start Import</v-btn>
    </v-form>
    <v-snackbar
      color="primary"
      v-model="showingSnackbar" 
      :timeout="5000"
    >
      {{snackbarText}}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import _ from "lodash"
  import CreateMutation from "@/gql/mutations/import/create.gql"
   
  export default Vue.extend({
    name: 'ImportNewForm',
    props: ['projectId'],
    data: () => ({
      snackbarText: "Creating import...",
      showingSnackbar: false,
      submitting: false,
      processingFile: false,
      newImport:{
        name: "",
        file: null as File | null,
        fileContent: "",
        previewFileContent: "No file selected"
      }
    }),
    methods: {
      submitForm(){
        this.submitting = true

        this.$apollo.mutate({
          mutation: CreateMutation,
          variables: {
            input: {
              name: this.newImport.name,
              rawData: this.newImport.fileContent,
              projectId: this.projectId
            }            
          } 
        }).then((response: any) => {
          this.submitting = false   
          this.$router.push({name: "import_edit", params: {importId: response.data.createImport.import.id}})      
        }).catch((data) => {
          this.snackbarText = "Could not save import: " + data
          this.showingSnackbar = true
          this.submitting = false
        })
      },
      processFile(){
        this.processingFile = true
        if(this.newImport.file){
          const file = this.newImport.file

          if(this.newImport.name === ""){
            const fileName = _.upperFirst(_.lowerCase(file.name.split('.').slice(0, -1).join('.'))); 
            this.newImport.name = fileName
          }

          this.readFile(file).then((fileContent) => {
            this.newImport.fileContent = fileContent
            this.newImport.previewFileContent = fileContent.replace(/(?:\r\n|\r|\n)/g, '<br>');
            this.processingFile = false
          })          
        }else{
          this.newImport.fileContent = ""
          this.newImport.previewFileContent = "No file selected"
          this.processingFile = false
        }
      },
      readFile(file: File) {
        return new Promise<string>((resolve, _reject) => {
          const reader = new FileReader()
          reader.readAsText(file)
          reader.onload = () => {
            resolve(reader.result as string)
            this.newImport.fileContent = (reader.result as string).replace(/(?:\r\n|\r|\n)/g, '<br>');
            this.processingFile = false
          }
        })
      }
    }
  })
</script>
