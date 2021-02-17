const { getData } = require('@/helpers').default;

const errors = require('@/config/errors').default.instagram;
// const messages = require('@/config/messages').default.onlineCourses

const endpoints = require('@/config/endpoints').default.instagram;

const state = {
  media:[],
  posts: [],
  data:null
};

const getters = {};

const mutations = {
  DATA: (state, { media, posts, ...rest}) => {
    state.media = media ?? [];
    state.posts = posts ?? [];
    state.data = rest ?? null;
  },
};

const actions = {
  async GET_INSTAGRAM({ commit }) {
    const { data, error } = await getData(endpoints.get);
    if (error) {
      commit('ERROR', errors.get, { root: true });
    } else {
      commit('DATA', data)
      
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
