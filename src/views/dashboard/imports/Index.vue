<template>
  <v-container fluid>
    <h1>Welcome to Bibliobase Imports</h1>
    <v-row>
      <v-col cols=12 sm=4>
        <import-index-list :projectId="$route.params.projectId"/>
      </v-col>
    </v-row>
    <v-btn
      :to="{name: 'imports_new'}"
      >
      Create new import
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImportIndexList from "@/components/import/IndexList.vue"

@Component({
  components: {
    ImportIndexList
  },
})
export default class ImportsIndex extends Vue {}
</script>
