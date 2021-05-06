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
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!item.parsed"
                >
                  <v-icon class="action-icon">mdi-play</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="createCurationSession(item.id, dataType.id)" v-for="dataType in dataTypes" :key="dataType.id">
                  <v-list-item-title>Curate as {{dataType.name}}</v-list-item-title>
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
import { Component, Prop, Mixins } from "vue-property-decorator";
import { SmartQuery } from "vue-apollo-decorators";
import Imports from "@/gql/queries/imports/index.gql"
import {ImportQueryResult}  from "@/interfaces/interfaces"
import CreateCurationSessionMutation from "@/gql/mutations/curationSessions/create.gql"
import DataModelMixin from "@/mixins/DataModel"
@Component
export default class ImportsIndexList  extends Mixins(DataModelMixin) {
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
  // Create a new curation session from an import
  createCurationSession(importId: number, dataTypeId: number){
    console.log("Joojoo");
    console.log(importId);
    CreateCurationSessionMutation
    this.$apollo.mutate({
      mutation: CreateCurationSessionMutation,
      variables: {
        input: {
          projectId: this.projectId,
          importId: importId,
          dataTypeId: dataTypeId
        }            
      } 
    }).then((response) => {
      // Refetch after mutation, for easy update of cache.          
      // this.$apollo.queries.import.refetch()
      this.$router.push(
        {
          name: "curation_session_show", 
          params: { curationSessionId: response.data.createCurationSession.curationSession.id}
        }
      )
      
    }).catch((data) => {
      console.log("Failed!", data);
      // console.error("Could not save import", data)
      // this.snackbarText = "Could not save import: " + data
      // this.showingSnackbar = true
      // this.submitting = false
    }) 
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
