<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols=12 sm=12 md=8 lg=6 class="text-center">
        <h1>Create a new import</h1>
        <import-new-form :projectId="$route.params.projectId">

        </import-new-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImportNewForm from "@/components/import/NewForm.vue"

@Component({
  components: {
    ImportNewForm
  },
})
export default class ImportsNew extends Vue {}
</script>
