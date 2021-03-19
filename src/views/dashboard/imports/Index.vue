<template>
  <v-container fluid>
    <h1>Welcome to Bibliobase Imports</h1>
    <v-btn
      :to="{name: 'imports_new'}"
      >
      Create new import
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class ImportsIndex extends Vue {}
</script>
