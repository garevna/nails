import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'https://nails-australia-staging.herokuapp.com',
    buttonForDetailOfflineShop: 'Apply',
    buttonForRegistrationOfflineShop: 'CONFIRM DETAILS AND PROCEED WITH PAYMENT',
    buttonForRegistrationOnlineShop: 'BUY THIS COURSE',
    viewportWidth: window.innerWidth
  },
  modules,
  getters: {
    //
  },
  mutations: {
    CHANGE_VIEWPORT_WIDTH: (state) => { state.viewportWidth = window.innerWidth }
  },
  actions: {
    //
  }
})
