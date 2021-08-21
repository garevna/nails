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
  async GET_OFFLINE_COURSES({ commit }) {
    const res = await api.get(endpoints.get);
    if (res.statusText === 'OK') {
      commit('OFFLINE_COURSES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_MORE_OFFLINE_COURSES({ commit }, skip) {
    const params = { skip };
    const res = await api.get(endpoints.get, { params });
    if (res.statusText === 'OK') {
      commit('MORE_OFFLINE_COURSES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_COURSE({ commit }, id) {
    const res = await api.get(`${endpoints.get}/${id}`);
    if (res.statusText === 'OK') {
      commit('OFFLINE_COURSE_BY_ID', res.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async BUY_COURSE({ commit }, payload) {
    commit('LOADING', true);
    const res = await api.post(endpoints.buyCourse, payload);
    if (res.statusText === 'Created') {
      window.open(res.data.link);
    } else {
      commit(
        'ERROR',
        {
          error: errors.buy.error,
          errorType: errors.buy.errorType,
          errorMessage: res.data.message || errors.buy.errorMessage,
        },
        { root: true }
      );
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
