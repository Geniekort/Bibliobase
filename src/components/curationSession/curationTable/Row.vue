
<template>
  <v-row 
    class="table-row" v-bind:class="{active: expanded}"
    >
    <v-col>
      <v-row @click="expanded = !expanded" class="table-row-summary px-3" >
        <v-col cols=1 style="width:20px;">
          <v-icon v-if="expanded">fas fa-chevron-down</v-icon>
          <v-icon v-else>fas fa-chevron-up</v-icon>
        </v-col>
        <v-col
          v-for="importKey in visibleColumns" :key="importKey"
          cols=1
          class="table-cell"
          >
          {{curatableRecord.data[importKey]}}
        </v-col>
      </v-row>
      <transition name="expand">
        <v-row v-show="expanded" class="table-row-details mb-1">
          <v-col>
            <h3 class="mb-5">Curate record:</h3>
            <curation-form :curatableRecord="curatableRecord" :dataType="dataType" :curationMapping="curationMapping" />
          </v-col>
        </v-row>
      </transition>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { ImportRecord } from "@/gql/queries/imports/ImportRecordInterface"
import CurationForm from './CurationForm.vue';
import { DataType, CurationMapping } from '@/store/interfaces';

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
  
  expanded = false;


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
    max-height: 150px;
  }

  .expand-enter,
  .expand-leave-to {
    transition: all 0.5s ease;

    max-height: 0;
    overflow: hidden;
  }
</style>
