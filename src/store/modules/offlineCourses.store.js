const state = {
  courses: 'Integer a erat accumsan, facilisis massa a, fringilla lacus. Praesent eget mollis metus, eu blandit erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed id rutrum nisl. In quis nulla et libero pretium consectetur ultricies vel elit. Cras commodo diam vitae porta viverra. Vestibulum dapibus imperdiet lacinia. Phasellus interdum quis erat a aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vel mauris nec dolor rutrum vulputate dapibus quis lectus.',
  offlineCourses: [],
  offlineCourseById: {}
}

const getters = {
  offlineCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/offline`
  // offlineCourseByIdEndpoint: (state, getters, rootState) => `${rootState.host}/course/offline/${id}`
}

const mutations = {
  OFFLINE_COURSES: (state, payload) => {
    state.offlineCourses = payload.offlineCourses
  },
  OFFLINE_COURSE_BY_ID: (state, payload) => {
    state.offlineCourseById = payload.offlineCourse
  }
}

const actions = {
  async GET_OFFLINE_COURSES ({ state, getters, commit }) {
    const response = await (await fetch(`${getters.offlineCoursesEndpoint}`)).json()
    commit('OFFLINE_COURSES', response)
    return state.offlineCourses
  },
  async GET_OFFLINE_COURSE_BY_ID ({ state, getters, commit }, { id }) {
    const response = await (await fetch(`${getters.offlineCoursesEndpoint}/${id}`)).json()
    commit('OFFLINE_COURSE_BY_ID', response)
    return state.offlineCourseById
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}