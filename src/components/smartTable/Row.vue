
<template>
  <v-row 
    class="table-row" v-bind:class="{active: expanded}"
    >
    <v-col>
      <v-row @click="expanded = (expandable && !expanded)" 
        class="table-row-summary px-3"
        :class="{clickable: expandable == true}">

        <div style="width:50px;" class="py-3" v-if="expandable">
          <span class="mr-3">
            <v-icon v-if="expanded">fas fa-chevron-down</v-icon>
            <v-icon v-else>fas fa-chevron-up</v-icon>
          </span>
        </div>

        <div style="width:50px;" class="py-3" v-if="rowIcons">
          <slot name="row-icon">
            <span>
              <v-icon>fas fa-spinner</v-icon>
            </span>
          </slot>
        </div>
        <div
          v-for="(recordKey, columnIndex) in visibleColumns" :key="recordKey"
          :style="{width: $parent.columnWidths[columnIndex] + 'px'}"
          class="table-cell text-truncate mx-2 py-3"
          >
          <slot name="cell" :recordKey="recordKey">
            <v-tooltip left max-width=350 open-delay=100 content-class="accent black--text">
              <template v-slot:activator="{on, attrs}">
                <span v-bind="attrs" v-on="on" >{{ getValueForKey(record, recordKey) }}</span>
              </template>
              {{ getValueForKey(record, recordKey) }}
            </v-tooltip>
          </slot>
        </div>
      </v-row>
      <transition name="expand">
        <v-row v-show="expanded" class="table-row-details mb-1">
          <slot name="row-details">
            <pre>No content available...</pre>
          </slot>
        </v-row>
      </transition>
    </v-col>
  </v-row>
</template>
<script lang="ts">

import _ from 'lodash';
import Vue from 'vue';
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class CurationTableRow extends Vue {
  @Prop()
  record: any;

  @Prop()
  visibleColumns: Array<string>;

  /**
   * Whether rows in this table can be expanded to show more information
   */
  @Prop({default: false})
  expandable: boolean

  /**
   * Whether rows in this table have an icon in the first column
   */
  @Prop({default: false})
  rowIcons: boolean

  /**
   * The path in the record where the actual data can be found
   */
  @Prop()
  recordDataPath: string

  expanded = false;

  getValueForKey(record: any, recordKey: any){
    let data = record;
    if(this.recordDataPath){
      data = _.get(record, this.recordDataPath)
    }

    return data[recordKey]
  }
}
</script>

<style lang="scss" scoped>
  .table-row{
    border-top: solid 2px rgba(0,0,0,0.5);
    transition: background-color 0.5s ease;

    &:hover, &.active{
      background: rgba(0,0,0,0.05);
      transition: background-color 0.5s ease;
    }
  }

  .table-row-summary{
    &.clickable{
      cursor: pointer;
    }
  }

  .table-cell{
    overflow: hidden;
    word-wrap: break-word;
    height: 50px;
  }

  .table-row-details{
    overflow: hidden;
    border-top: solid 1px rgba(0,0,0,0.3) !important;

  }

  .expand-enter-active,
  .expand-leave-active {
    transition: all 0.5s ease;
    max-height: 300px;
  }

  .expand-enter,
  .expand-leave-to {
    transition: all 0.5s ease;

    max-height: 0;
    overflow: hidden;
  }

  .original-import-data-list li{
    white-space: wrap;
    word-break: break-all;
  }
</style>
