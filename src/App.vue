<template>
  <v-app>
    <Navbar/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',
  // Add the "data" property as a function that returns an object
  data: () => ({
    // Your data properties go here
  }),
  // You need to register the components you are using in the "components" option
  components: {
  Navbar
  },
};
</script>

<style>
/* Add your component styles here if needed */
</style>
