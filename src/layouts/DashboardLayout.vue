<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="mr-5" v-if="$vuetify.breakpoint.mdAndDown" @click="openDrawer = !openDrawer">
        <v-icon>mdi-menu</v-icon>
      </div>
      <div class="d-flex align-center">
        Bibliobase
      </div>

      <v-spacer></v-spacer>
      <logout-button/>
      
    </v-app-bar>

    <v-navigation-drawer
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.mdAndDown"
    v-model="openDrawer"
    app
    mobile-breakpoint="md"
    >
      <v-list>        
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              Bibliobase
            </v-list-item-title>
            <v-list-item-subtitle>{{userEmail}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav        
      >
        <template v-for="(menuItem, index) in menuLinks" >
          <v-divider v-if="menuItem.separator" :key="index" class="my-2"></v-divider>
          <v-list-item 
            links
            :exact="menuItem.exact || false"
            :to="menuItem.link"
            :key="menuItem.title"
          >
            <v-list-item-icon>
              <v-icon>mdi-{{menuItem.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{menuItem.title}}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import LogoutButton from "@/components/authentication/LogoutButton.vue"

export default Vue.extend({
  name: 'DashboardLayout',
  components: {
    LogoutButton
  },
  data: () => ({
    openDrawer: false
  }),
  computed: {
    userEmail(): string{
      return this.$store.state.authentication.uid || "Not logged in, something went wrong."
    },
    menuLinks(): any{
      const hasSelectedProject = this.$route.matched.some(route => route.meta.selectedProject)
      if(hasSelectedProject){
        return this.projectMenuLinks
      }else{
        return this.rootMenuLinks
      }
    },
    rootMenuLinks(): any{
      return [
        {
          title: 'Home',
          icon: 'home',
          link: {name: 'dashboard'},
          exact: true,
          separator: false
        }        
      ]
    },
    projectMenuLinks(): any{
      return [
        {
          title: 'Back to projects',
          icon: 'chevron-left',
          link: {name: 'dashboard'},
          separator: false,
          exact: true,
        },
        {
          title: 'Project Overview',
          icon: 'home',
          link: {name: 'project_show'},
          exact: true,
          separator: false
        },
        {
          title: 'Imports',
          icon: 'upload',
          link: {name: 'imports_index'},
          separator: true
        }
        ,
        {
          title: 'Curation',
          icon: 'shape',
          link: {name: 'curation_sessions_index'},
          separator: false
        }
        ,
        {
          title: 'Exploration',
          icon: 'compass',
          link: '#',
          separator: false
        }
        ,
        {
          title: 'Data model',
          icon: 'vector-triangle',
          link: '#',
          separator: true
        }
      ]
    }
  }
});
</script>

<style>
/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 10px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
