import { api } from './../../helpers/api';
import router from './../../router';

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
  GET_ALL_COURSES({ commit }) {
    api.get(endpoints.get)
      .then((res) => {
        commit('COURSES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  GET_MORE_COURSES({ commit }, skip) {
    const params = { skip };
    api.get(endpoints.get, { params })
      .then((res) => {
        commit('ADD_COURSES', res.data.data);
        commit('TOTAL', res.data.total);

      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  GET_COURSES({ commit, rootState }) {
    const params = { userId: rootState.auth.user._id };
    api.get(endpoints.get, { params })
      .then((res) => {
        commit('COURSES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  GET_MORE_USER_COURSES({ commit, rootState }, skip) {
    const params = { userId: rootState.auth.user._id, skip };
    api.get(endpoints.get, { params })
      .then((res) => {
        commit('ADD_COURSES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  GET_COURSE({ commit }, id) {
    api.get(`${endpoints.get}/${id}`)
      .then((res) => commit('COURSE', res.data))
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  POST_COURSE({ commit, dispatch }, fd) {
    commit('LOADING', true);
    api.post(endpoints.post, fd)
      .then((res) => {
        dispatch('GET_COURSES');
        commit('COURSE', res.data);
        commit('MESSAGE', messages.post, { root: true });
        router.push({
          name: 'add-course-videos',
          params: {
            courseid: res.data._id
          }
        })
      })
      .catch(() => {
        commit('ERROR', errors.post, { root: true });
      })
      .finally(() => commit('LOADING', false))
  },
  PUT_COURSE({ state, commit }, { data, id }) {
    commit('LOADING', true);
    api.put(`${endpoints.put}/${id}`, data)
      .then((res) => {
        commit('COURSE', res.data.updatedOnlineCourse);
        commit(
          'COURSES',
          state.courses.map(course => (course._id === id ? res.data.updatedOnlineCourse : course))
        );
        commit('MESSAGE', messages.put, { root: true });
      })
      .catch(() => commit('ERROR', errors.put, { root: true }))
      .finally(() => commit('LOADING', false))
  },
  DELETE_COURSE({ commit, dispatch }, courseId) {
    api.delete(`${endpoints.delete}/${courseId}`)
      .then(() => {
        dispatch('GET_COURSES');
        commit('MESSAGE', messages.delete, { root: true });
      })
      .catch(() => commit('ERROR', errors.delete, { root: true }))
  },
  BUY_COURSE({ commit }, payload) {
    commit('LOADING', true);
    let resolve = null
    const promise = new Promise()
    api.post(endpoints.buyCourse, payload)
      .then((res) => {
        window.location = res.data.link
        resolve(true)
      })
      .catch(() => {
        commit('ERROR', errors.buy, { root: true })
        resolve(false)
      })
      .finally(() => commit('LOADING', false))
    return promise
  },
  BUY_END_CUSTOMER({ commit }, payload) {
    commit('LOADING', true);
    let resolve = null
    const promise = new Promise()
    api.post(endpoints.buyEndCustomer, payload)
      .then((res) => {
        window.location = res.data.link
        resolve(true)
      })
      .catch(() => {
        commit('ERROR', errors.buy, { root: true })
        resolve(false)
      })
      .finally(() => commit('LOADING', false));
    return promise
  },
  PUT_VIDEO({ commit, dispatch }, { fd, id }) {
    api.put(`${endpoints.video}/${id}`, fd)
      .then(() => dispatch('GET_FIND_VIDEO', id))
      .catch((error) => {
        commit(
          'ERROR',
          { error: true, errorType: 'Update video lesson', errorMessage: error.response.data.messages },
          { root: true }
        );
      })
  },
  ADD_QUEUE({ commit }, arr) {
    commit('DIALOG', true);
    setTimeout(() => commit('QUEUE', arr), 2000);
  },
  ADD_LESSON({ commit }, payload) {
    api.post(`${endpoints.video}/${payload.id}`, payload.lesson, {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        commit('CHANGE_PROGRESS', { index: payload.index, progress: percentCompleted });
      }
    })
      .then(() => commit('COMPLETE', payload.index))
      .catch(() => {
        commit('UPLOAD_FAIL', { index: payload.index, error: true });
        commit('ERROR', errors.addLesson, { root: true });
      })
  },
  GET_FIND_VIDEO({ commit }, id) {
    api.get(`${endpoints.findVideo}/${id}`)
      .then((res) => commit('VIDEO', res.data))
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  GET_VIDEO({ commit }, id) {
    api.get(`${endpoints.video}/${id}`)
      .then((res) => commit('VIDEO', res.data))
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },
  DELETE_VIDEO({ commit, dispatch }, { id, courseId }) {
    api.delete(`${endpoints.video}/${id}`)
      .then(() => dispatch('GET_COURSE', courseId))
      .catch((error) => {
        commit(
          'ERROR',
          { error: true, errorType: 'Delete video lesson', errorMessage: error.response.data.message },
          { root: true }
        );
      })
  },
  ADD_PDF({ commit, dispatch }, { fd, lessonId, currentCourseId }) {
    api.post(`${endpoints.pdf}/${lessonId}`, fd)
      .then(() => {
        dispatch('GET_COURSES');
        dispatch('GET_COURSE', currentCourseId);
        dispatch('GET_FIND_VIDEO', lessonId);
      })
      .catch((error) => commit('ERROR', { error: true, errorType: 'Add pdf', errorMessage: error.response.data.message }, { root: true }))
  },
  REMOVE_PDF({ commit, dispatch }, { id, lessonId, currentCourseId }) {
    api.delete(`${endpoints.pdf}/${id}`)
      .then(() => {
        dispatch('GET_COURSES');
        dispatch('GET_COURSE', currentCourseId);
        dispatch('GET_FIND_VIDEO', lessonId);
      })
      .catch((error) => commit('ERROR', { error: true, errorType: 'Delete pdf', errorMessage: error.response.data.message }, { root: true }))
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
