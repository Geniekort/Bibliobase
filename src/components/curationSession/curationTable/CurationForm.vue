
<template>
  <div>
    <v-row>
      <v-col v-for="columnIndex in columnsCount" :key="columnIndex" cols=12 :md="columnsWidth">
        <div v-for="dataAttribute in attributesForColumn(columnIndex - 1)" :key="dataAttribute.id">
          <form-field 
          :curatableRecord="curatableRecord" 
          :dataAttribute="dataAttribute" 
          :curationMapping="curationMapping"
          ref="formField"
          />
        </div>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols=6 md=3 lg=2>
        <v-btn 
          block 
          class="error " 
          @click="createCurationAction('Delete')"
        >Exclude</v-btn>
      </v-col>
      <v-col cols=6 md=3 lg=2>
        <v-btn 
        block 
        class="primary " 
        @click="createCurationAction('create')"
      >Save</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { ImportRecord } from "@/gql/queries/imports/ImportRecordInterface"
import { DataType, CurationMapping } from '@/store/interfaces';
import FormField from './FormField.vue';
import CurateRecordMutation from "@/gql/mutations/curationSessions/curateRecord.gql"


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
   * Create a curation action of a certain curationType (one of [create, Delete])
   */
  createCurationAction(curationType: string){
    if(curationType == 'create'){
      this.createCreateCurationAction();
    }else if(curationType == 'Delete'){
      this.createDeleteCurationAction()
    }
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
      input.dataObjectData[formField.dataAttribute.id.toString()] = formField.value
    }

    console.log(input.dataObjectData)
    // this.performCurateRecordMutation(input).then(response => {
    //   this.$emit("curated", 'Create')
    // })
    
  }

  performCurateRecordMutation(input: any){
    return new Promise((resolve, reject) => {
      input["curationSessionId"] = this.curationSessionId
      input["importRecordId"] = this.curatableRecord.id
  
      this.$apollo.mutate({
        mutation: CurateRecordMutation,
        variables: {
          input: input    
        } 
      }).then((response) => {
        resolve(response)        
      }).catch((data) => {
        console.log("Failed!", data);
        reject(data)
        // console.error("Could not save import", data)
        // this.snackbarText = "Could not save import: " + data
        // this.showingSnackbar = true
        // this.submitting = false
      }) 
    })
  }

}
</script>

<style lang="scss" scoped>

</style>
