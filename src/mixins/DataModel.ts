import { Component, Vue } from 'vue-property-decorator';
import DataModelQuery from "@/gql/queries/dataModel/DataModel.gql"
import { DataType } from "@/store/interfaces"
import { SmartQuery } from 'vue-apollo-decorators';

@Component({
})
export default class DataModel extends Vue {
  @SmartQuery<DataModel>({
    query: DataModelQuery,
    variables() {
      return {
        projectId: this.$route.params.projectId
      }
    }
  })
  dataTypes: Array<DataType>;

  dataModelLoading(){
    return this.$apollo.queries.dataTypes.loading
  }
}
