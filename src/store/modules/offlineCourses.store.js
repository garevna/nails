import { api } from './../../helpers/api';

const errors = require('@/config/errors').default.offline;
// const messages = require('@/config/messages').default.onlineCourses

const endpoints = require('@/config/endpoints').default.offlineCourses;

const state = {
  offlineCourses: [],
  offlineCourse: null,
  totalOfflineCourses: 0,
  loading: false,
};

const getters = {};

const mutations = {
  OFFLINE_COURSES: (state, payload) => {
    state.offlineCourses = payload;
  },
  TOTAL: (state, payload) => {
    state.totalOfflineCourses = payload || 0;
  },
  MORE_OFFLINE_COURSES: (state, payload) => {
    state.offlineCourses = [...state.offlineCourses, ...payload];
  },
  OFFLINE_COURSE_BY_ID: (state, payload) => {
    state.offlineCourse = payload;
  },
  OFFLINE_COURSE_BY_ID_CLEAR: state => {
    state.offlineCourse = null;
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  GET_OFFLINE_COURSES({ commit }) {
    api.get(endpoints.get)
      .then((res) => {
        commit('OFFLINE_COURSES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  GET_MORE_OFFLINE_COURSES({ commit }, skip) {
    const params = { skip };
    api.get(endpoints.get, { params })
      .then((res) => {
        commit('MORE_OFFLINE_COURSES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  GET_COURSE({ commit }, id) {
    api.get(`${endpoints.get}/${id}`)
      .then((res) => commit('OFFLINE_COURSE_BY_ID', res.data))
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  BUY_COURSE({ commit }, payload) {
    commit('LOADING', true);
    api.post(endpoints.buyCourse, payload)
      .then((res) => window.location = res.data.link)
      .catch((error) => {
        commit(
          'ERROR',
          {
            error: errors.buy.error,
            errorType: errors.buy.errorType,
            errorMessage: error.response.data.message || errors.buy.errorMessage,
          },
          { root: true }
        );
      })
      .finally(() => commit('LOADING', false))
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
