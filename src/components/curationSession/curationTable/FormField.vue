
<template>
  <div>
    <v-text-field 
      outlined
      v-model="value"
      :label="dataAttribute.name" 
      type="text" 
      prepend-inner-icon=""
      @keyup="dirty=true"
      :disabled="curatableRecord.status != ''"

      />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from "vue-property-decorator";
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

  @Watch('curationMapping', { deep: true} )
  onPropertyChanged(value: CurationMapping, oldValue: CurationMapping){
    if(!this.dirty && this.curatableRecord.status == ""){
      this.setValue(value)
    }
  }

  value = ""

  // Whether this value has been manually changed
  dirty = false

  mounted(){
    this.setValue(this.curationMapping)
  }

  setValue(currentCurationMapping: CurationMapping){
    const matchingImportKey = _.invert(currentCurationMapping)[this.dataAttribute.id];
    if(matchingImportKey){
      this.value = this.curatableRecord.data[matchingImportKey]
    }else{
      this.value = ""
    }
  }




}
</script>

<style lang="scss" scoped>

</style>
