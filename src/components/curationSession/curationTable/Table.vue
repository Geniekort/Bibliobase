
<template>
  <div class="table-container elevation-4">
    <div class=" pa-3 rounded-sm table-root">
      <v-row
        class="table-header px-3 py-2 elevation-1"
      >
        <v-col cols=1></v-col>
        <v-col cols=1 v-for="importKey in importDataKeys" :key="importKey" class="text-left">
          <h4>{{importKey}}</h4>
        </v-col>
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
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { ImportRecord } from "@/interfaces/interfaces"
import CurationTableRow from './Row.vue';
import { DataType, CurationMapping } from '@/store/interfaces';

@Component({
  components: {
    CurationTableRow
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

  get importDataKeys(){
    
    return Object.keys(this.curatableRecords[0].data).filter(n => n)
  }

  columnsCount(){
    this.importDataKeys.length
  }
}
</script>

<style lang="scss" scoped>
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
  }
</style>
