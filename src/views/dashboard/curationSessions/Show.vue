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
        </v-col>
      </v-row>
      <v-row>
        <v-col xs=12 sm=6 md=4 lg=4>
          <mapping-selector 
            :importRecordKeys="Object.keys(curationSession.curatableRecords[0].data)"
            :dataAttributes="curationSession.dataType.dataAttributes"
            :initialMapping="curationSession.mapping"
            @curation-mapping-update="updateCurationMapping"
            >
          </mapping-selector>
        </v-col>
      </v-row>
      <v-row><v-col><v-divider></v-divider></v-col></v-row>
      <v-row>
        <v-col>
          <curation-table 
            :curatableRecords="curationSession.curatableRecords" 
            :dataType="curationSession.dataType"
            :curationMapping="curationMapping"  
          ></curation-table>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import DataModelMixin from "@/mixins/DataModel"
import Show from "@/gql/queries/curationSessions/show.gql"
import CurationTable from "@/components/curationSession/curationTable/Table.vue"    
import MappingSelector from '@/components/curationSession/MappingSelector.vue';
import UpdateCurationSessionMutation from "@/gql/mutations/curationSessions/update.gql"
import { CurationMapping } from '@/store/interfaces';


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
      },
      result(response){{
        this.curationMapping = response.data.curationSession.mapping
      }}
    }
  }
})
export default class CurationSessionShow extends Mixins(DataModelMixin) {

  curationMapping: CurationMapping = {}

  get curationSessionId(){
    return this.$route.params.curationSessionId;
  }

  loading(){
    this.dataModelLoading() || this.$apollo.queries.curationSession.loading
  }

  updateCurationMapping(newMapping: any){
    this.curationMapping = newMapping


    this.$apollo.mutate({
      mutation: UpdateCurationSessionMutation,
      variables: {
        id: this.curationSessionId,
        input: {
          mapping: this.curationMapping
        }            
      } 
    }).then((response) => {
      // Refetch after mutation, for easy update of cache.          
      console.log("Updated mapping", response);
      
      
    }).catch((data) => {
      console.log("Failed to update mapping!", data);
      // console.error("Could not save import", data)
      // this.snackbarText = "Could not save import: " + data
      // this.showingSnackbar = true
      // this.submitting = false
    }) 
  }


}
</script> 
