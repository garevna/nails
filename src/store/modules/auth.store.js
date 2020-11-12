/* eslint-disable quote-props */
import Vue from 'vue'

const state = {
  token: null,
  role: 'Guest',
  isLogged: false,
  user: {},
  error: null,
  loading: false
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
  },
  ERROR: (state, payload) => {
    state.error = payload
  },
  LOADING: (state, payload) => {
    state.loading = payload
  }
}

const actions = {
  // ---------------------
  async IS_SIGNED ({ getters, commit, dispatch }) {
    const token = localStorage.getItem('token')
    if (token) dispatch('CHECK_TOKEN', token)
  },
  async CHECK_TOKEN ({ getters, commit, dispatch }, token) {
    const { user, error, statusCode } = await (await fetch(
      getters.checkTokenEndpoint,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`
        }
      }
    )).json()
    if (error || statusCode) {
      commit('TOKEN', null)
      if (statusCode === 401) localStorage.removeItem('token')
    } else {
      commit('TOKEN', token)
      commit('USER', user)
      commit('ISLOGGED', !!user)
    }
  },
  async LOG_OUT ({ getters, commit, dispatch }) {
    commit('TOKEN', null)
    commit('USER', null)
    commit('ISLOGGED', false)
    localStorage.removeItem('token')
  },
  async SIGN_IN ({ getters, commit, dispatch }, payload) {
    commit('LOADING', true)
    commit('ERROR', null)
    const res = (await fetch(
      getters.authorizationEndpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
      }
    ))
    const bearer = res.headers.get('Authorization')
    if (bearer) {
      const token = bearer.split(' ')[1]
      const { error } = await res.json()
      if (!error) {
        dispatch('CHECK_TOKEN', token)
        commit('TOKEN', token)
        localStorage.setItem('token', token)
        commit('LOADING', false)
      } else {
        commit('ERROR', error)
        commit('LOADING', false)
        // Vue.notify({
        //   group: 'foo',
        //   type: 'error',
        //   text: error
        // })
      }
    } else {
      commit('ERROR', 'Something wrong')
      commit('LOADING', false)
      // Vue.notify({
      //   group: 'foo',
      //   type: 'error',
      //   text: 'Something wrong'
      // })
    }
  },
  async SIGN_UP ({ getters, commit, dispatch }, payload) {
    commit('LOADING', true)
    commit('ERROR', null)
    const { error } =
      await (await fetch(
        getters.registrationEndpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(payload)
        }
      )).json()
    if (!error) {
      const { email, password } = payload
      dispatch('SIGN_IN', { email, password })
      commit('LOADING', false)
    } else {
      commit('ERROR', error)
      commit('LOADING', false)
      // Vue.notify({
      //   group: 'foo',
      //   type: 'error',
      //   text: error
      // })
    }
  },
  // -----------------------
  // async AUTHORIZATION_USER ({ getters, commit }, payload) {
  //   const res = await fetch(
  //     getters.authorizationEndpoint,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(payload)
  //     }
  //   )
  //   const bearer = res.headers.get('Authorization')
  //   if (bearer) {
  //     const token = bearer.split(' ')[1]
  //     localStorage.setItem('token', token)
  //     commit('TOKEN', token)
  //     // commit('ISLOGGED', true)
  //     const { user } = await (await fetch(
  //       getters.checkTokenEndpoint,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${state.token}`
  //         }
  //       }
  //     )).json()
  //     if (user) {
  //       commit('USER', user)
  //       commit('ISLOGGED', !!user)
  //     }
  //   } else {
  //     const { error } = await res.json()
  //     Vue.notify({
  //       group: 'foo',
  //       type: 'error',
  //       text: error
  //     })
  //     commit('TOKEN', null)
  //     commit('ISLOGGED', false)
  //   }
  // },
  // async REGISTRATION_USER ({ getters, commit }, payload) {
  //   const response =
  //     await (await fetch(
  //       getters.registrationEndpoint,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(payload)
  //       }
  //     )).json()
  //   console.log(response)
  //   if (!response.error) {
  //     // tttttttttttttttttttttttttttttttttttuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu

  //     const res = await fetch(
  //       getters.authorizationEndpoint,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ password: payload.password, email: payload.email })
  //       }
  //     )
  //     const bearer = res.headers.get('Authorization')
  //     if (bearer) {
  //       const token = bearer.split(' ')[1]
  //       localStorage.setItem('token', token)
  //       commit('TOKEN', token)
  //       // commit('ISLOGGED', true)
  //       const { user } = await (await fetch(
  //         getters.checkTokenEndpoint,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${state.token}`
  //           }
  //         }
  //       )).json()
  //       if (user) {
  //         commit('USER', user)
  //         commit('ISLOGGED', !!user)
  //       }
  //     } else {
  //       const { error } = await res.json()
  //       Vue.notify({
  //         group: 'foo',
  //         type: 'error',
  //         text: error
  //       })
  //       commit('TOKEN', null)
  //       commit('ISLOGGED', false)
  //     }
  //     // iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
  //   } else {
  //     console.log(response.error)
  //     Vue.notify({
  //       group: 'foo',
  //       type: 'error',
  //       text: response.error
  //     })
  //   }
  // },
  // async GET_USER ({ getters, commit }) {
  //   if (state.token) {
  //     const { user } = await (await fetch(
  //       getters.checkTokenEndpoint,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${state.token}`
  //         }
  //       }
  //     )).json()
  //     commit('USER', user)
  //     commit('ISLOGGED', !!user)
  //   }
  // },
  async SET_ROLE ({ commit }, payload) {
    commit('ROLE', payload)
  },
  // async SET_TOKEN ({ commit }, payload) {
  //   commit('TOKEN', payload)
  //   localStorage.setItem('token', payload)
  // },
  // async LOGOUT ({ commit }) {
  //   commit('ISLOGGED', false)
  //   commit('TOKEN', null)
  //   localStorage.removeItem('token')
  // },
  // async GET_TOKEN ({ commit }) {
  //   if (!state.token) {
  //     const token = localStorage.getItem('token')
  //     if (token) {
  //       commit('TOKEN', token)
  //       // return token
  //     }
  //   }
  //   // return state.token
  // },
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
