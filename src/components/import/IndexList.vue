
<template>
  <div>
    <template v-unless="$apollo.queries.imports.loading">
      <v-list elevation="3" color="primaryLight">
        <v-list-item 
          three-line 
          v-for="item in sortedImports" 
          :key="item.id"
          :to="{name: 'import_edit', params:{importId: item.id}}"
          >
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>
              Created {{item.createdAt | moment("LLL")}}
            </v-list-item-subtitle>
            
            <v-divider></v-divider>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>
<script lang="ts">

import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { SmartQuery } from "vue-apollo-decorators";
import Imports from "@/gql/queries/imports/index.gql"
import {ImportQueryResult}  from "@/gql/queries/imports/ImportQueryResult"


@Component
export default class ImportsIndexList extends Vue {
  @SmartQuery<ImportsIndexList>({
    query: Imports,
    variables() {
      return {
        projectId: this.projectId
      }
    }
  })
  imports: Array<ImportQueryResult>;

  @Prop()
  projectId!: string

  get sortedImports(){
    return (this.imports || []).sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)
  }
}
</script>
