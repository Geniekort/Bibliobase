<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        Bibliobase
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="#"
        target="_blank"
        text
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
    permanent
    expand-on-hover
    app
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              Sandra Adams
            </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav        
      >
        <template v-for="(menuItem, index) in menuLinks" >
          <v-divider v-if="menuItem.separator" :key="index"></v-divider>
          <v-list-item 
            link
            exact
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

const menuLinks = [
  {
    title: 'Home',
    icon: 'home',
    link: {name: 'dashboard'},
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
    title: 'Categorization',
    icon: 'shape',
    link: '#',
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

export default Vue.extend({
  name: 'DashboardLayout',
  data: () => ({
    menuLinks: menuLinks
  }),
});
</script>
