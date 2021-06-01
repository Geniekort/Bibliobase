<template>
  <v-container fluid>
    <h1 class="mb-5">Explore {{queriedDataType.name}}s</h1>
    <div class="my-3">
      <v-textarea v-model="inputQuery" placeholder="Enter a query"/>
      <v-btn @click="updateQuery">Update query</v-btn>
    </div>
    <template v-if="$apollo.queries.executeQuery.loading">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </template>
    <template v-else>
      <smart-table 
        :expandable="false" 
        :rowIcons="false" recordDataPath="data" 
        :records="executeQuery"
        :allowedColumns="dataAttributeIds"  
      >
        <template v-slot:column-header="{columnName}">
          {{dataAttributeName(columnName)}}
        </template>
      </smart-table>
    </template>
    <pre>
      {{executeQuery}}
    </pre>    
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import CurationSessionIndexList from "@/components/curationSession/IndexList.vue"
import DataModelMixin from "@/mixins/DataModel"
import ExecuteQuery from "@/gql/queries/explore/executeQuery.gql"
import SmartTable from '@/components/smartTable/SmartTable.vue';


@Component({
  components: {
    CurationSessionIndexList,
    SmartTable
  },
  apollo: {
    executeQuery: {
      query: ExecuteQuery,
      variables() {
        return {
          dataTypeId: this.queriedDataTypeId,
          queryString: this.activeQuery
        }
      }
    }
  }
})
export default class ExploreShow  extends Mixins(DataModelMixin)  {
  inputQuery="";

  activeQuery="";

  get queriedDataTypeId(){
    return this.$route.params.dataTypeId
  }

  get queriedDataType(){
    return this.dataTypes?.find(dataType => dataType.id == this.queriedDataTypeId)
  }

  get dataAttributeIds(){
    return this.queriedDataType?.dataAttributes.map(dataAttribute => dataAttribute.id)
  }

  updateQuery(){
    this.activeQuery = this.inputQuery
  }

  dataAttributeName(attributeId: number){
    const dataAttribute = this.queriedDataType?.dataAttributes.find(attribute => attribute.id == attributeId)
    return dataAttribute?.name || ("Invalid attribute (id= " + attributeId + ")")
  }

}
</script>
