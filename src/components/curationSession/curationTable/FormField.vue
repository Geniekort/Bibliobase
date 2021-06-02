
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
import NumberField from "@/components/data/attribute/number.vue";
import {parseNumber, parseReference, parseText} from "@/services/dataModelHelpers"

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
        return  ReferenceField;
      case "Number": 
        return NumberField;
      default:
        return TextField;
    }
  }

  setValue(currentCurationMapping: CurationMapping){
    let newValue = "";
    if(this.createdDataObject){
      newValue = this.createdDataObject.data[this.dataAttribute.id]
    }else{
      const matchingImportKey = _.invert(currentCurationMapping)[this.dataAttribute.id];
      if(matchingImportKey){
        newValue = this.curatableRecord.data[matchingImportKey]
      }
    }
    
    this.value = this.parseValue(newValue);
  }

  parseValue(value: any){
    switch (this.dataAttribute.attributeType) {
      case "Text":
        return parseText(value);
      case "Number":
        debugger
        return parseNumber(value);
      case "Reference":
        return parseReference(value);
      default:
        return value
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
