import Vue from 'vue'
import Vuex from 'vuex'
import { ModuleTree } from "vuex";

Vue.use(Vuex)

import AuthenticationModule from "./authentication.store"
import { RootState } from './interfaces'

const modules: ModuleTree<RootState> = {
  authentication: AuthenticationModule
}

export default new Vuex.Store({
  modules
})
