
<template>
  <div>
    <p>Table:</p>
    <smart-table 
      :records="curatableRecords" 
      :expandable="true"
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
        {{columnName}}
      </template>
      
    </smart-table>
    <hr/>
    <p>Table2:</p>
    <div class="table-container elevation-4">
      <div class=" pa-3 rounded-sm table-root">
        <v-row
          class="table-header px-3 py-2 elevation-1"
        >
          <div 
            class="header-cell icon-column"
          >
          </div>

          <vue-draggable-resizable 
            class="header-cell text-left mx-2 pr-4 align-center"
            :draggable="false"
            :min-width="75"
            :max-width="300"
            :h="'auto'"
            :w="getColumnWidth(index)"
            :handles="['mr']"
            :active="true"
            :preventDeactivation="true"
            @resizing="(...args) => resizeColumnListener(index, ...args)"

            v-for="(importKey, index) in importDataKeys" :key="importKey"
          >
            <h4 v-html="columnHeader(importKey)"></h4>
          </vue-draggable-resizable>
        </v-row>
        <curation-table-row 
          :curatableRecord="curatableRecord" 
          :visibleColumns="importDataKeys"
          :dataType="dataType"
          :curationMapping="curationMapping"
          :curationSessionId="curationSessionId"
          v-for="curatableRecord in curatableRecords" :key="curatableRecord.id"
          />
      </div>
    </div>
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

<style lang="scss">
  .table-container{
    max-width: 100%;
    max-height: 90vh;
    overflow: auto;
    position: relative;
  }

  .table-root{
    min-width: 1000;
  }

  .table-header{
    background: white;
    position: sticky;
    top: 0;
    z-index: 4;

    .header-cell{
      border: none;
      height: auto !important;
      position: relative;
      word-break:break-all;
      vertical-align: center;
      display: flex;

      &.icon-column{
        width: 100px;
      }
    }
  }

  .handle{
    width: 20px;
    height: 55%;
    border: none;
    background: none;    
    z-index: 9;
    right: -10px;

    &::after{
      display: block;
      width: 3px;
      height: 100%;
      content: "";
      margin: auto;
      background: rgba(0,0,0,0.3);
      border-radius: 10px;
    }

    &.handle-mr{
      top: 22.5%;
      margin-top: 0;
    }
  }
</style>
