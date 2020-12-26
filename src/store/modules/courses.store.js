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
  total: 0
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
  }
}

const actions = {
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
  async PUT_COURSE ({ commit, dispatch }, { data, id }) {
    const { error } = await putData(`${endpoints.get}/${id}`, data)
    if (!error) {
      commit('COURSE', data) // ?! <===
      dispatch('GET_COURSE', id)
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
  // !==========================================================================
  async PUT_VIDEO ({ commit, dispatch }, { fd, id }) {
    const { error } = await putData(`${endpoints.video}/${id}`, fd)
    if (!error) {
      // commit('COURSE', data) // ?! <===
      // dispatch('GET_VIDEO', id)
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
  },
  async POST_VIDEOS ({ commit, dispatch }, { fd, id }) {
    const { error } = await postData(`${endpoints.video}/${id}`, fd)
    if (!error) {
      // commit('COURSE', data) // ?! <===
      // dispatch('GET_COURSE', id)
      // dispatch('GET_COURSES')
    } else {
      // commit('ERROR', errors.get, { root: true })
    }
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
  async POST_COURSE ({ getters, commit, dispatch }, payload) {
    const { newOnlineCourse, error } = await postData(
      endpoints.newCourse,
      payload.fd
    )
    if (!error) {
      // dispatch('GET_COURSES', payload.userId)
      // dispatch('GET_USER_COURSE_ID', newOnlineCourse._id)
      dispatch('GET_COURSE', newOnlineCourse._id)
      // commit('LOADING', false)
    } else {
      // commit('LOADING', false)
      // commit('ERROR', error)
    }
  },
  async DELETE_VIDEO ({ getters, commit, dispatch }, { id, courseId }) {
    const { error } = await deleteData(`${endpoints.video}/${id}`)
    if (!error) {
      dispatch('GET_USER_COURSE_ID', courseId)
    }
  },
  async ADD_PDF (
    { getters, dispatch },
    { fd, videoId, userId, currentCourseId }
  ) {
    const { error } = await postData(`${endpoints.pdf}/${videoId}`, fd)
    if (!error) {
      // dispatch('GET_COURSES', userId)
      // dispatch('GET_USER_COURSE_ID', currentCourseId)
      // dispatch('GET_VIDEO_COURSE_ID', videoId)
      dispatch('GET_COURSES')
      dispatch('GET_COURSE', currentCourseId)
      dispatch('GET_VIDEO', videoId)
    }
  },
  async REMOVE_PDF (
    { getters, dispatch, commit },
    { id, userId, videoId, currentCourseId }
  ) {
    // commit('ERROR', null)
    const { error } = await deleteData(`${getters.removePdfEndpoint}/${id}`)
    if (!error) {
      // commit('ERROR', null)
      // dispatch('GET_COURSES', userId)
      // dispatch('GET_USER_COURSE_ID', currentCourseId)
      // dispatch('GET_VIDEO_COURSE_ID', videoId)
      dispatch('GET_COURSES')
      dispatch('GET_COURSE', currentCourseId)
      dispatch('GET_VIDEO', videoId)
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
