<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Welcome to Bibliobase</h1>
        <p>Please select a project to work on:</p>

      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <project-index-list/>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectIndexList from "@/components/project/IndexList.vue"

@Component({
  components: {
    ProjectIndexList
  },
})
export default class DashboardHome extends Vue {}
</script>
