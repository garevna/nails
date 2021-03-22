const { getData } = require('@/helpers').default;

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
    const { data, error } = await getData(endpoints.get);
    if (error) {
      commit('ERROR', errors.get, { root: true });
    } else {
      commit(
        'DATA',
        data.map(item => Object.assign(item, { text: item.text[0] ?? '' }))
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
