
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from "vue-property-decorator";
import { DataAttribute, CurationMapping } from '@/store/interfaces';
import _ from 'lodash';

@Component({

})
export default class AttributeField extends Vue{
  @Prop()
  dataAttribute: DataAttribute;

  @Prop()
  disabled: boolean;

  @Prop()
  value: number|string

  // Whether this value has been manually changed
  dirty = false
}
</script>

