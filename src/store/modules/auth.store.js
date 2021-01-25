/* eslint-disable quote-props */
const { postData, putData } = require('@/helpers').default;

// const errors = require('@/config/errors').default.onlineCourses
// const messages = require('@/config/messages').default.onlineCourses

const endpoints = require('@/config/endpoints').default.auth;

const state = {
  token: null,
  isLogged: false,
  user: {},
  authError: null,
  loading: false,
};

const getters = {
};

const mutations = {
  TOKEN: (state, payload) => {
    state.token = payload;
  },
  ISLOGGED: (state, payload) => {
    state.isLogged = payload;
  },
  USER: (state, payload) => {
    state.user = Object.assign({}, state.user, payload);
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  async IS_SIGNED({ dispatch }) {
    const token = localStorage.getItem('token');
    if (token) dispatch('CHECK_TOKEN', token);
  },
  async CHECK_TOKEN({ commit }, token) {
    const { user, error, statusCode } = await (
      await fetch(`${process.env.VUE_APP_API_URL}/${endpoints.checkToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();
    if (error || statusCode) {
      commit('TOKEN', null);
      if (statusCode === 401) localStorage.removeItem('token');
    } else {
      commit('TOKEN', token);
      commit('USER', user);
      commit('ISLOGGED', !!user);
      localStorage.setItem('token', token);
    }
  },
  async LOG_OUT({ commit }) {
    commit('TOKEN', null);
    commit('USER', null);
    commit('ISLOGGED', false);
    localStorage.removeItem('token');
  },
  async SIGN_IN({ commit, dispatch }, payload) {
    commit('LOADING', true);
    const res = await fetch(`${process.env.VUE_APP_API_URL}/${endpoints.signIn}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
    const bearer = res.headers.get('Authorization');
    const { error } = await res.json();
    if (bearer && !error) {
      const token = bearer.split(' ')[1];
      dispatch('CHECK_TOKEN', token);
    } else {
      commit('ERROR', error);
    }
    commit('LOADING', false);
  },
  async SIGN_UP({ commit, dispatch }, payload) {
    commit('LOADING', true);
    const { error } = 
      await postData(endpoints.signUp, payload)
    if (!error) {
      const { email, password } = payload;
      dispatch('SIGN_IN', { email, password });
    } else {
      commit('ERROR', error);
    }
    commit('LOADING', false);
  },
  async EDIT_USER({ commit }, payload) {
    commit('LOADING', true);
    const { data, error } = 
      await putData(`${endpoints.user}/${state.user._id}`, payload)
    if (!error) {
      commit('USER', data);
    } else {
      commit('ERROR', error);
    }
    commit('LOADING', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
