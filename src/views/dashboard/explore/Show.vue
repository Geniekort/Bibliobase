<template>
  <v-container fluid>
    <template v-if="$apollo.queries.dataTypes.loading">     
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </template>
    <template v-else>

      <h1 class="mb-5" >Explore {{queriedDataType.name}}s</h1>
      <div class="my-3">
        <explore-query-card :dataType="queriedDataType" @update-query="updateQuery"/>
      </div>

      <template v-if="$apollo.queries.executeQuery.loading">     
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </template>
      <smart-table 
        :expandable="false" 
        :rowIcons="false" recordDataPath="data" 
        :records="executeQuery"
        :allowedColumns="dataAttributeIds"  
        v-else
      >
        <template v-slot:column-header="{columnName}">
          {{dataAttributeName(columnName)}}
        </template>
      </smart-table>
      <pre>
        {{executeQuery}}
      </pre>    
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';


import CurationSessionIndexList from "@/components/curationSession/IndexList.vue"
import DataModelMixin from "@/mixins/DataModel"
import ExecuteQuery from "@/gql/queries/explore/executeQuery.gql"
import SmartTable from '@/components/smartTable/SmartTable.vue';
import ExploreQueryCard from "@/components/explore/QueryCard.vue"

@Component({
  components: {
    CurationSessionIndexList,
    SmartTable,
    ExploreQueryCard
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

  updateQuery(newQuery: string){
    this.activeQuery = newQuery
  }

  dataAttributeName(attributeId: number){
    const dataAttribute = this.queriedDataType?.dataAttributes.find(attribute => attribute.id == attributeId)
    return dataAttribute?.name || ("Invalid attribute (id= " + attributeId + ")")
  }

}
</script>

<style lang="scss">
.json-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }
</style>
