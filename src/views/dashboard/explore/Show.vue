<template>
  <v-container fluid>
    <h1 class="mb-5">Explore {{queriedDataType.name}}s</h1>
    <div class="my-3">
      Query:
      <codemirror v-model="inputQuery" :options="cmOptions" />
      <hr class="mb-3">
      <v-btn @click="updateQuery">Update query</v-btn>
    </div>
    <template v-if="$apollo.queries.executeQuery.loading">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </template>
    <template v-else>
      <smart-table 
        :expandable="false" 
        :rowIcons="false" recordDataPath="data" 
        :records="executeQuery"
        :allowedColumns="dataAttributeIds"  
      >
        <template v-slot:column-header="{columnName}">
          {{dataAttributeName(columnName)}}
        </template>
      </smart-table>
    </template>
    <pre>
      {{executeQuery}}
    </pre>    
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import { PrismEditor } from 'vue-prism-editor';
import * as prism from 'prismjs'
import 'prismjs/components/prism-javascript';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/display/placeholder'
import 'codemirror/theme/material.css'

import { codemirror } from 'vue-codemirror'


import CurationSessionIndexList from "@/components/curationSession/IndexList.vue"
import DataModelMixin from "@/mixins/DataModel"
import ExecuteQuery from "@/gql/queries/explore/executeQuery.gql"
import SmartTable from '@/components/smartTable/SmartTable.vue';

@Component({
  components: {
    CurationSessionIndexList,
    SmartTable,
    PrismEditor,
    codemirror
  },
  apollo: {
    executeQuery: {
      query: ExecuteQuery,
      variables() {
        return {
          dataTypeId: this.queriedDataTypeId,
          queryString: this.activeQuery
        }
      }
    }
  }
})
export default class ExploreShow  extends Mixins(DataModelMixin)  {
  inputQuery="";

  activeQuery="";

  cmOptions={
    theme: "material",
    lineNumbers: true,
    tabSize: 4,
    mode: {name: "javascript"},
    matchBrackets: true,
    autoCloseBrackets: true,
    placeholder: "Enter your query..."
  }

  get queriedDataTypeId(){
    return this.$route.params.dataTypeId
  }

  get queriedDataType(){
    return this.dataTypes?.find(dataType => dataType.id == this.queriedDataTypeId)
  }

  get dataAttributeIds(){
    return this.queriedDataType?.dataAttributes.map(dataAttribute => dataAttribute.id)
  }

  updateQuery(){
    this.activeQuery = this.inputQuery
  }

  dataAttributeName(attributeId: number){
    const dataAttribute = this.queriedDataType?.dataAttributes.find(attribute => attribute.id == attributeId)
    return dataAttribute?.name || ("Invalid attribute (id= " + attributeId + ")")
  }

  highlight(code: string){
    return prism.highlight(code, prism.languages.js, 'js')
  }

}
</script>

<style lang="scss">
.json-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }
</style>
