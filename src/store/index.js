import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    errorMessage: '',
    errorType: '',
    message: null,
    messageType: '',
    messageText: '',
    viewportWidth: window.innerWidth
  },
  modules,
  getters: {
    //
  },
  mutations: {
    ERROR (state, payload) {
      if (!payload) {
        state.error = false
        state.errorType = ''
        state.errorMessage = ''
      } else {
        state.error = payload.error
        state.errorType = payload.errorType
        state.errorMessage = payload.errorMessage
      }
    },
    MESSAGE (state, payload) {
      if (!payload) {
        state.message = false
        state.messageType = ''
        state.messageText = ''
      } else {
        state.message = payload.message
        state.messageType = payload.messageType
        state.messageText = payload.messageText
      }
    },
    CHANGE_VIEWPORT_WIDTH: state => {
      state.viewportWidth = window.innerWidth
    }
  },
  actions: {
    //
  }
})
