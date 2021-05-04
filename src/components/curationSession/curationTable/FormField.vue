
<template>
  <div>
    <v-text-field 
      outlined
      v-model="value"
      :label="dataAttribute.name" 
      type="text" 
      prepend-inner-icon=""            
      />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { ImportRecord } from "@/gql/queries/imports/ImportRecordInterface"
import { DataAttribute, CurationMapping } from '@/store/interfaces';
import _ from 'lodash';

@Component({

})
export default class FormField extends Vue{
  @Prop()
  curatableRecord: ImportRecord;

  @Prop()
  dataAttribute: DataAttribute;

  @Prop()
  curationMapping: CurationMapping;

  value = ""

  mounted(){
    this.setInitialValue()
  }

  setInitialValue(){
    const matchingImportKey = _.invert(this.curationMapping)[this.dataAttribute.id];
    if(matchingImportKey){
      this.value = this.curatableRecord.data[matchingImportKey]
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
