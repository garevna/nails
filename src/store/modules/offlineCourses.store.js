const { getData, postData } = require('@/helpers').default;

const errors = require('@/config/errors').default.offline;
// const messages = require('@/config/messages').default.onlineCourses

const endpoints = require('@/config/endpoints').default.offlineCourses;

const state = {
  offlineCourses: [],
  offlineCourse: null,
  totalOfflineCourses: 0,
  loading: false
};

const getters = {};

const mutations = {
  OFFLINE_COURSES: (state, payload) => {
    state.offlineCourses = payload.offlineCourses;
    state.totalOfflineCourses = payload.total;
  },
  MORE_OFFLINE_COURSES: (state, payload) => {
    state.offlineCourses = [...state.offlineCourses, ...payload.offlineCourses];
    state.totalOfflineCourses = payload.total;
  },
  OFFLINE_COURSE_BY_ID: (state, payload) => {
    state.offlineCourse = payload;
  },
  OFFLINE_COURSE_BY_ID_CLEAR: state => {
    state.offlineCourse = null;
  },
  LOADING:(state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  async GET_OFFLINE_COURSES({ commit }) {
    const response = await getData(endpoints.get);
    if (response.error) {
      commit('ERROR', errors.get, { root: true });
    } else {
      commit('OFFLINE_COURSES', response);
    }
  },
  async GET_MORE_OFFLINE_COURSES({ commit }, skip) {
    const response = await getData(`${endpoints.get}?skip=${skip}`);
    if (response.error) {
      commit('ERROR', errors.get, { root: true });
    } else {
      commit('MORE_OFFLINE_COURSES', response);
    }
  },
  async GET_COURSE({ commit }, id) {
    const { offlineCourse, error } = await getData(`${endpoints.get}/${id}`);
    if (error) {
      commit('ERROR', errors.get, { root: true });
    } else {
      commit('OFFLINE_COURSE_BY_ID', offlineCourse);
    }
  },
  async BUY_COURSE({ commit }, payload) {
    commit('LOADING', true);
    const { data, error } = await postData(endpoints.buyCourse, payload);
    if (!error && data.link) {
      window.open(data.link);
    } else {
      commit('ERROR', {
        error: errors.buy.error,
        errorType: errors.buy.errorType,
        errorMessage: error || errors.buy.errorMessage
      }, { root: true });
    }
    commit('LOADING', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
