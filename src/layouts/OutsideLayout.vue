<template>
  <v-app>
    <v-main class="secondary">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'OutsideLayout',
  data: () => ({
  }),
});
</script>
