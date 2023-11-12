<template>
    <div>
    <v-app-bar
        color="primary lighten-2"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
  
        <v-toolbar-title class="custom-title">Ecommerce App</v-toolbar-title>
        
      <v-tabs
        right
        dark
      >
        <v-tab to="/login"  v-if ="!isLoggedIn">Login</v-tab>
        <v-tab to ="/register"  v-if ="!isLoggedIn">Register</v-tab>
        <v-tab @click="logout" v-if="isLoggedIn">Logout</v-tab>
      </v-tabs>
      </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
    </template>
    
    <script>
    import { mapState, mapActions } from 'vuex';
    export default {
      // eslint-disable-next-line vue/multi-word-component-names
      name:'Navbar',
      components:{},
      data: () => ({
        drawer: false,
        group: null,
      }),
      methods: {
      ...mapActions(['logout'])
      },
      computed:{
        ...mapState(['isLoggedIn'])
      }
    };
  
    </script>
    
    <style scoped>
  .custom-title {
    width: 200px; /* Adjust the width as needed */
  }
</style>
   
    