<template>
  <v-card>
    <v-card-title>Select mapping</v-card-title>
    <v-card-text>
      Current mapping: {{mapping}}
      <hr>
      {{availableDataAttributes}}
      <v-row v-for="importRecordKey in importRecordKeys.filter(k => k)" :key="importRecordKey">
        <v-col sm=5>{{importRecordKey}}</v-col>
        <v-col sm=7 class="py-0">
          <v-select 
            :items="availableDataAttributes"
            item-text="name"
            item-value="id"
            dense
            v-model="mapping[importRecordKey]"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { DataAttribute } from '@/store/interfaces';
import _ from 'lodash';
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";

@Component
export default class MappingSelector extends Vue {
  @Prop()
  importRecordKeys: Array<string>;

  @Prop()
  dataAttributes: Array<DataAttribute>;

  mapping = {}

  // Return all data attributes that are not currently selected as a mapping pair.
  get availableDataAttributes(){
    return this.dataAttributes.filter((dataAttribute) => !Object.values(this.mapping).includes(dataAttribute.id))
  }
}
</script>
