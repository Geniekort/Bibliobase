
<template>
  <div>
    <v-text-field         
          :value="value"
          @input="$emit('input', $event)"
          :label="dataAttribute.name" 
          type="number" 
          prepend-inner-icon=""
          @keyup="dirty=true"
          :readonly="disabled"
          />
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import AttributeField from './base.vue';

@Component({

}) 
export default class NumberField  extends AttributeField{


}
</script>

<style lang="scss" scoped>

</style>
