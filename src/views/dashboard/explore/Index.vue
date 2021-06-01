<template>
  <v-container fluid>
    <h1 class="mb-5">Explore</h1>
    <v-row>
      <v-col cols=12 md=6 lg=4 v-for="dataType in dataTypes" :key="dataType.id">
        <v-card class="primary" :to="{name: 'explore_show', params: {dataTypeId: dataType.id}}">
          <v-card-text style="height: 300px" class="white--text d-flex justify-center align-center">
            <h2 class="block">Explore {{dataType.name}}</h2>        
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import CurationSessionIndexList from "@/components/curationSession/IndexList.vue"
import DataModelMixin from "@/mixins/DataModel"

@Component({
  components: {
    CurationSessionIndexList
  },
})
export default class ExploreIndex  extends Mixins(DataModelMixin)  {

}
</script>
