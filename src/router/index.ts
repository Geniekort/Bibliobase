import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import routes from "./routes";
import store from "../store/index"

Vue.use(VueRouter)

// Make sure the store is initialized (from localstorage) before initializing the router
store.dispatch("initStore")

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requiresAuthentication) && !store.state.authentication.loggedIn){
    next({name: "login"})
  }else{
    next()
  }
})

export default router
