import { Module, MutationTree } from "vuex"
import { DataModelState, RootState } from "./interfaces"

const state: DataModelState= ({
  dataModelProjectId: null, 
  dataTypes: []
})

const getters = {}

const actions = {}

const mutations: MutationTree<DataModelState> = {
  

}

const dataModelModule: Module<DataModelState, RootState>= {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default dataModelModule
