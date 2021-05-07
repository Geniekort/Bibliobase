
<template>
  <v-text-field         
        :value="value"
        @input="$emit('input', $event)"
        :label="dataAttribute.name" 
        type="text" 
        prepend-inner-icon=""
        @keyup="dirty=true"
        :readonly="disabled"
        />
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import AttributeField from './base.vue';

@Component({

}) 
export default class TextField  extends AttributeField{


}
</script>

<style lang="scss" scoped>

</style>
