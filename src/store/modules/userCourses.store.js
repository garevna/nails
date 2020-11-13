/* eslint-disable no-irregular-whitespace */

const state = {
  userCourses: null,
  currentCourseId: null,
  currentCourse: null,
  currentCourseVideos: null,
  currentVideoId: null,
  currentVideo: null,
  error: null,
  loading: false
}
const getters = {
  userCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/online`,
  userCreateOnlineCourseEndpoint: (state, getters, rootState) => `${rootState.host}/course/new/online`,
  userCreateVideosCourse: (state, getters, rootState) => `${rootState.host}/course/online/video`,
  userCourseFindVideoEndpoint: (state, getters, rootState) => `${rootState.host}/course/online/findvideo`,
  removePdfEndpoint: (state, getters, rootState) => `${rootState.host}/course/online/pdf`,
  addPdfEndpoint: (state, getters, rootState) => `${rootState.host}/course/online/pdf`
}
const mutations = {
  USER_COURSES: (state, payload) => {
    state.userCourses = payload
  },
  CURRENT_COURSE_ID: (state, payload) => {
    state.currentCourseId = payload
  },
  CURRENT_COURSE_VIDEOS: (state, payload) => {
    state.currentCourseVideos = payload
  },
  CURRENT_COURSE: (state, payload) => {
    state.currentCourse = payload
  },
  CURRENT_VIDEOS_ID: (state, payload) => {
    state.currentVideoId = payload
  },
  CURRENT_VIDEOS: (state, payload) => {
    state.currentVideo = payload
  },
  ERROR: (state, payload) => {
    state.error = payload
  },
  LOADING: (state, payload) => {
    state.loading = payload
  }
}

const actions = {
  async GET_USER_COURSES ({
    getters,
    commit
  }, payload) {
    const {
      onlineCourses
    } = await (await fetch(`${getters.userCoursesEndpoint}?userId=${payload}`)).json()
    commit('USER_COURSES', onlineCourses)
  },
  async GET_USER_COURSE_ID ({
    getters,
    commit
  }, payload) {
    const {
      onlineCourse
    } = await (await fetch(`${getters.userCoursesEndpoint}/${payload}`)).json()
    commit('CURRENT_COURSE', onlineCourse)
    commit('CURRENT_COURSE_VIDEOS', onlineCourse.videos)
    commit('CURRENT_COURSE_ID', payload)
  },
  async PUT_USER_COURSE_ID ({
    getters,
    commit,
    dispatch
  }, {
    data,
    id
  }) {
    console.log('fdsadfasdfasdf', data, id)
    const {
      error
      // updatedOnlineCourse
    } = await (await fetch(`${getters.userCoursesEndpoint}/${id}`, {
      method: 'PUT',
      body: data
    })).json()
    commit('CURRENT_COURSE_ID', id)
    if (!error) dispatch('GET_USER_COURSE_ID', id)
  },
  async PUT_CURRENT_VIDEO ({
    getters,
    commit,
    dispatch
  }, {
    fd,
    id
  }) {
    const {
      error
      // updatedonline
    } = await (await fetch(`${getters.userCreateVideosCourse}/${id}`, {
      method: 'PUT',
      body: fd
    })).json()
    if (!error) dispatch('GET_VIDEO_COURSE_ID', id)
  },
  async CREATE_VIDEOS_COURSE ({
    getters,
    dispatch
  }, payload) {
    const response = await (await fetch(`${getters.userCreateVideosCourse}/${payload.id}`, {
      method: 'POST',
      body: payload.fd
    })).json()
    console.log(response)
    if (!response.error) {
      dispatch('GET_USER_COURSES', payload.userId)
      dispatch('GET_USER_COURSE_ID', payload.id)
    }
  },
  async GET_VIDEO_COURSE_ID ({
    getters,
    commit,
    dispatch
  }, id) {
    const {
      video,
      error
    } = await (await fetch(`${getters.userCourseFindVideoEndpoint}/${id}`)).json()
    if (!error) {
      commit('CURRENT_VIDEOS', video)
      commit('CURRENT_VIDEOS_ID', id)
    }
  },
  async CREATE_ONLINE_COURSE ({
    getters,
    commit,
    dispatch
  }, payload) {
    commit('LOADING', true)
    commit('ERROR', null)
    const {
      newOnlineCourse,
      error
    } = await (await fetch(getters.userCreateOnlineCourseEndpoint, {
      method: 'POST',
      body: payload.fd
    })).json()
    if (!error) {
      dispatch('GET_USER_COURSES', payload.userId)
      dispatch('GET_USER_COURSE_ID', newOnlineCourse._id)
      commit('LOADING', false)
    } else {
      commit('LOADING', false)
      commit('ERROR', error)
    }
    console.log(newOnlineCourse)
  },
  async REMOVE_VIDEO_COURSE ({
    getters,
    commit,
    dispatch
  }, {
    id,
    courseId
  }) {
    const {
      error
    } = await (await fetch(`${getters.userCreateVideosCourse}/${id}`, {
      method: 'DELETE'
    })).json()
    if (!error) {
      console.log(courseId)
      dispatch('GET_USER_COURSE_ID', courseId)
    }
  },
  async ADD_PDF ({
    getters,
    dispatch
  }, {
    fd,
    videoId,
    userId,
    currentCourseId
  }) {
    const {
      error
    } = await (await fetch(`${getters.addPdfEndpoint}/${videoId}`, {
      method: 'POST',
      body: fd
    })).json()
    if (!error) {
      dispatch('GET_USER_COURSES', userId)
      dispatch('GET_USER_COURSE_ID', currentCourseId)
      dispatch('GET_VIDEO_COURSE_ID', videoId)
    }
  },
  async REMOVE_PDF ({
    getters,
    dispatch,
    commit
  }, {
    id,
    userId,
    videoId,
    currentCourseId
  }) {
    commit('ERROR', null)
    const {
      error
    } = await (await fetch(`${getters.removePdfEndpoint}/${id}`, {
      method: 'DELETE'
    })).json()
    if (!error) {
      commit('ERROR', null)
      dispatch('GET_USER_COURSES', userId)
      dispatch('GET_USER_COURSE_ID', currentCourseId)
      dispatch('GET_VIDEO_COURSE_ID', videoId)
    } else {
      commit('ERROR', error)
    }
  }

}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
