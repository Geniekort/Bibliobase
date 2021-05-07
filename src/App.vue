<template>
  <div class="fill-height">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default Vue.extend({
  name: 'App',
  data: () => ({
  }),
});
</script>
