<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols=12 sm=12 md=12 lg=12 class="text-center">
        <h1>Complete Import</h1>
        <p>Please complete and check the settings below:</p>
        <import-edit-form :projectId="$route.params.projectId" :importId="$route.params.importId">

        </import-edit-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImportEditForm from "@/components/import/EditForm.vue"

@Component({
  components: {
    ImportEditForm
  },
})
export default class ImportEdit extends Vue {}
</script>
