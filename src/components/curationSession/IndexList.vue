
<template>
  <div>
    <template v-unless="$apollo.queries.curationSessions.loading">
      <v-list elevation="3" color="">
        <v-list-item 
          three-line 
          offset-y
          v-for="item in sortedCurationSessions" 
          :key="item.id"

          >
          <!-- <v-list-item-icon class="align-self-center">
          </v-list-item-icon> -->
          <v-list-item-content>
            <v-list-item-title>
              Importing <i>{{item.import.name}}</i> as {{item.dataType.name}}</v-list-item-title>
            <v-list-item-subtitle>
              Created {{item.createdAt | moment("LLL")}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="align-self-center">
            <v-btn 
              icon
              color="secondary"
              :to="{name: 'curation_session_show', params:{curationSessionId: item.id}}"

            >
              <v-icon class="action-icon">mdi-cog</v-icon>
            </v-btn>
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
import CurationSessions from "@/gql/queries/curationSessions/index.gql"
import {CurationSessionQueryResult}  from '@/interfaces/interfaces';
import CreateCurationSessionMutation from "@/gql/mutations/curationSessions/create.gql"
import DataModelMixin from "@/mixins/DataModel" 


@Component
export default class CurationSessionsIndexList  extends Mixins(DataModelMixin) {
  @SmartQuery<CurationSessionsIndexList>({
    query: CurationSessions,
    fetchPolicy: "network-only",
    variables() {
      return {
        projectId: this.projectId
      }
    } 
  })
  curationSessions: Array<CurationSessionQueryResult>;

  @Prop()
  projectId!: string

  get sortedCurationSessions(){
    return (this.curationSessions || []).sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)
  }

  // Create a new curation session from an import
  createCurationSession(importId: number, dataTypeId: number){
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
