<template>
  <v-container fluid>
    <h1>Imports</h1>
    <v-row>
      <v-col cols=12 md=6 order=0 order-md="1">
        <h2 class="mb-5">Create a new import:</h2>
        <v-card>
          <v-card-text>
            <imports-new-form :projectId="$route.params.projectId"/>        
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols=12 md=6>
        <h2 class="mb-5">Existing imports:</h2>
        <import-index-list :projectId="$route.params.projectId"/>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImportIndexList from "@/components/import/IndexList.vue"
import ImportsNewForm from "@/components/import/NewForm.vue"


@Component({
  components: {
    ImportsNewForm,
    ImportIndexList
  },
})
export default class ImportsIndex extends Vue {}
</script>
