import Vue from 'vue'
import Vuex from 'vuex'
import { ModuleTree } from "vuex";

Vue.use(Vuex)

import AuthenticationModule from "./authentication.store"
import DataModelModule from "./dataModel.store"
import { RootState } from './interfaces'

const modules: ModuleTree<RootState> = {
  authentication: AuthenticationModule,
  dataModel: DataModelModule
}

export default new Vuex.Store({
  actions: {
    initStore(context){
      console.log("Initializing");
      context.commit("authentication/init")
    }
  },
  modules
})
