const state = {
  onlineCourses: [],
  onlineCourseById: {},
  onlineCourseByIdImg: '',
  totalOnlineCourses: 0
}

const getters = {
  onlineCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/online`
}

const mutations = {
  ONLINE_COURSES: (state, payload) => {
    state.onlineCourses = payload.onlineCourses
    state.totalOnlineCourses = payload.total
  },
  MORE_ONLINE_COURSES: (state, payload) => {
    state.onlineCourses = [...state.onlineCourses, ...payload.onlineCourses]
    state.totalOnlineCourses = payload.total
  },
  ONLINE_COURSE_BY_ID: (state, payload) => {
    state.onlineCourseById = payload.onlineCourse
  },
  ONLINE_COURSE_BY_ID_IMG: (state, payload) => {
    state.onlineCourseByIdImg = payload
  }
}

const actions = {
  async GET_ONLINE_COURSES ({ state, getters, commit }) {
    const response = await (await fetch(`${getters.onlineCoursesEndpoint}`)).json()
    commit('ONLINE_COURSES', response)
    return state.onlineCourses
  },
  async GET_MORE_ONLINE_COURSES ({ state, getters, commit }, { skip }) {
    const response = await (await fetch(`${getters.onlineCoursesEndpoint}?skip=${skip}`)).json()
    commit('MORE_ONLINE_COURSES', response)
    return state.onlineCourses
  },
  async GET_ONLINE_COURSE_BY_ID ({ state, getters, commit }, { id }) {
    const response = await (await fetch(`${getters.onlineCoursesEndpoint}/${id}`)).json()
    let img = response.onlineCourse?.photo[0]?.link
    if (!img) {
      img = require('@/assets/noImage.jpg')
    }
    commit('ONLINE_COURSE_BY_ID', response)
    commit('ONLINE_COURSE_BY_ID_IMG', img)
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
