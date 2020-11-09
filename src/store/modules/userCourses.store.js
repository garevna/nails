/* eslint-disable no-irregular-whitespace */

const state = {
  userCourses: null,
  currentCourseId: null,
  currentCourse: null,
  currentCourseVideos: null,
  currentVideoId: null,
  currentVideo: null
}
const getters = {
  userCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/online`,
  userCreateOnlineCourseEndpoint: (state, getters, rootState) => `${rootState.host}/course/new/online`,
  userCreateVideosCourse: (state, getters, rootState) => `${rootState.host}/course/online/video`,
  userCourseFindVideoEndpoint: (state, getters, rootState) => `${rootState.host}/course/online/findvideo`
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
  }, { data, id }) {
    const {
      error
      // updatedOnlineCourse
    } = await (await fetch(`${getters.userCoursesEndpoint}/${id}`), {
      method: 'PUT',
      body: data
    }).json()
    // commit('CURRENT_COURSE', updatedOnlineCourse)
    // commit('CURRENT_COURSE_VIDEOS', updatedOnlineCourse.videos)
    // userCourses/GET_USER_COURSE_ID
    commit('CURRENT_COURSE_ID', id)
    if (!error) dispatch('userCourses/GET_USER_COURSE_ID', id)
  },
  async PUT_ONLINE_COURSE_ID ({ // ???!!!
    getters,
    commit,
    dispatch
  }, { data, id }) {
    const {
      error
      // updatedonline
    } = await (await fetch(`${getters.userCreateVideosCourse}/${id}`), {
      method: 'PUT',
      body: data
    }).json()
    if (!error) dispatch('userCourses/GET_USER_COURSE_ID', id)
  },
  async CREATE_VIDEOS_COURSE ({ getters, dispatch }, payload) {
    const response = await (await fetch(`${getters.userCreateVideosCourse}/${payload.id}`, {
      method: 'POST',
      body: payload.fd
    })).json()
    console.log(response)
    if (!response.error) dispatch('userCourses/GET_USER_COURSES', payload.userId)
  },
  async GET_VIDEOS_COURSE_ID ({ getters, commit, dispatch }, id) {
    const { video, error } = await (await fetch(`${getters.userCourseFindVideoEndpoint}/${id}`)).json()
    if (!error) {
      commit('CURRENT_VIDEOS', video)
      commit('CURRENT_VIDEOS_ID', id)
    }
  },
  async CREATE_ONLINE_COURSE ({
    getters, commit, dispatch
  }, payload) {
    const {
      newOnlineCourse,
      error
    } = await (await fetch(getters.userCreateOnlineCourseEndpoint, {
      method: 'POST',
      body: payload.fd
    })).json()
    if (!error) {
      // const { _id } = newOnlineCourse // ???!!!
      // commit('CURRENT_COURSE_ID', _id) // ???!!!
      dispatch('GET_USER_COURSES', payload.userId)
    }
    console.log(newOnlineCourse)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
