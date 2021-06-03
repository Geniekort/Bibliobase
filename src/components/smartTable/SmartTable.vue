
<template>
  <div class="table-container elevation-4">
    <div class=" pa-3 rounded-sm table-root">
      <v-row
        class="table-header px-3 py-2 elevation-1"
      >
        <div 
          class="header-cell icon-column"
          v-if="rowIcons"
        >
        </div>

        <div 
          class="header-cell icon-column"
          v-if="expandable"
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

          v-for="(recordKey, index) in recordKeys" :key="recordKey"
        >
          <h4>
            <slot 
              name="column-header"
              :columnName="recordKey"
            >
              {{columnHeader(recordKey)}}
            </slot>
          </h4>
        </vue-draggable-resizable>
      </v-row>
      <row 
        :expandable="expandable" 
        :rowIcons="rowIcons"
        :visibleColumns="recordKeys" 
        :record="record"
        :recordDataPath="recordDataPath"
        v-for="record in records" :key="record.id"
      >
        <template v-slot:row-details
          :record="record"
          >
          <slot 
            name="row-details"
            :record="record"
            />
        </template>
        <template v-slot:row-icon>
          <slot 
            name="row-icon"
            :record="record"
            />
        </template>
        <template v-slot:cell="{ recordKey }">
          <slot 
            name="cell"
            :record="record"
            :recordKey="recordKey"
            />
        </template>
      </row>

    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import Row from './Row.vue';
import VueDraggableResizable from 'vue-draggable-resizable'
import _ from 'lodash';

@Component({
  components: {
    Row,
    VueDraggableResizable
  }
})
export default class SmartTable extends Vue {
  @Prop()
  records: Array<any>;

  /**
   * Whether rows in this table can be expanded to show more information
   */
  @Prop({default: false})
  expandable: boolean

  /**
   * Whether rows in this table have an icon in the first column
   */
  @Prop({default: false})
  rowIcons: boolean

  /**
   * The path in the record where the actual data can be found
   */
  @Prop()
  recordDataPath: string

  /**
   * Columns that can be shown
   */
  @Prop()
  allowedColumns: Array<string>

  columnWidths: Array<number> = []

  mounted(){
    this.columnWidths = this.estimateColumnWidths()
  }

  get recordKeys(){    
    if(this.allowedColumns){
      return this.allowedColumns;
    }

    let firstRecordData: any;
    if(this.recordDataPath){
      firstRecordData = _.get(this.records[0], this.recordDataPath)      
    }else{
      firstRecordData = this.records[0]
      
    }
    return Object.keys(firstRecordData).filter(n => n)
  }

  columnsCount(){
    return this.recordKeys.length
  }

  columnHeader(recordKey: string){
    return recordKey
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
        width: 50px !important;
      }
    }
  }

  .handle{
    width: 20px;
    height: 100%;
    border: none;
    background: none;    
    z-index: 9;
    right: -10px;

    &::after{
      display: block;
      width: 2px;
      height: 100%;
      content: "";
      margin: auto;
      background: rgba(0,0,0,0.3);
      border-radius: 10px;
    }

    &.handle-mr{
      top: 0;
      margin-top: 0;
    }
  }
</style>
