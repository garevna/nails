/* eslint-disable no-irregular-whitespace */

// import Vue from 'vue'
const state = {
  userCourses: null
}
const getters = {
  userCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/online`,
  userCreateOnlineCourseEndpoint: (state, getters, rootState) => `${rootState.host}/course/new/online`
}
const mutations = {
  USER_COURSES: (state, payload) => {
    state.userCourses = payload
  }
}
const actions = {
  async GET_USER_COURSES ({
    getters,
    commit
  }, payload) {
    const { onlineCourses } = await (await fetch(`${getters.userCoursesEndpoint}?userId=${payload}`)).json()
    commit('USER_COURSES', onlineCourses)
  },
  async CREATE_VIDEO_COURSES ({
    getters
  }, payload) {
    const response = await (await fetch(getters.userCreateOnlineCourseEndpoint, {
      method: 'POST',
      body: payload
    })).json()
    console.log(response)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
