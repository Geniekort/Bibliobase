
<template>
  <v-row 
    class="table-row" v-bind:class="{active: expanded}"
    >
    <v-col>
      <v-row @click="expanded = !expanded" class="table-row-summary px-3">
        <div style="width:100px;" class="py-3">
          <span class="mr-3">
            <v-icon v-if="expanded">fas fa-chevron-down</v-icon>
            <v-icon v-else>fas fa-chevron-up</v-icon>
          </span>
          <span>
            <v-icon v-if="status=='Delete'" class="error--text">fas fa-trash</v-icon>
            <v-icon v-else-if="status=='Create'" class="primary--text">fas fa-check</v-icon>
            <v-icon v-else>fas fa-spinner</v-icon>
          </span>
        </div>
        <div
          v-for="(importKey, columnIndex) in visibleColumns" :key="importKey"
          :style="{width: $parent.columnWidths[columnIndex] + 'px'}"
          class="table-cell text-truncate mx-2 py-3"
          >
          {{curatableRecord.data[importKey]}}
        </div>
      </v-row>
      <transition name="expand">
        <v-row v-show="expanded" class="table-row-details mb-1">
          <v-col cols=12 md=3>
            <v-card class="primaryLight">
              <v-card-title>Original import data:</v-card-title>
              <v-card-text>
                <ul class="original-import-data-list">
                  <li v-for="(value, name, index) in originalImportdata" :key="index">
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
                  :curatableRecord="curatableRecord" 
                  :dataType="dataType" 
                  :curationMapping="curationMapping" 
                  @curated="handleCuration"
                  :curationSessionId="curationSessionId"
                  />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </transition>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { ImportRecord } from "@/interfaces/interfaces";
import { CurationMapping, DataType } from '@/store/interfaces';
import _ from 'lodash';
import Vue from 'vue';
import { Component, Prop } from "vue-property-decorator";
import CurationForm from './CurationForm.vue';

@Component({
  components: {
    CurationForm
  }
})
export default class CurationTableRow extends Vue {
  @Prop()
  curatableRecord: ImportRecord;

  @Prop()
  visibleColumns: Array<string>;

  @Prop()
  dataType: DataType;
  
  @Prop()
  curationMapping: CurationMapping;

  @Prop()
  curationSessionId: number;

  expanded = false;

  status: string | undefined = '';

  mounted(){
    this.status = this.curatableRecord.status
  }

  get originalImportdata(){
    return _.pickBy(this.curatableRecord.data, _.identity);
  }

  handleCuration(curationType: string){
    this.expanded = false
    this.status = curationType
  }
}
</script>

<style lang="scss" scoped>
  .table-row{
    border-top: solid 2px rgba(0,0,0,0.5);
    transition: background-color 0.5s ease;

    &:hover, &.active{
      background: rgba(0,0,0,0.05);
      transition: background-color 0.5s ease;
    }
  }

  .table-row-summary{
    cursor: pointer;
  }

  .table-cell{
    overflow: hidden;
    word-wrap: break-word;
    height: 40px;
  }

  .table-row-details{
    overflow: hidden;
    border-top: solid 1px rgba(0,0,0,0.3) !important;

  }

  .expand-enter-active,
  .expand-leave-active {
    transition: all 0.5s ease;
    max-height: 300px;
  }

  .expand-enter,
  .expand-leave-to {
    transition: all 0.5s ease;

    max-height: 0;
    overflow: hidden;
  }

  .original-import-data-list li{
    white-space: wrap;
    word-break: break-all;
  }
</style>
