
<template>
  <div>
    <div class="mb-3">
      <h3>Active Filters </h3>
      <span v-if="activeFilters.length == 0">No filters selected</span>
    </div>

    <div>
      <h3>Add a new Filter </h3>
      <v-row>
        <v-col cols=3>
          <v-select
          :items="[1,2,3]"
          label="Attribute of Work"
        ></v-select>
        </v-col>
        <v-col cols=3>
          <v-select
          :items="[1,2,3]"
          label="Match"
        ></v-select>
        </v-col>
        <v-col cols=6>
          <v-text-field
            label="Value"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script lang="ts">

import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";


@Component
export default class QueryGUIForm extends Vue {
  activeFilters = []


}
</script>
