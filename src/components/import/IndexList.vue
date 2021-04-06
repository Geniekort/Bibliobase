
<template>
  <div>
    <template v-unless="$apollo.queries.imports.loading">
      <v-list elevation="3" color="">
        <v-list-item 
          three-line 
          offset-y
          v-for="item in sortedImports" 
          :key="item.id"

          >
          <v-list-item-icon class="align-self-center">
            <v-tooltip right>
              <template v-slot:activator="{on, attrs}">
                <v-icon v-bind="attrs" v-on="on" v-if="item.parsed" v-text="'mdi-check'" class="import-status-icon primary--text"></v-icon>
                <v-icon v-bind="attrs" v-on="on" v-else v-text="'mdi-progress-wrench'" class="import-status-icon red--text"></v-icon>
              </template>
              <span  v-if="item.parsed">Finished importing</span>
              <span  v-else>Needs to be finished</span>
            </v-tooltip>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>
              Created {{item.createdAt | moment("LLL")}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="align-self-center">
            <v-btn 
              icon
              color="secondary"
              dark
              :to="{name: 'import_edit', params:{importId: item.id}}"

            >
              <v-icon class="action-icon">mdi-cog</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action class="align-self-center">
            <v-menu
              top
              close-on-click
              offset-x
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                  icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon class="action-icon">mdi-play</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title>Curate as Manifestiations</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Curate as Manifestiations</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>        
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
    fetchPolicy: "network-only",
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

<style scoped>
  .import-status-icon{
    font-size: 37px;
  }

  .action-icon{
    font-size: 32px !important;
  }
</style>
