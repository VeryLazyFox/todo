import Task from "../services/Task";
import {
  filterTasksByCategory,
  filterTasksByMessage,
  sortTasksByGroup,
  sortTasksByName,
  sortTasksAsc,
  sortTasksDesc
} from "../helpers/todo";

const state = {
  taskList: [],
  sortByList: ["Default", "Name", "ASC", "DESC"],
  category: "",
  searchQuery: "",
  sortBy: ""
};

const mutations = {
  SET_TASKS_LIST(state, payload) {
    state.taskList = payload;
  },
  PUSH_TASK(state, payload) {
    state.taskList.push(payload);
  },
  UPDATE_TASK(state, payload) {
    state.taskList = state.taskList.map(item =>
      item.id === payload.id ? payload : item
    );
  },
  DELETE_TASK(state, payload) {
    state.taskList = state.taskList.filter(item => item.id !== payload);
  },
  SET_CATEGORY(state, payload) {
    state.category = payload;
  },
  SET_SEARCH_QUERY(state, payload) {
    state.searchQuery = payload;
  },
  SET_SORT_BY(state, payload) {
    state.sortBy = payload;
  }
};

const actions = {
  async getTasks({ commit }) {
    try {
      const { data } = await Task.get();
      commit("SET_TASKS_LIST", data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async createTask({ commit }, payload) {
    try {
      const { data } = await Task.create(payload);
      commit("PUSH_TASK", data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async updateTask({ commit }, payload) {
    try {
      const { data } = await Task.update(payload);
      commit("UPDATE_TASK", data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async completeAllTasks({ commit }, payload) {
    try {
      const apiArray = payload.map(element =>
        Task.update({ ...element, completed: true })
      );
      await Promise.all(apiArray).then(val => {
        val.forEach(({ data }) => {
          commit("UPDATE_TASK", data);
        });
      });
    } catch (e) {
      console.log(e);
    }
  },
  async deleteTask({ commit }, payload) {
    try {
      await Task.delete(payload);
      commit("DELETE_TASK", payload);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  setCategoryFilter({ commit }, payload) {
    commit("SET_CATEGORY", payload);
  },
  setSearchQuery({ commit }, payload) {
    commit("SET_SEARCH_QUERY", payload);
  },
  setSortBy({ commit }, payload) {
    commit("SET_SORT_BY", payload);
  }
};

const getters = {
  sortCategoryList: state => {
    return [
      ...new Set(state.taskList.map(element => element.categoryArray).flat())
    ];
  },
  allCompleted: state => {
    return state.taskList.length === 0
      ? false
      : state.taskList.every(item => {
          return item.completed;
        });
  },
  sortedFilteredTaskList: state => {
    const filteredTasks = filterTasksByMessage(
      filterTasksByCategory(state.taskList, state.category),
      state.searchQuery
    );
    switch (state.sortBy) {
      case "Name":
        return sortTasksByName(filteredTasks);
      case "ASC":
        return sortTasksAsc(filteredTasks);
      case "DESK":
        return sortTasksDesc(filteredTasks);
      default:
        return sortTasksByGroup(filteredTasks);
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
