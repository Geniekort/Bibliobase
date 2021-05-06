
<template>
  <div class="mt-n2">
    <label>{{dataAttribute.name}}</label>
    <v-input>
      <div class="d-flex justify-space-between" style="width:100%;">
        <div class="align-self-center">
          {{displayValue}}
        </div>
        <div>
          <v-dialog
            v-model="dialog"
            max-width="800"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn              
                v-bind="attrs"
                v-on="on"
                :disabled="disabled"
              >
                Select {{referredDataType.name}}
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline primary white--text">
                Select a {{referredDataType.name}}
              </v-card-title>

              <v-card-text class="py-4">
                <v-row>
                  <v-col cols=12 md=8>
                    <v-list>
                      <template
                        v-for="dataObject in dataObjectsForDataType" 
                      >
                        <v-list-item 
                          @click="selectWork(dataObject.id)"
                          :key="dataObject.id">
                          <v-list-item-content>{{dataObject.data}}</v-list-item-content>
                        </v-list-item>
                        <v-divider :key="'divider'+dataObject.id"></v-divider>

                      </template>
                    </v-list>

                  </v-col>
                  <v-col cols=12 md=4>

                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  text
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-input>
    </div>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import AttributeField from './base.vue'; 
import DataModelMixin from "@/mixins/DataModel"
import { DataObject } from "@/interfaces/interfaces";
import { SmartQuery } from "vue-apollo-decorators";
import DataObjectsQuery from "@/gql/queries/dataObjects/index.gql"

@Component({

}) 
export default class ReferenceField  extends Mixins(DataModelMixin, AttributeField){
  @SmartQuery<ReferenceField>({
    query: DataObjectsQuery,
    variables() {
      return {
        dataTypeId: this.referredDataType.id
      }
    }
  })
  dataObjectsForDataType: Array<DataObject>;

  dialog = false

  selectWork(dataObjectId: string){
    this.value = parseInt(dataObjectId)
    this.$emit('input', this.value)
    this.dialog = false 
  }

  get referredDataType(){
    return this.dataTypes.find((dataType) => {
      return dataType.id == this.dataAttribute.validationDefinition.referredDataType.condition.id.toString()
    }) || {id: 0}
  }

  get displayValue(){
    return this.value || ("No " + this.dataAttribute.name + " selected...")
  }

}
</script>

<style lang="scss" scoped>

</style>
