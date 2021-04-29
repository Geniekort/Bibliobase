<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Curation Session</h1>
      </v-col>
    </v-row>
    <template v-if="$apollo.queries.curationSession.loading">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </template>
    <template v-else>
      <v-row>
        <v-col xs=12 md=6>
          <h1>Welcome to the Curation Session {{ curationSession.id }}</h1>
          <p>Please map the attributes in your import to the attributes in the data model:</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs=12 sm=6 md=4 lg=4>
          <mapping-selector 
            :importRecordKeys="Object.keys(curationSession.curatableRecords[0].data)"
            :dataAttributes="curationSession.dataType.dataAttributes">
          </mapping-selector>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <curation-table :curatableRecords="curationSession.curatableRecords"></curation-table>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import DataModelMixin from "@/mixins/DataModel"
import Show from "@/gql/queries/curationSession/show.gql"
import CurationTable from "@/components/curationSession/CurationTable.vue"    
import MappingSelector from '@/components/curationSession/MappingSelector.vue';


@Component({
  components: {
    CurationTable,
    MappingSelector
  },
  apollo: {
    curationSession: {
      query: Show,
      variables() {
        return {
          id: this.$route.params.curationSessionId
        }
      }
    }
  }
})
export default class CurationSessionShow extends Mixins(DataModelMixin) {
  loading(){
    this.dataModelLoading() || this.$apollo.queries.curationSession.loading
  }


}
</script> 
