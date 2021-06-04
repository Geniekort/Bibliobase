
<template>
  <div>
    <div class="mb-3">
      <h3>Active Filters </h3>
      <span v-if="activeFilters.length == 0">No filters selected</span>
      <div v-else>
        <v-chip 
          class="mode-switcher mr-2" 
          v-for="(activeFilter, index) in activeFilters" :key="index" 
          close
          close-icon="mdi-delete"
          @click:close="deleteFilter(index)"
          >
          {{activeFilter.toString()}}  
        </v-chip>  
      </div>
    </div>

    <div>
      <h3>Add a new Filter </h3>
      <v-row>
        <v-col cols=3>
          <v-select
          :items="filterableAttributesOptions"
          :label="'Attribute of ' + dataType.name"
          v-model="newFilterAttribute"
        ></v-select>
        </v-col>
        <v-col cols=3>
          <v-select
          :items="allowedMatchers"
          label="Match"
          v-model="newFilterMatcher"
          :disabled="allowedMatchers.length == 0"
        ></v-select>
        </v-col>
        <v-col cols=6>
          <v-text-field
            label="Value"
            v-model="newFilterValue"
            :type="newFilterType"
            :disabled="!newFilterMatcher"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="align-items-end justify-end">
        <v-col class="justify-end text-right">
          <v-btn color="primary" @click="addFilter" :disabled="!canAddFilter">Add filter</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script lang="ts">

import { QueryFilterMatcher } from '@/interfaces/interfaces';
import { DataAttribute, DataType } from '@/store/interfaces';
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import QueryFilter from "@/services/queryFilter" 

@Component
export default class QueryGUIForm extends Vue {
  @Prop()
  dataType: DataType;

  activeFilters: Array<QueryFilter> = [];//[new QueryFilter("hoi", QueryFilterMatcher.EXACTLY, "tester")];

  newFilterAttribute: DataAttribute | null = null; 
  newFilterMatcher: QueryFilterMatcher | "" = "";
  newFilterValue: string | number = "";

  queryJoiner: "and" | "or" = "and";

  get allowedMatchers(){
    if(this.newFilterAttribute){
      return QueryFilter.attributeTypeToAllowedMatchers(this.newFilterAttribute?.attributeType).map((matcher) => {
        return {
          "text": matcher.text,
          "value": matcher.name
        }
      })
    }else{
      return []
    }
  }

  get filterableAttributesOptions(){
    return this.dataType.dataAttributes.map(dataAttribute => {
      return {
        "text": dataAttribute.name,
        "value": dataAttribute
      }
    })
  }

  get newFilterType(){
    if(this.newFilterMatcher){
      return QueryFilter.matcherNameToInputType(this.newFilterMatcher)
    }else{
      return "text"
    }
  }

  get activeQuery(){
    return JSON.stringify({
      [this.queryJoiner]: this.activeFilters.map(activeFilter => activeFilter.toQueryObject())
    })
  }

  get canAddFilter(){
    return this.newFilterAttribute && this.newFilterMatcher && this.newFilterValue
  }

  addFilter(){
    if(!this.newFilterAttribute || this.newFilterMatcher == ""){
      return false;
    }

    this.activeFilters.push(new QueryFilter(this.newFilterAttribute.name, this.newFilterMatcher, this.newFilterValue))

    this.$emit("update-query", this.activeQuery)

    this.resetFilterFields()
    
  }

  deleteFilter(filterIndex: number){
    this.$delete(this.activeFilters, filterIndex)
    this.$emit("update-query", this.activeQuery)

  }

  resetFilterFields() {
    this.newFilterAttribute = null;
    this.newFilterMatcher = "";
    this.newFilterValue = "";
  }
}
</script>
