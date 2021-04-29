
<template>
  <div>
    {{this.curatableRecords[0].data}}
    <v-row>
      <v-col cols=6 sm=1 md=3 v-for="curatableRecord in curatableRecords" :key="curatableRecord.id">
        <v-card
          elevation="2"
        >
          <v-card-title>{{curatableRecord}}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { ImportRecord } from "@/gql/queries/imports/ImportRecordInterface"

@Component({
  // apollo: { 
  //   projects: Projects
  // }
})
export default class CurationTable extends Vue {
  @Prop()
  curatableRecords: Array<ImportRecord>;


  get importDataKeys(){
    return Object.keys(this.curatableRecords[0].data)
  }
}
</script>
