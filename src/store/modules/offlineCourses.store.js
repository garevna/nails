const { getData, postData } = require('@/helpers').default;

// const errors = require('@/config/errors').default.onlineCourses
// const messages = require('@/config/messages').default.onlineCourses

const endpoints = require('@/config/endpoints').default.offlineCourses;

const state = {
  courses:
    'Integer a erat accumsan, facilisis massa a, fringilla lacus. Praesent eget mollis metus, eu blandit erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed id rutrum nisl. In quis nulla et libero pretium consectetur ultricies vel elit. Cras commodo diam vitae porta viverra. Vestibulum dapibus imperdiet lacinia. Phasellus interdum quis erat a aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vel mauris nec dolor rutrum vulputate dapibus quis lectus.',
  offlineCourses: [],
  offlineCourse: null,
  totalOfflineCourses: 0,
};

const getters = {
  // offlineCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/offline`
};

const mutations = {
  OFFLINE_COURSES: (state, payload) => {
    state.offlineCourses = payload.offlineCourses;
    state.totalOfflineCourses = payload.total;
  },
  MORE_OFFLINE_COURSES: (state, payload) => {
    state.offlineCourses = [...state.offlineCourses, ...payload.offlineCourses];
    state.totalOfflineCourses = payload.total;
  },
  OFFLINE_COURSE_BY_ID: (state, payload) => {
    state.offlineCourse = payload;
  },
  OFFLINE_COURSE_BY_ID_CLEAR: state => {
    state.offlineCourse = null;
  },
};

const actions = {
  async GET_OFFLINE_COURSES({ commit }) {
    const response = await getData(endpoints.get);
    commit('OFFLINE_COURSES', response);
    // return state.offlineCourses
  },
  async GET_MORE_OFFLINE_COURSES({ commit }, skip ) {
    const response = await getData(`${endpoints.get}?skip=${skip}`);
    commit('MORE_OFFLINE_COURSES', response);
    // return state.offlineCourses
  },
  async GET_COURSE({ commit }, id ) {
    const { offlineCourse } = await getData(`${endpoints.get}/${id}`);
    commit('OFFLINE_COURSE_BY_ID', offlineCourse);
    // return state.offlineCourse
  },
  async BUY_COURSE(_store, payload) {
    const { data, error } = await postData(endpoints.buyCourse, payload);
    if (!error && data.link) {
      window.open(data.link);
      // data: {link: "https://invoice.stripe.com/i/acct_1HhAsJH7jhGffcki/invst_IeJ4ZqdsRng0CAP4uFRkgD59DtVwGYW",…}
      // invoicePdf: "https://pay.stripe.com/invoice/acct_1HhAsJH7jhGffcki/invst_IeJ4ZqdsRng0CAP4uFRkgD59DtVwGYW/pdf"
      // link: "https://invoice.stripe.com/i/acct_1HhAsJH7jhGffcki/invst_IeJ4ZqdsRng0CAP4uFRkgD59DtVwGYW"
      // error: null
    }
  },
  async CLEAR_OFFLINE_COURSE_BY_ID({ commit }) {
    commit('OFFLINE_COURSE_BY_ID_CLEAR');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
