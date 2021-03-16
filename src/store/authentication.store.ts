import { Module, MutationTree } from "vuex"
import { AuthenticationState, RootState } from "./interfaces"

const state: AuthenticationState= ({
  loggedIn: false,
  uid: "",
  accessToken: "",
  client: ""
})

const getters = {}

const actions = {}

const mutations: MutationTree<AuthenticationState> = {
  login(state: AuthenticationState, { accessToken, uid, client }){
    state.loggedIn = true
    state.accessToken = accessToken
    state.uid = uid
    state.client = client
  }
}

const authenticationModule: Module<AuthenticationState, RootState>= {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default authenticationModule
