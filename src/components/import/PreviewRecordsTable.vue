
<template>
  <div>
    <v-data-table
      :calculate-widths="true"
      :headers="headers"
      :items="records || []"
      item-key="a"
      class="elevation-1"
      dense
    >
    </v-data-table>
  </div>
</template>
<script lang="ts">

import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { SmartQuery } from "vue-apollo-decorators";
import Imports from "@/gql/queries/imports/index.gql"
import {ImportQueryResult}  from "@/gql/queries/imports/ImportQueryResult"


@Component
export default class ImportPreviewRecordsTable extends Vue {
  @Prop()
  records: Array<any>;

  get headers(){
    if(this.records[0]){
      const headers = Object.keys(this.records[0]).map((key) => {
        return {
          text: key,
          value: key,
          width: this.computeColumnWidth(key)
        }
      })
      return headers
    }else{
      return []
    }
  }

  computeColumnWidth(headerKey: string){
    const maxCharacterCount = Math.max(...this.records.map(r => (r[headerKey] || "").length), 0);
    return Math.max(Math.pow(maxCharacterCount, 1.4)/10, 58);
  }

}
</script>
