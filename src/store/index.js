import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { getItems, deleteItem } from '../api';

export const store = new Vuex.Store({
  state: {
    items: [],
    loading: false,
    error: null,
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    deleteItem(state, id) {
      const index = state.items.findIndex((item) => item.id === id);

      if (index < 0) {
        return;
      }

      state.items.splice(index, 1);
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchItems({ commit }) {
      commit('setLoading', true);

      const [err, data] = await getItems();

      if (data) {
        commit('setItems', data);
      }

      if (err) {
        commit('setError', err);
      }

      commit('setLoading', false);
    },

    async deleteItem({ commit }, id) {
      commit('setLoading', true);

      const [err, data] = await deleteItem();

      if (data) {
        commit('deleteItem', id);
      }

      if (err) {
        commit('setError', err);
      }

      commit('setLoading', false);
    },
  },
});
