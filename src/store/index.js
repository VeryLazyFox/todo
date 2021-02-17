import Vue from "vue";
import Vuex from "vuex";
import task from "./task.js";
import category from "./category.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isFetching: false
  },
  mutations: {
    SET_FETCHING: (state, payload) => {
      state.isFetching = payload;
    }
  },
  actions: {
    startFetching({ commit }) {
      commit("SET_FETCHING", true);
    },
    stopFetching({ commit }) {
      commit("SET_FETCHING", false);
    }
  },
  modules: { task, category }
});
