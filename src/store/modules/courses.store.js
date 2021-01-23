/* eslint-disable no-irregular-whitespace */
const { getData, postData, putData, deleteData } = require('@/helpers').default

// const errors = require('@/config/errors').default.onlineCourses
// const messages = require('@/config/messages').default.onlineCourses

const endpoints = require('@/config/endpoints').default.onlineCourses

const state = {
  courses: [],
  course: null,
  videos: [],
  video: null,
  total: 0,
  queue: [],
  uploadDialog: false
}
const mutations = {
  COURSES: (state, payload) => {
    state.courses = payload
  },
  ADD_COURSES: (state, payload) => {
    state.courses = payload
  },
  COURSE: (state, payload) => {
    state.course = payload
  },
  VIDEOS: (state, payload) => {
    state.videos = payload
  },
  VIDEO: (state, payload) => {
    state.video = payload
  },
  TOTAL: (state, payload) => {
    state.total = payload
  },
  QUEUE: (state, payload) => {
    state.queue = payload
  },
  COMPLETE: (state, payload) => {
    if (state.queue.length) state.queue = state.queue.filter(obj => obj.index !== payload)
  },
  DIALOG: (state, payload) => {
    state.uploadDialog = payload
  },
  UPLOAD_FAIL: (state, payload) => {
    state.queue.forEach(obj => {
      if (obj.index === payload.index) obj.error = payload.error
    })
  },
  CHANGE_PROGRESS: (state, { index, progress }) => {
    state.queue.forEach(obj => {
      if (obj.index === index) obj.progress = progress
    })
  }
}

const actions = {

  // ===================================================

  async GET_ALL_COURSES ({ commit }) {
    const { onlineCourses, error, total } = await getData(endpoints.get)
    if (!error) {
      commit('COURSES', onlineCourses)
      commit('TOTAL', total)
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async GET_MORE_COURSES ({ commit }, skip) {
    const { onlineCourses, error, total } = await getData(`${endpoints.get}?skip=${skip}`)
    if (!error) {
      commit('ADD_COURSES', onlineCourses)
      commit('TOTAL', total)
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async GET_COURSES ({ commit, rootState }) {
    const { onlineCourses, error } = await getData(
      `${endpoints.get}?userId=${rootState.auth.user._id}`
    )
    if (!error) {
      commit('COURSES', onlineCourses)
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async GET_COURSE ({ commit }, id) {
    const { onlineCourse, error } = await getData(`${endpoints.get}/${id}`)
    if (!error) {
      commit('COURSE', onlineCourse)
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async POST_COURSE ({
    getters,
    commit,
    dispatch
  }, fd) {
    const {
      newOnlineCourse,
      error
    } = await postData(endpoints.newCourse, fd)
    if (!error) {
      dispatch('GET_COURSES')
      commit('COURSE', newOnlineCourse)
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async PUT_COURSE ({ commit, dispatch }, { data, id }) {
    const { error } = await putData(`${endpoints.get}/${id}`, data)
    if (!error) {
      dispatch('GET_COURSE', id)
      dispatch('GET_COURSES')
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async DELETE_COURSE ({ getters, commit, dispatch }, courseId) {
    const response = await deleteData(`${endpoints.delete}/${courseId}`)
    if (!response.error) {
      dispatch('GET_COURSES')
    }
  },
  async BUY_COURSE ({ getters, commit, dispatch }, payload) {
    const { data, error } = await postData(endpoints.buyCourse, payload)
    if (!error && data.link) {
      window.open(data.link)
      // data: {link: "https://invoice.stripe.com/i/acct_1HhAsJH7jhGffcki/invst_IeJ4ZqdsRng0CAP4uFRkgD59DtVwGYW",…}
      // invoicePdf: "https://pay.stripe.com/invoice/acct_1HhAsJH7jhGffcki/invst_IeJ4ZqdsRng0CAP4uFRkgD59DtVwGYW/pdf"
      // link: "https://invoice.stripe.com/i/acct_1HhAsJH7jhGffcki/invst_IeJ4ZqdsRng0CAP4uFRkgD59DtVwGYW"
      // error: null
    }
  },
  // !==========================================================================
  async PUT_VIDEO ({ commit, dispatch }, { fd, id }) {
    const { error } = await putData(`${endpoints.video}/${id}`, fd)
    if (!error) {
      dispatch('GET_FIND_VIDEO', id)
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async ADD_QUEUE ({ commit }, arr) {
    commit('DIALOG', true)
    setTimeout(() => commit('QUEUE', arr), 2000)
  },
  async ADD_LESSON ({ commit }, payload) {
    const request = new XMLHttpRequest()
    request.open('POST', `${process.env.VUE_APP_API_URL}/${endpoints.video}/${payload.id}`)
    request.upload.addEventListener('progress', function (e) {
      commit('CHANGE_PROGRESS', { index: payload.index, progress: (e.loaded / e.total) * 100 })
    })
    request.addEventListener('load', function (e) {
      if (request.status === 200) {
        commit('COMPLETE', payload.index)
      } else {
        commit('UPLOAD_FAIL', { index: payload.index, error: true })
      }
    })
    request.send(payload.lesson)
  },
  async GET_FIND_VIDEO ({ getters, commit, dispatch }, id) {
    const { video, error } = await getData(`${endpoints.findVideo}/${id}`)
    if (!error) {
      commit('VIDEO', video)
    }
  },
  async GET_VIDEO ({ getters, commit, dispatch }, id) {
    const { video, error } = await getData(`${endpoints.video}/${id}`)
    if (!error) {
      commit('VIDEO', video)
    }
  },
  async DELETE_VIDEO ({ getters, commit, dispatch }, { id, courseId }) {
    const { error } = await deleteData(`${endpoints.video}/${id}`)
    if (!error) {
      dispatch('GET_COURSE', courseId)
    }
  },
  async ADD_PDF (
    { dispatch },
    { fd, videoId, currentCourseId }
  ) {
    const { error } = await postData(`${endpoints.pdf}/${videoId}`, fd)
    if (!error) {
      dispatch('GET_COURSES')
      dispatch('GET_COURSE', currentCourseId)
      dispatch('GET_FIND_VIDEO', videoId)
    }
  },
  async REMOVE_PDF (
    { getters, dispatch, commit },
    { id, videoId, currentCourseId }
  ) {
    const { error } = await deleteData(`${endpoints.pdf}/${id}`)
    if (!error) {
      dispatch('GET_COURSES')
      dispatch('GET_COURSE', currentCourseId)
      dispatch('GET_FIND_VIDEO', videoId)
    } else {
      // commit('ERROR', error)
    }
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
