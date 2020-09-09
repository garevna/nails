const state = {
  onlineCourses: []
}

const getters = {
  onlineCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/online`
}

const mutations = {
  ONLINE_COURSES: (state, payload) => {
    state.onlineCourses = payload.onlineCourses
  }
}

const actions = {
  async GET_ONLINE_COURSES ({ state, getters, commit }) {
    const response = await (await fetch(`${getters.onlineCoursesEndpoint}`)).json()
    commit('ONLINE_COURSES', response)
    return state.onlineCourses
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
