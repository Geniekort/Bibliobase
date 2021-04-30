<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h3>Select mapping</h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>
          Please select a mapping from the keys in the import to the attributes of the data type.
        </p>
        <v-row>
          <v-col sm=5>
            <h4>Import key</h4>
          </v-col>
          <v-col sm=7>
            <h4>Select data attribute</h4>
          </v-col>
        </v-row>
        <v-row v-for="importRecordKey in importRecordKeys.filter(k => k)" :key="importRecordKey">
          <v-col sm=5>{{importRecordKey}}</v-col>
          <v-col sm=7 class="py-0">
            <v-select 
              :items="availableDataAttributes(importRecordKey)"
              item-text="name"
              item-value="id"
              dense
              v-model="mapping[importRecordKey]"
              clearable
              @change="updateMapping"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
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

  @Prop()
  initialMapping: {[k: string]: number};

  mapping: {[k: string]: number} = {}


  mounted(){
    this.mapping = this.initialMapping || {}
  }


  // Return all data attributes that are not currently selected as a mapping pair, plus the one that is
  //  currently selected for this importRecordKey
  availableDataAttributes(importRecordKey: string){
    return this.dataAttributes.filter((dataAttribute) => {
      return this.mapping[importRecordKey] == dataAttribute.id || 
        !Object.values(this.mapping).includes(dataAttribute.id)
    })
  }

  updateMapping(){
    this.emitMappingUpdate()

  }

  emitMappingUpdate(){
    this.$emit('curation-mapping-update', this.mapping)
  }
}
</script>
