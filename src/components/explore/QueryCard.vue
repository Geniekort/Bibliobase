<template>
    <div>
      <v-card >
        <v-card-title>
          Advanced Filtering
          <v-chip class="mode-switcher" @click="switchInterfaceMode">
            <span >
              <span v-show="interfaceMode=='gui'">
                <v-icon>fas fa-th-list</v-icon> (Switch to DSL editor)
              </span>
              <span v-show="interfaceMode=='dslEditor'">
                <v-icon>fas fa-code</v-icon> (Switch to GUI)              
              </span>
            </span>
          </v-chip>
        </v-card-title>

        <v-card-text>
          <div class="error--text mb-3" v-if="displayErrors.length > 0">
            <b>Errors:</b>
            <ul>
              <li v-for="error in displayErrors" :key="error">{{error}}</li>
            </ul>
          </div>
          <div class="gui" v-show="interfaceMode=='gui'">
            <query-gui-form @updateQuery="updateQueryFromGui" />
          </div>
          <div class="dsl-editor" v-show="interfaceMode=='dslEditor'">
            <codemirror 
              v-model="inputQuery" 
              :options="cmOptions"
            />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="updateQuery">Filter</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from "vue-property-decorator";
  import _ from "lodash"
  import { DataType } from '@/store/interfaces';
  import QueryGuiForm from "@/components/explore/QueryGUIForm.vue"

import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/theme/material.css'


import { codemirror } from 'vue-codemirror'

  @Component({
    components: {
      codemirror,
      QueryGuiForm
    }
  })
  export default class ExploreQueryCard extends Vue {
    @Prop()
    dataType: DataType;

    @Prop()
    gqlError: string

    parserError = ""

    interfaceMode: "gui"|"dslEditor" = "gui"

    inputQuery="{\n\t\"exactly\": {\n\t\t\"title\": \"My title\"\n\t}\n}"


    cmOptions={
      theme: "material",
      lineNumbers: true,
      tabSize: 4,
      mode: "application/json",
      matchBrackets: true,
      autoCloseBrackets: true,
      placeholder: "Enter your query...",
      gutters: ["CodeMirror-lint-markers"],
      lint: true,
      extraKeys: {
        "Ctrl-Enter": (cm: any) =>{
          this.updateQuery()          
        }
      }
    }

    get displayErrors(){
      const errors: Array<string> = [] 
      if(this.parserError){
        errors.push(this.parserError);
      }

      if(this.gqlError){
        errors.push(this.gqlError);
      }

      return errors
    }

    /**
     * If the current query is valid, emit it to update the results
     */
    updateQuery(){     
      this.parserError = ""
      try{
        JSON.parse(this.inputQuery)
        this.$emit("update-query", this.inputQuery)
      }catch(e) {
        this.parserError = "Invalid json: " + e
      }
    }

    switchInterfaceMode(){
      if(this.interfaceMode == 'gui' ){
        this.interfaceMode = 'dslEditor'
      }else{
        this.interfaceMode = 'gui'        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mode-switcher{
    font-style: italic;
    font-size: 14px;
    margin-left: 10px;
    user-select: none;

    .v-icon{
      font-size: 19px;
    }
  }

</style>
