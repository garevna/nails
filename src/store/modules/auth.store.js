/* eslint-disable quote-props */
import Vue from 'vue'

const state = {
  token: null,
  role: 'Guest',
  isLogged: false,
  user: {}
}

const getters = {
  authorizationEndpoint: (state, getters, rootState) => `${rootState.host}/auth/signin`,
  registrationEndpoint: (state, getters, rootState) => `${rootState.host}/auth/signup`,
  checkTokenEndpoint: (state, getters, rootState) => `${rootState.host}/user/findByJwt`,
  editUserEndpoint: (state, getters, rootState) => `${rootState.host}/user/`
}

const mutations = {
  ROLE: (state, payload) => {
    state.role = payload
  },
  TOKEN: (state, payload) => {
    state.token = payload
  },
  ISLOGGED: (state, payload) => {
    state.isLogged = payload
  },
  USER: (state, payload) => {
    state.user = payload
  }
}

const actions = {
  async AUTHORIZATION_USER ({ getters, commit }, payload) {
    const res = await fetch(
      getters.authorizationEndpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )
    const bearer = res.headers.get('Authorization')
    if (bearer) {
      const token = bearer.split(' ')[1]
      localStorage.setItem('token', token)
      commit('TOKEN', token)
      // commit('ISLOGGED', true)
      const { user } = await (await fetch(
        getters.checkTokenEndpoint,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          }
        }
      )).json()
      if (user) {
        commit('USER', user)
        commit('ISLOGGED', !!user)
      }
    } else {
      const { error } = await res.json()
      Vue.notify({
        group: 'foo',
        type: 'error',
        text: error
      })
      commit('TOKEN', null)
      commit('ISLOGGED', false)
    }
  },
  async REGISTRATION_USER ({ getters, commit }, payload) {
    const response =
      await (await fetch(
        getters.registrationEndpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      )).json()
    console.log(response)
    if (!response.error) {
      // tttttttttttttttttttttttttttttttttttuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu

      const res = await fetch(
        getters.authorizationEndpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password: payload.password, email: payload.email })
        }
      )
      const bearer = res.headers.get('Authorization')
      if (bearer) {
        const token = bearer.split(' ')[1]
        localStorage.setItem('token', token)
        commit('TOKEN', token)
        // commit('ISLOGGED', true)
        const { user } = await (await fetch(
          getters.checkTokenEndpoint,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${state.token}`
            }
          }
        )).json()
        if (user) {
          commit('USER', user)
          commit('ISLOGGED', !!user)
        }
      } else {
        const { error } = await res.json()
        Vue.notify({
          group: 'foo',
          type: 'error',
          text: error
        })
        commit('TOKEN', null)
        commit('ISLOGGED', false)
      }
      // iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    } else {
      console.log(response.error)
      Vue.notify({
        group: 'foo',
        type: 'error',
        text: response.error
      })
    }
  },
  async GET_USER ({ getters, commit }) {
    if (state.token) {
      const { user } = await (await fetch(
        getters.checkTokenEndpoint,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          }
        }
      )).json()
      commit('USER', user)
      commit('ISLOGGED', !!user)
    }
  },
  async SET_ROLE ({ commit }, payload) {
    commit('ROLE', payload)
  },
  // async SET_TOKEN ({ commit }, payload) {
  //   commit('TOKEN', payload)
  //   localStorage.setItem('token', payload)
  // },
  async LOGOUT ({ commit }) {
    commit('ISLOGGED', false)
    commit('TOKEN', null)
    localStorage.removeItem('token')
  },
  async GET_TOKEN ({ commit }) {
    if (!state.token) {
      const token = localStorage.getItem('token')
      if (token) {
        commit('TOKEN', token)
        // return token
      }
    }
    // return state.token
  },
  async EDIT_USER ({ getters, commit }, payload) {
    const response = await (await fetch(
      `${getters.editUserEndpoint}${state.user._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )).json()
    if (!response.error) {
      console.log(response)
      commit('USER', payload)
    } else {
      Vue.notify({
        group: 'foo',
        type: 'error',
        text: response.error
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
