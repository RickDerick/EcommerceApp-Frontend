import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/router.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
  getters: {
    getter: (state) => (value) => {
      return state[value];
    },
  },
  mutations: {
    mutate: (state, payload) => {
      state[payload.state] = payload.value;
    },
  },
  actions: {
    login: ({ commit }) => {
      commit('mutate', { state: 'isLoggedIn', value: true });
    },
    logout: ({ commit, dispatch }) => {
      commit('mutate', { state: 'isLoggedIn', value: false });
      dispatch('navigateTologin');
    },
    navigateTologin() {
      router.push({ name: 'Login' });
    },
  },
});

export default store;
