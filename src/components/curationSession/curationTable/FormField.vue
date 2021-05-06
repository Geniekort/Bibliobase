
<template>
  <div>
    <component 
      :is="fieldComponent"
      :disabled="disabled"
      :dataAttribute="dataAttribute"
      v-model="value"
      />
  </div>
</template>
<script lang="ts">
import { ImportRecord } from "@/interfaces/interfaces";
import { CurationMapping, DataAttribute } from '@/store/interfaces';
import _ from 'lodash';
import Vue from 'vue';
import { Component, Prop, Watch } from "vue-property-decorator";
import ReferenceField from "@/components/data/attribute/reference.vue"
import TextField from "@/components/data/attribute/text.vue";

@Component({
  components:{
    ReferenceField
  }
})
export default class FormField extends Vue{
  @Prop()
  curatableRecord: ImportRecord;

  @Prop()
  dataAttribute: DataAttribute;

  @Prop()
  disabled: boolean;

  @Prop()
  curationMapping: CurationMapping;

  @Watch('curationMapping', { deep: true} )
  onPropertyChanged(value: CurationMapping){
    if(!this.dirty && this.curatableRecord.status == ""){
      this.setValue(value)
    }
  }

  get createdDataObject(){
    const curationActions = this.curatableRecord.curationActions
    const lastCurationAction = curationActions[curationActions.length - 1]
    if(lastCurationAction){
      return lastCurationAction.createdDataObject
    }
    return null
  }

  value = ""

  // Whether this value has been manually changed
  dirty = false

  mounted(){
    this.setValue(this.curationMapping)
  }

  get fieldComponent(){
    switch (this.dataAttribute.attributeType) {
      case "Reference":
        return  ReferenceField
      default:
        return TextField;
    }
  }

  setValue(currentCurationMapping: CurationMapping){
    if(this.createdDataObject){
      this.value = this.createdDataObject.data[this.dataAttribute.id]
    }else{
      const matchingImportKey = _.invert(currentCurationMapping)[this.dataAttribute.id];
      if(matchingImportKey){
        this.value = this.curatableRecord.data[matchingImportKey]
      }else{
        this.value = ""
      }

    }
  }

}
</script>

<style lang="scss" scoped>

</style>
