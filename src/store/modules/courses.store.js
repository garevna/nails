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
  uploadDialog: true
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
    state.queue = [...state.queue, ...payload]
    // state.queue = payload.concat(state.queue)
  },
  COMPLETE: (state, payload) => {
    // if (state.queue.length) state.queue = state.queue.slice(1)
    if (state.queue.length) state.queue = state.queue.filter(obj => obj.id !== payload)
  },
  DIALOG: (state, payload) => {
    state.uploadDialog = payload
  },
  UPLOAD_FAIL: (state, payload) => {
    state.queue = state.queue.filter(obj => {
      if (obj.id === payload.id) obj.error = payload.error
    })
  }
}

const actions = {
  async ADD_LESSON ({ commit, dispatch }, {
    id,
    fd
  }) {
    console.log('add lesson: ', id)
    const response = await postData(`${endpoints.video}/${id}`, fd)
    if (!response.error) {
      // dispatch('GET_COURSE', id)
      // dispatch('GET_COURSES')
      return response.video
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
    // return { _id: id }
  },
  async ADD_QUEUE ({ commit }, arr) {
    commit('DIALOG', true)
    setTimeout(() => commit('QUEUE', arr), 3000)
  },
  async ADD_FILE ({ commit }, payload) {
    // const fd = new FormData()
    // fd.append('files', payload.file)
    const request = new XMLHttpRequest()
    request.open('POST', `${process.env.VUE_APP_API_URL}/${endpoints.appendVideo}/${payload.id}`)
    request.upload.addEventListener('progress', function (e) {
      commit('CHANGE_PROGRESS', { id: payload.id, progress: (e.loaded / e.total) * 100 })
    })
    request.addEventListener('load', function (e) {
      // if (request.status === 200) commit('COMPLETE', payload.id)
      // request.response holds response from the server
      console.log(request.response)
      if (!request.response.error) {
        commit('COMPLETE', payload.id)
      } else {
        commit('UPLOAD_FAIL', { id: payload.id, error: true })
      }
    })
    request.send(payload.file)
    console.log('add file: ', payload.file)
  },

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
      // dispatch('GET_COURSE', newOnlineCourse._id)
      commit('COURSE', newOnlineCourse)
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async PUT_COURSE ({ commit, dispatch }, { data, id }) {
    const { error } = await putData(`${endpoints.get}/${id}`, data)
    if (!error) {
      // commit('VIDEO', data) // ?! <===
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
      // dispatch('GET_COURSES', userId)
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
      // commit('COURSE', data) // ?! <===
      dispatch('GET_FIND_VIDEO', id)
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async POST_VIDEOS ({ commit, dispatch }, { fd, id }) {
    const res = await postData(`${endpoints.video}/${id}`, fd)
    if (!res.error) {
      dispatch('GET_COURSE', id)
      // dispatch('GET_COURSES')
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
    return res.video
  },
  async APPEND_VIDEOS ({ commit, dispatch }, payload) {
    commit('QUEUE', payload)
    // commit('APPEND_VIDEOS', payload)
    // commit('APPEND_VIDEOS_RUN', true)
  },
  async APPEND_VIDEO ({ commit, dispatch, store }, payload) {
    // const fd = new FormData()
    // fd.append('files', payload.file)
    const request = new XMLHttpRequest()
    request.open('POST', `${endpoints.appendVideo}/${payload.id}`)
    request.upload.addEventListener('progress', function (e) {
      // upload progress as percentage
      commit('CHANGE_PROGRESS', { id: payload.id, progress: (e.loaded / e.total) * 100 })
    })
    request.addEventListener('load', function (e) {
      // HTTP status message (200, 404 etc)
      if (request.status === 200) commit('COMPLETE_UPLOAD', payload.id)
      // request.response holds response from the server
      console.log(request.response)
    })
    request.send(payload.file)
    // const { error } = await postData(`${endpoints.video}/${payload.id}`, fd)
  },

  async GET_FIND_VIDEO ({ getters, commit, dispatch }, id) {
    const { video, error } = await getData(`${endpoints.findVideo}/${id}`)
    if (!error) {
      commit('VIDEO', video)
      // commit('VIDEO', id)
    }
  },
  async GET_VIDEO ({ getters, commit, dispatch }, id) {
    const { video, error } = await getData(`${endpoints.video}/${id}`)
    if (!error) {
      commit('VIDEO', video)
      // commit('VIDEO', id)
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
      // dispatch('GET_COURSES', userId)
      // dispatch('GET_USER_COURSE_ID', currentCourseId)
      // dispatch('GET_VIDEO_COURSE_ID', videoId)
      dispatch('GET_COURSES')
      dispatch('GET_COURSE', currentCourseId)
      // dispatch('GET_VIDEO', videoId)
      dispatch('GET_FIND_VIDEO', videoId)
    }
  },
  async REMOVE_PDF (
    { getters, dispatch, commit },
    { id, videoId, currentCourseId }
  ) {
    // commit('ERROR', null)
    const { error } = await deleteData(`${endpoints.pdf}/${id}`)
    if (!error) {
      // commit('ERROR', null)
      // dispatch('GET_COURSES', userId)
      // dispatch('GET_USER_COURSE_ID', currentCourseId)
      // dispatch('GET_VIDEO_COURSE_ID', videoId)
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
