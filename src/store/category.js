import Category from "../services/Category";

const state = {
  categories: []
};

const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  PUSH_CATEGORY(state, payload) {
    state.categories.push(payload);
  }
};

const actions = {
  async getCategory({ commit }) {
    try {
      const { data } = await Category.get();
      commit("SET_CATEGORIES", data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async createCategoty({ commit }, payload) {
    try {
      const response = await Category.create(payload);
      commit("PUSH_CATEGORY", response);
      return response;
    } catch (e) {
      return Promise.reject(e);
    }
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
