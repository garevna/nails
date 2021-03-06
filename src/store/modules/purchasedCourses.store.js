/* eslint-disable no-irregular-whitespace */
const { getData } = require('@/helpers').default;

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
  async GET_ALL_COURSES({ commit, rootState }, type) {
    const { data, total, error } = await (
      await fetch(`${process.env.VUE_APP_API_URL}/${endpoints.get}?idUser=${rootState.auth.user._id}&type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${rootState.auth.token}`,
        },
      })
    ).json();

    const courses = data.reduce((res, curr) => {
      const elm = res.find(i => i.id === curr.id);
      if (!elm) {
        res.push(curr);
        return res;
      }
      elm.eventDate = elm.eventDate.concat(curr.eventDate);
      return res;
    }, []);
    if (!error) {
      commit('COURSES', type === 'offline' ? courses: data);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_MORE_COURSES({ commit }, skip) {
    const { onlineCourses, error, total } = await getData(`${endpoints.get}?skip=${skip}&published=true`);
    if (!error) {
      commit('ADD_COURSES', onlineCourses);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_COURSES({ commit, rootState }) {
    const { onlineCourses, error, total } = await getData(`${endpoints.get}?userId=${rootState.auth.user._id}`);
    if (!error) {
      commit('COURSES', onlineCourses);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_MORE_USER_COURSES({ commit, rootState }, skip) {
    const { onlineCourses, error, total } = await getData(
      `${endpoints.get}?userId=${rootState.auth.user._id}&skip=${skip}`
    );
    if (!error) {
      commit('ADD_COURSES', onlineCourses);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_COURSE({ commit }, id) {
    const { onlineCourse, error } = await getData(`${course.get}/${id}`);
    if (!error) {
      commit('COURSE', onlineCourse);
      commit('VIDEOS', onlineCourse.videos);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_OFFLINE_COURSE({ commit }, id) {
    const { offlineCourse, error } = await getData(`${courseOff.get}/${id}`);
    if (!error) {
      commit('COURSE', offlineCourse);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_FIND_VIDEO({ commit }, id) {
    const { video, error } = await getData(`${course.findVideo}/${id}`);
    if (!error) {
      commit('VIDEO', video);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_VIDEO({ commit }, id) {
    const { video, error } = await getData(`${endpoints.video}/${id}`);
    if (!error) {
      commit('VIDEO', video);
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
