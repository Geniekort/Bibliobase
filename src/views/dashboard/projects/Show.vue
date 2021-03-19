<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Project</h1>
      </v-col>
    </v-row>
    <template v-if="$apollo.queries.project.loading">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </template>
    <template v-else>
      <v-row>
        <v-col>
          Welcome to the project {{ project.name }}
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Show from "@/gql/queries/projects/show.gql"

@Component({
  components: {
  },
  apollo: {
    project: {
      query: Show,
      variables() {
        return {
          id: this.$route.params.projectId
        }
      }
    }
  }
})
export default class ProjectShow extends Vue {}
</script>
