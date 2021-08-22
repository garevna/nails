import { api } from './../../helpers/api';

const errors = require('@/config/errors').default.online;
const messages = require('@/config/messages').default.online;

const endpoints = require('@/config/endpoints').default.onlineCourses;

const state = {
  courses: [],
  course: null,
  videos: [],
  video: null,
  total: 0,
  queue: [],
  uploadDialog: false,
  loading: false,
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
    state.total = payload || 0;
  },
  QUEUE: (state, payload) => {
    state.queue = payload;
  },
  COMPLETE: (state, payload) => {
    if (state.queue.length) state.queue = state.queue.filter(obj => obj.index !== payload);
  },
  DIALOG: (state, payload) => {
    state.uploadDialog = payload;
  },
  UPLOAD_FAIL: (state, payload) => {
    state.queue.forEach(obj => {
      if (obj.index === payload.index) obj.error = payload.error;
    });
  },
  CHANGE_PROGRESS: (state, { index, progress }) => {
    state.queue.forEach(obj => {
      if (obj.index === index) obj.progress = progress;
    });
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  async GET_ALL_COURSES({ commit }) {
    const res = await api.get(endpoints.get);
    if (res.statusText === 'OK') {
      commit('COURSES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_MORE_COURSES({ commit }, skip) {
    const params = { skip };
    const res = await api.get(endpoints.get, { params });
    if (res.statusText === 'OK') {
      commit('ADD_COURSES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_COURSES({ commit, rootState }) {
    const params = { userId: rootState.auth.user._id };
    const res = await api.get(endpoints.get, { params });
    if (res.statusText === 'OK') {
      commit('COURSES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_MORE_USER_COURSES({ commit, rootState }, skip) {
    const params = { userId: rootState.auth.user._id, skip };
    const res = await api.get(endpoints.get, { params });
    if (res.statusText === 'OK') {
      commit('ADD_COURSES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_COURSE({ commit }, id) {
    const res = await api.get(`${endpoints.get}/${id}`);
    if (res.statusText === 'OK') {
      commit('COURSE', res.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  POST_COURSE({ commit, dispatch }, fd) {
    commit('LOADING', true);
    api.post(endpoints.post, fd).then((res) => {
      if (res.statusText === 'OK') {
        dispatch('GET_COURSES');
        commit('COURSE', res.data);
        commit('MESSAGE', messages.post, { root: true });
      }
    }).catch(() => {
      commit('ERROR', errors.post, { root: true });
    }).finally(() => {
      commit('LOADING', false);
    })
  },
  async PUT_COURSE({ state, commit }, { data, id }) {
    commit('LOADING', true);
    // const { updatedOnlineCourse, error } = await putData(`${endpoints.put}/${id}`, data);
    const res = await api.put(`${endpoints.put}/${id}`, data);
    if (res.statusText === 'OK') {
      commit('COURSE', res.data.updatedOnlineCourse);
      commit(
        'COURSES',
        state.courses.map(course => (course._id === id ? res.data.updatedOnlineCourse : course))
      );
      commit('MESSAGE', messages.put, { root: true });
    } else {
      commit('ERROR', errors.put, { root: true });
    }
    commit('LOADING', false);
  },
  async DELETE_COURSE({ commit, dispatch }, courseId) {
    const res = await api.delete(`${endpoints.delete}/${courseId}`);
    if (res.statusText === 'OK') {
      dispatch('GET_COURSES');
      commit('MESSAGE', messages.delete, { root: true });
    } else {
      commit('ERROR', errors.delete, { root: true });
    }
  },
  async BUY_COURSE({ commit }, payload) {
    commit('LOADING', true);
    const res = await api.post(endpoints.buyCourse, payload);
    if (res.statusText === 'Created') {
      // window.open(data.link);
      window.location = res.data.link;
    } else {
      commit('ERROR', errors.buy, { root: true });
    }
    commit('LOADING', false);
  },
  async BUY_END_CUSTOMER({ commit }, payload) {
    commit('LOADING', true);
    const res = await api.post(endpoints.buyEndCustomer, payload);
    if (res.statusText === 'Created') {
      // window.open(data.link);
      window.location = res.data.link;
    } else {
      commit('ERROR', errors.buy, { root: true });
    }
    commit('LOADING', false);
  },
  // !==========================================================================
  async PUT_VIDEO({ commit, dispatch }, { fd, id }) {
    const res = await api.put(`${endpoints.video}/${id}`, fd);
    if (res.statusText === 'OK') {
      dispatch('GET_FIND_VIDEO', id);
    } else {
      commit(
        'ERROR',
        { error: true, errorType: 'Update video lesson', errorMessage: res.data.messages },
        { root: true }
      );
    }
  },
  async ADD_QUEUE({ commit }, arr) {
    commit('DIALOG', true);
    setTimeout(() => commit('QUEUE', arr), 2000);
  },

  // async ADD_LESSON({ commit }, payload) {
  //   const request = new XMLHttpRequest();
  //   request.open('POST', `${process.env.VUE_APP_API_URL}/${endpoints.video}/${payload.id}`);
  //   request.upload.addEventListener('progress', function (e) {
  //     commit('CHANGE_PROGRESS', { index: payload.index, progress: (e.loaded / e.total) * 100 });
  //   });
  //   request.addEventListener('load', function () {
  //     if (request.status === 200) {
  //       commit('COMPLETE', payload.index);
  //     } else {
  //       commit('UPLOAD_FAIL', { index: payload.index, error: true });
  //       commit('ERROR', errors.addLesson, { root: true });
  //     }
  //   });
  //   request.send(payload.lesson);
  // },  
  ADD_LESSON({ commit }, payload) {
    api.post(`${endpoints.video}/${payload.id}`, payload.lesson, {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        commit('CHANGE_PROGRESS', { index: payload.index, progress: percentCompleted });
        console.log(progressEvent.lengthComputable);
        console.log(percentCompleted);
      }
    }).then(() => {
      commit('COMPLETE', payload.index);
    }).catch(() => {
      commit('UPLOAD_FAIL', { index: payload.index, error: true });
      commit('ERROR', errors.addLesson, { root: true });
    })
  },
  async GET_FIND_VIDEO({ commit }, id) {
    const res = await api.get(`${endpoints.findVideo}/${id}`);
    if (res.statusText === 'OK') {
      commit('VIDEO', res.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_VIDEO({ commit }, id) {
    const res = await api.get(`${endpoints.video}/${id}`);
    if (res.statusText === 'OK') {
      commit('VIDEO', res.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async DELETE_VIDEO({ commit, dispatch }, { id, courseId }) {
    const res = await api.delete(`${endpoints.video}/${id}`);
    if (res.statusText === 'OK') {
      dispatch('GET_COURSE', courseId);
    } else {
      commit(
        'ERROR',
        { error: true, errorType: 'Delete video lesson', errorMessage: res.data.message },
        { root: true }
      );
    }
  },
  async ADD_PDF({ commit, dispatch }, { fd, lessonId, currentCourseId }) {
    const res = await api.post(`${endpoints.pdf}/${lessonId}`, fd);
    if (res.statusText === 'Created') {
      dispatch('GET_COURSES');
      dispatch('GET_COURSE', currentCourseId);
      dispatch('GET_FIND_VIDEO', lessonId);
    } else {
      commit('ERROR', { error: true, errorType: 'Add pdf', errorMessage: res.data.message }, { root: true });
    }
  },
  async REMOVE_PDF({ commit, dispatch }, { id, lessonId, currentCourseId }) {
    const res = await api.delete(`${endpoints.pdf}/${id}`);
    if (res.statusText === 'OK') {
      dispatch('GET_COURSES');
      dispatch('GET_COURSE', currentCourseId);
      dispatch('GET_FIND_VIDEO', lessonId);
    } else {
      commit('ERROR', { error: true, errorType: 'Delete pdf', errorMessage: res.data.message }, { root: true });
    }
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
