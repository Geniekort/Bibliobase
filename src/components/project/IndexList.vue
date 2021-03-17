
<template>
  <div>
    <v-row>
      <v-col cols=6 sm=4 md=3 v-for="project in projects" :key="project.id">
        <v-card
          elevation="2"
        >
          <v-card-title>{{project.name}}</v-card-title>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              elevation=2
              @click="$router.push({name: 'project_show', params: {projectId: project.id}})"
            >
              Open
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import Projects from "@/gql/projects/index.gql"

@Component({
  apollo: {
    projects: Projects
  }
})
export default class ProjectIndexList extends Vue {
}
</script>
