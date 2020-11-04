const state = {
  courses: 'Integer a erat accumsan, facilisis massa a, fringilla lacus. Praesent eget mollis metus, eu blandit erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed id rutrum nisl. In quis nulla et libero pretium consectetur ultricies vel elit. Cras commodo diam vitae porta viverra. Vestibulum dapibus imperdiet lacinia. Phasellus interdum quis erat a aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vel mauris nec dolor rutrum vulputate dapibus quis lectus.',
  offlineCourses: [],
  offlineCourseById: {},
  offlineCourseByIdImg: '',
  totalOfflineCourses: 0
}

const getters = {
  offlineCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/offline`
}

const mutations = {
  OFFLINE_COURSES: (state, payload) => {
    state.offlineCourses = payload.offlineCourses
    state.totalOfflineCourses = payload.total
  },
  MORE_OFFLINE_COURSES: (state, payload) => {
    state.offlineCourses = [...state.offlineCourses, ...payload.offlineCourses]
    state.totalOfflineCourses = payload.total
  },
  OFFLINE_COURSE_BY_ID: (state, payload) => {
    state.offlineCourseById = payload
  },
  OFFLINE_COURSE_BY_ID_IMG: (state, payload) => {
    state.offlineCourseByIdImg = payload
  },
  OFFLINE_COURSE_BY_ID_CLEAR: (state) => {
    state.offlineCourseById = {}
    state.offlineCourseByIdImg = ''
  }
}

const actions = {
  async GET_OFFLINE_COURSES ({ state, getters, commit }) {
    const response = await (await fetch(`${getters.offlineCoursesEndpoint}`)).json()
    commit('OFFLINE_COURSES', response)
    // return state.offlineCourses
  },
  async GET_MORE_OFFLINE_COURSES ({ state, getters, commit }, { skip }) {
    const response = await (await fetch(`${getters.offlineCoursesEndpoint}?skip=${skip}`)).json()
    commit('MORE_OFFLINE_COURSES', response)
    // return state.offlineCourses
  },
  async GET_OFFLINE_COURSE_BY_ID ({ state, getters, commit }, { id }) {
    const { offlineCourse } = await (await fetch(`${getters.offlineCoursesEndpoint}/${id}`)).json()
    let img
    if (offlineCourse.photo && Array.isArray(offlineCourse.photo) && offlineCourse.photo.length) {
      img = offlineCourse.photo[0].link
    }
    if (!img) {
      img = require('@/assets/noImage.jpg')
    }
    commit('OFFLINE_COURSE_BY_ID', offlineCourse)
    commit('OFFLINE_COURSE_BY_ID_IMG', img)
    // return state.offlineCourseById
  },
  async CLEAR_OFFLINE_COURSE_BY_ID ({ commit }) {
    commit('OFFLINE_COURSE_BY_ID_CLEAR')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
