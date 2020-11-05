/* eslint-disable no-irregular-whitespace */

// import Vue from 'vue'
const state = {
  userCourses: null,
  currentCourseId: null
}
const getters = {
  userCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/online`,
  userCreateOnlineCourseEndpoint: (state, getters, rootState) => `${rootState.host}/course/new/online`
}
const mutations = {
  USER_COURSES: (state, payload) => {
    state.userCourses = payload
  },
  CURRENT_COURSE_ID: (state, payload) => {
    state.currentCourseId = payload
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
  async CREATE_ONLINE_COURSE ({
    getters, commit
  }, payload) {
    const {
      newOnlineCourse,
      error
    } = await (await fetch(getters.userCreateOnlineCourseEndpoint, {
      method: 'POST',
      body: payload
    })).json()
    if (!error) {
      const { _id } = newOnlineCourse
      commit('CURRENT_COURSE_ID', _id)
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
