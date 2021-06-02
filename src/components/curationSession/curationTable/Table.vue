
<template>
  <div>
    <p>Table:</p>
    <smart-table 
      :records="curatableRecords" 
      :expandable="true"
      :rowIcons="true"
      recordDataPath="data"
    >
      <template v-slot:row-details="{record}">
        <v-col cols=12 md=3>
          <v-card class="primaryLight">
            <v-card-title>Original import data:</v-card-title>
            <v-card-text>
              <ul class="original-import-data-list">
                <li v-for="(value, name, index) in record.data" :key="index">
                  <b>{{name}}:</b> {{value}}
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols=12 md=9>
          <v-card>
            <v-card-title>
              Curate record as {{dataType.name}}: 
            </v-card-title>
            <v-card-text>
              <curation-form 
                :curatableRecord="record" 
                :dataType="dataType" 
                :curationMapping="curationMapping"                   
                :curationSessionId="curationSessionId"
                />
            </v-card-text>
          </v-card>
        </v-col>
      </template>
      <template v-slot:row-icon="{record}">
        <v-icon v-if="record.status=='Delete'" class="error--text">fas fa-trash</v-icon>
        <v-icon v-else-if="record.status=='Create'" class="primary--text">fas fa-check</v-icon>
        <v-icon v-else>fas fa-spinner</v-icon>
      </template>

      <template v-slot:column-header="{columnName}">
        <div v-html="columnHeader(columnName)"></div>
      </template>
      
    </smart-table>
    
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { ImportRecord } from "@/interfaces/interfaces"
import CurationForm from './CurationForm.vue';
import SmartTable from "@/components/smartTable/SmartTable.vue"
import { DataType, CurationMapping } from '@/store/interfaces';
import VueDraggableResizable from 'vue-draggable-resizable'

@Component({
  components: {
    CurationForm,
    VueDraggableResizable,
    SmartTable
  }
})
export default class CurationTable extends Vue {
  @Prop()
  curatableRecords: Array<ImportRecord>;

  @Prop()
  dataType: DataType;

  @Prop()
  curationMapping: CurationMapping;

  @Prop()
  curationSessionId: number;

  columnWidths: Array<number> = []

  mounted(){
    this.columnWidths = this.estimateColumnWidths()
  }

  get importDataKeys(){    
    return Object.keys(this.curatableRecords[0].data).filter(n => n)
  }

  columnsCount(){
    return this.importDataKeys.length
  }

  columnHeader(importKey: string){
    if(this.curationMapping[importKey]){
      return this.dataAttributeName(this.curationMapping[importKey]) + " <i>(" + importKey + ")</i>"
    }else{
      return importKey
    }
  }

  dataAttributeName(dataAttributeId: number){
    return this.dataType.dataAttributes.find(a => a.id == dataAttributeId)?.name
  }

  resizeColumnListener(idx: number, x: number, y: number, width: number, height: number){
    this.columnWidths.splice(idx, 1, width)
    
  }

  getColumnWidth(columnIndex: string){
    return (this.columnWidths || [])[parseInt(columnIndex)]
  }

  estimateColumnWidths(){
    const result = []
    for (let i = 0; i < this.columnsCount(); i++) {
      result.push(100)
    }

    return result
  }
}
</script>
