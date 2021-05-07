
<template>
  <div>
    <v-row>
      <v-col v-for="columnIndex in columnsCount" :key="columnIndex" cols=12 :md="columnsWidth">
        <div v-for="dataAttribute in attributesForColumn(columnIndex - 1)" :key="dataAttribute.id">
          <form-field 
          :curatableRecord="curatableRecord" 
          :dataAttribute="dataAttribute" 
          :curationMapping="curationMapping"
          :disabled="formDisabled"
          ref="formField"
          />
        </div>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols=6 md=4 lg=3
        v-if="formDisabled"
      >
        <v-btn 
          block 
          class="primaryLight" 
          @click="updating = true"          
        >Update curation</v-btn>
      </v-col>
      <v-col cols=6 md=4 lg=3
        v-if="updating"
      >
        <v-btn 
          block 
          class="" 
          @click="updating = false"          
        >Cancel updating</v-btn>
      </v-col>
      <v-col cols=6 md=3 lg=2>
        <v-btn 
          block 
          class="error " 
          @click="createDeleteCurationAction()"
          :disabled="formDisabled"
        >Exclude</v-btn>
      </v-col>
      <v-col cols=6 md=3 lg=2>
        <v-btn 
        block 
        class="primary " 
        @click="createCreateCurationAction()"
        :disabled="formDisabled"
      >Include</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { CurationAction, ImportRecord } from "@/interfaces/interfaces"
import { DataType, CurationMapping } from '@/store/interfaces';
import FormField from './FormField.vue';
import CurateRecordMutation from "@/gql/mutations/curationSessions/curateRecord.gql"
import UpdateCurateRecordMutation from "@/gql/mutations/curationSessions/updateCurateRecord.gql"
import ShowCurationSessionQuery from "@/gql/queries/curationSessions/show.gql"

import _ from 'lodash';


@Component({
  components: {
    FormField
  }
})
export default class CurationForm extends Vue{
  @Prop()
  curatableRecord: ImportRecord;

  @Prop()
  dataType: DataType;

  @Prop()
  curationMapping: CurationMapping;

  @Prop()
  curationSessionId: number;

  get columnsCount(){
    return 3
  }
  
  get columnsWidth(){
    return Math.floor(12/this.columnsCount)
  }

  createdCuration = false
  createdLastCurationAction: CurationAction;

  updating = false

  

  $refs!: {
    formField: Array<FormField>;
  }

  /** 
   * Return all attributes to be displayed in a specific column
   */
  attributesForColumn(columnIndex: number){
    const attributesPerColumn = Math.ceil(this.dataType.dataAttributes.length / this.columnsCount);
    return this.dataType.dataAttributes.slice(columnIndex * attributesPerColumn, (columnIndex + 1) * attributesPerColumn)
  }

  /**
   * Create a Delete curation action
   */
  createDeleteCurationAction() {
    const input: any = {
      curationType: "Delete"
    }

    this.performCurateRecordMutation(input).then(response => {
      this.$emit("curated", 'Delete')
    }).then(errorResponse => {
      console.log(errorResponse);
    })
  }

  /**
   * Create a Create curation action
   */
  createCreateCurationAction() {
    const input: any = {
      curationType: "Create",
      dataObjectData: {}
    }

    const formFields = this.$refs.formField;
    for (const formField of formFields) {
      input.dataObjectData[formField.dataAttribute.id.toString()] = formField.value || undefined
    }

    console.log(input.dataObjectData)
    this.performCurateRecordMutation(input).then(response => {
      this.$emit("curated", 'Create')
    })
    
  }

  performCurateRecordMutation(input: any){
    return new Promise((resolve, reject) => {
      let variables;
      if(this.updating){
        variables = {
          input,
          id: this.lastCurationAction.id
        }
      }else{
        input["curationSessionId"] = this.curationSessionId
        input["importRecordId"] = this.curatableRecord.id
        variables = { input }
      }
 
      this.$apollo.mutate({
        mutation: (this.updating ? UpdateCurateRecordMutation : CurateRecordMutation),
        variables,
        refetchQueries: [{
          query: ShowCurationSessionQuery,
          variables: {id: this.$route.params.curationSessionId}
        }]
      }).then((response) => {
        this.createdCuration = true        
        resolve(response)        
      }).catch((data) => {
        console.log("Failed!", data);
        reject(data)
      }) 
    })
  }

  get formDisabled(){
    return !this.updating && (this.createdCuration || this.curatableRecord.status != '')
  }

  get lastCurationAction(){
    return this.createdLastCurationAction || _.last(this.curatableRecord.curationActions)
  }

}
</script>

<style lang="scss" scoped>

</style>
