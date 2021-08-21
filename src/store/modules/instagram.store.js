import { api } from './../../helpers/api';

const errors = require('@/config/errors').default.instagram;
// const messages = require('@/config/messages').default.onlineCourses

const endpoints = require('@/config/endpoints').default.instagram;

const state = {
  data: [],
};

const getters = {};

const mutations = {
  DATA: (state, payload) => {
    state.data = payload ?? [];
  },
};

const actions = {
  async GET_INSTAGRAM({ commit }) {
    const res = await api.path(endpoints.get);
    if (res.statusText === 'OK') {
      commit('ERROR', errors.get, { root: true });
    } else {
      commit(
        'DATA',
        res.data.map(item => Object.assign(item, { text: item.text[0] ?? '' }))
      );
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
