
<template>
  <div>
    <v-row>
      <v-col v-for="columnIndex in columnsCount" :key="columnIndex" cols=12 :md="columnsWidth">
        <div v-for="dataAttribute in attributesForColumn(columnIndex - 1)" :key="dataAttribute.id">
          <form-field :curatableRecord="curatableRecord" :dataAttribute="dataAttribute" :curationMapping="curationMapping"/>
        </div>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols=6 md=3 lg=2>
        <v-btn 
          block 
          class="error " 
          type="submit"
        >Exclude</v-btn>
      </v-col>
      <v-col cols=6 md=3 lg=2>
        <v-btn 
        block 
        class="primary " 
        type="submit"
      >Save</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { ImportRecord } from "@/gql/queries/imports/ImportRecordInterface"
import { DataType, CurationMapping } from '@/store/interfaces';
import FormField from './FormField.vue';


@Component({
  components: {
    FormField
  }
})
export default class CurationForm extends Vue{
  @Prop()
  curatableRecord: ImportRecord;

  @Prop()
  dataType: DataType;

  @Prop()
  curationMapping: CurationMapping;

  get columnsCount(){
    return 3
  }
  
  get columnsWidth(){
    return Math.floor(12/this.columnsCount)
  }

  /** 
   * Return all attributes to be displayed in a specific column
   */
  attributesForColumn(columnIndex: number){
    const attributesPerColumn = Math.ceil(this.dataType.dataAttributes.length / this.columnsCount);
    return this.dataType.dataAttributes.slice(columnIndex * attributesPerColumn, (columnIndex + 1) * attributesPerColumn)
  }

  expanded = false;

}
</script>

<style lang="scss" scoped>

</style>
