const state = {
  onlineCourses: [],
  onlineCourseById: {}
}

const getters = {
  onlineCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/online`
}

const mutations = {
  ONLINE_COURSES: (state, payload) => {
    state.onlineCourses = payload.onlineCourses
  },
  ONLINE_COURSE_BY_ID: (state, payload) => {
    state.onlineCourseById = payload.onlineCourse
  }
}

const actions = {
  async GET_ONLINE_COURSES ({ state, getters, commit }) {
    const response = await (await fetch(`${getters.onlineCoursesEndpoint}`)).json()
    commit('ONLINE_COURSES', response)
    return state.onlineCourses
  },
  async GET_ONLINE_COURSE_BY_ID ({ state, getters, commit }, { id }) {
    const response = await (await fetch(`${getters.onlineCoursesEndpoint}/${id}`)).json()
    commit('ONLINE_COURSE_BY_ID', response)
    return state.onlineCourseById
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
