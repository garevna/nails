import { api } from './../../helpers/api';

const errors = require('@/config/errors').default.online;
// const messages = require('@/config/messages').default.onlineCourses

const endpoints = require('@/config/endpoints').default.orders;
const course = require('@/config/endpoints').default.onlineCourses;
const courseOff = require('@/config/endpoints').default.offlineCourses;

const state = {
  courses: [],
  course: null,
  videos: [],
  video: null,
  total: 0,
};
const mutations = {
  COURSES: (state, payload) => {
    state.courses = payload;
  },
  ADD_COURSES: (state, payload) => {
    state.courses = state.courses.concat(payload);
  },
  COURSE: (state, payload) => {
    state.course = payload;
  },
  VIDEOS: (state, payload) => {
    state.videos = payload;
  },
  VIDEO: (state, payload) => {
    state.video = payload;
  },
  TOTAL: (state, payload) => {
    state.total = payload;
  },
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  async GET_ALL_COURSES({ commit }, type) { //!=============
    const res = await api.get(`${endpoints.get}/${type}`);
    if (res.statusText === 'OK') {
      let courses = [];
      if (type === 'offline') {
        courses = res.data.data.reduce((res, curr) => {
          const elm = res.find(i => i.id === curr.id);
          if (!elm) {
            res.push(curr);
            return res;
          }
          elm.eventDate = elm.eventDate.concat(curr.eventDate);
          return res;
        }, []);
      }
      commit('COURSES', type === 'offline' ? courses : res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_MORE_COURSES({ commit }, skip) {
    const params = { skip, published: true };
    const res = await api.get(endpoints.get, { params }); //!=============
    if (res.statusText === 'OK') {
      commit('ADD_COURSES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_COURSES({ commit, rootState }) {
    const params = { idUser: rootState.auth.user._id };
    const res = await api.get(endpoints.get, { params }); //!=============
    if (res.statusText === 'OK') {
      commit('COURSES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_MORE_USER_COURSES({ commit, rootState }, skip) {
    const params = { skip, idUser: rootState.auth.user._id };
    const res = await api.get(endpoints.get, { params }); //!=============
    if (res.statusText === 'OK') {
      commit('ADD_COURSES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_COURSE({ commit }, id) {
    const res = await api.get(`${course.get}/${id}`);
    if (res.statusText === 'OK') {
      commit('COURSE', res.data);
      commit('VIDEOS', res.data.videos);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_OFFLINE_COURSE({ commit }, id) {
    const res = await api.get(`${courseOff.get}/${id}`);
    if (res.statusText === 'OK') {
      commit('COURSE', res.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_FIND_VIDEO({ commit }, id) {
    const res = await api.get(`${course.findVideo}/${id}`);
    if (res.statusText === 'OK') {
      commit('VIDEO', res.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_VIDEO({ commit }, id) {
    const res = await api.get(`${endpoints.video}/${id}`); //!=============
    if (res.statusText === 'OK') {
      commit('VIDEO', res.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
