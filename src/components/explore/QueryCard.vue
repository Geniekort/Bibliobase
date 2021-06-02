<template>
    <div>
      <v-card >
        <v-card-title>
          Advanced Filtering
        </v-card-title>

        <v-card-text>
          <div class="error--text mb-3" v-if="displayErrors.length > 0">
            <b>Errors:</b>
            <ul>
              <li v-for="error in displayErrors" :key="error">{{error}}</li>
            </ul>
          </div>
          <codemirror 
            v-model="inputQuery" 
            :options="cmOptions"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primaryLight" @click="updateQuery">Update query</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from "vue-property-decorator";
  import _ from "lodash"
  import { DataType } from '@/store/interfaces';

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
      codemirror
    }
  })
  export default class ExploreQueryCard extends Vue {
    @Prop()
    dataType: DataType;

    @Prop()
    providedError: string

    parserError = ""

    inputQuery="{\n}"


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

      if(this.providedError){
        errors.push(this.providedError);
      }

      return errors
    }

    /**
     * If the current query is valid, emit it to update the results
     */
    updateQuery(){     
      try{
        JSON.parse(this.inputQuery)
        this.$emit("update-query", this.inputQuery)
      }catch(e) {
        this.parserError = "Invalid json: " + e
      }
    }
  }
</script>
