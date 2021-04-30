<template>
  <v-container fluid>
    <h1>Curation Sessions</h1>
    <v-row>
      <v-col cols=12 md=6>
        <h2 class="mb-5">Active Curation Sessions:</h2>
        <curation-session-index-list :projectId="$route.params.projectId"/>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CurationSessionIndexList from "@/components/curationSession/IndexList.vue"


@Component({
  components: {
    CurationSessionIndexList
  },
})
export default class CurationSessionsIndex extends Vue {}
</script>
