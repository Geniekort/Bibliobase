
<template>
  <div>
    <v-list elevation="3">
      <v-list-item three-line v-for="item in imports" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{item.name}}</v-list-item-title>
          <v-list-item-subtitle>
            Created at: {{item.createdAt}}
          </v-list-item-subtitle>
          
        </v-list-item-content>
      </v-list-item>
    </v-list>
    {{imports}}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import Imports from "@/gql/queries/imports/index.gql"

@Component({
  apollo: {
    imports: {
      query: Imports,
      variables() {
        return {
          projectId: this.projectId
        }
      }
    }
  },
  props: ["projectId"]
})
export default class ImportsIndexList extends Vue {
}
</script>
