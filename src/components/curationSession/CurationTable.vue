
<template>
  <div class="table-container elevation-4">
    <div class=" pa-3 rounded-sm table-root">
      <v-row
        class="table-header px-3 py-2 elevation-1"
      >
        <v-col cols=1 v-for="importKey in importDataKeys" :key="importKey" class="text-left">
          <h4>{{importKey}}</h4>
        </v-col>
      </v-row>
      <v-row 
        v-for="curatableRecord in curatableRecords" :key="curatableRecord.id"
        class="table-row px-3"
        >
        <v-col
          v-for="importKey in importDataKeys" :key="importKey"
          cols=1
          class="table-cell"
          >
          {{curatableRecord.data[importKey]}}
        </v-col>
      </v-row>
      <v-row 
        v-for="curatableRecord in curatableRecords" :key="curatableRecord.id"
        class="table-row px-3"
        >
        <v-col
          v-for="importKey in importDataKeys" :key="importKey"
          cols=1
          class="table-cell"
          >
          {{curatableRecord.data[importKey]}}
        </v-col>
      </v-row>
    </div>
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
    min-width: 3000px;
  }

  .table-row{
    border-top: solid 1px rgba(0,0,0,0.3);
    height: 40px;
  }

  .table-header{
    background: white;
    position: sticky;
    top: 0;

  }

  .table-cell{
    overflow: hidden;
    word-wrap: break-word;
    max-height: 100%;
  }
</style>
