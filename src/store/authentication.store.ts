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
  /**
   * Initialize the authentication details from localStorage
   * @param state 
   */
  init(state){
    const storedAuth = localStorage.getItem("authentication")
    if(storedAuth && storedAuth !== ""){
      const parsedAuth = JSON.parse(storedAuth)
      state.loggedIn = parsedAuth.loggedIn
      state.accessToken = parsedAuth.accessToken
      state.uid = parsedAuth.uid
      state.client = parsedAuth.client
    }   
  },
  login(state, { accessToken, uid, client }){
    state.loggedIn = true
    state.accessToken = accessToken
    state.uid = uid
    state.client = client
    localStorage.setItem("authentication", JSON.stringify(state))
  },
  logout(state){
    state.loggedIn = false
    state.accessToken = ""
    state.uid = ""
    state.client = ""
    localStorage.setItem("authentication", JSON.stringify(state))
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
