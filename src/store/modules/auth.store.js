/* eslint-disable quote-props */
const { postData, putData } = require('@/helpers').default;

const errors = require('@/config/errors').default.auth;
const { requestReset, resetPass, changePass } = require('@/config/messages').default.auth;

const endpoints = require('@/config/endpoints').default.auth;

const state = {
  token: null,
  isLogged: false,
  user: null,
  loading: false,
};

const getters = {};

const mutations = {
  TOKEN: (state, payload) => {
    state.token = payload;
  },
  IS_LOGGED: (state, payload) => {
    state.isLogged = payload;
  },
  USER: (state, payload) => {
    state.user = Object.assign({}, state.user, payload);
  },
  LOGOUT: (state, payload) => {
    state.user = payload;
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
      // commit('ERROR', errors.get, { root: true })
      if (statusCode === 401) localStorage.removeItem('token');
    } else {
      commit('TOKEN', token);
      commit('USER', user);
      commit('IS_LOGGED', !!user);
      localStorage.setItem('token', token);
    }
  },
  async LOG_OUT({ commit }) {
    commit('TOKEN', null);
    commit('LOGOUT', null);
    commit('IS_LOGGED', false);
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
      commit(
        'ERROR',
        {
          ...errors.signIn,
          errorMessage: error,
        },
        { root: true }
      );
    }
    commit('LOADING', false);
  },
  async SIGN_UP({ commit, dispatch }, payload) {
    commit('LOADING', true);
    const { error } = await postData(endpoints.signUp, payload);
    if (!error) {
      const { email, password } = payload;
      dispatch('SIGN_IN', { email, password });
    } else {
      commit('ERROR', errors.signUp, { root: true });
    }
    commit('LOADING', false);
  },
  async EDIT_USER({ commit }, payload) {
    commit('LOADING', true);
    const { data, error } = await putData(`${endpoints.user}/${state.user._id}`, payload);
    if (!error) {
      commit('USER', data);
    } else {
      commit('ERROR', errors.put, { root: true });
    }
    commit('LOADING', false);
  },
  async CHANGE_PASSWORD(ctx, payload) {
    const { error } = await (
      await fetch(`${process.env.VUE_APP_API_URL}/${endpoints.change}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${ctx.state.token}`,
        },
        body: JSON.stringify(payload),
      })
    ).json();
    if (!error) {
      ctx.commit('MESSAGE', changePass, { root: true });
      return true;
    } else {
      ctx.commit(
        'ERROR',
        {
          error: true,
          errorType: 'Change password',
          errorMessage: error,
        },
        { root: true }
      );
      return false;
    }
  },
  async REQUEST_RESET(ctx, payload) {
    const { error } = await postData(endpoints.reset, { email: payload });
    if (!error) {
      ctx.commit('MESSAGE', requestReset, { root: true });
      return true;
    } else {
      ctx.commit(
        'ERROR',
        {
          error: true,
          errorType: 'Request reset',
          errorMessage: error,
        },
        { root: true }
      );
      return false;
    }
  },
  async RESTORE(ctx, payload) {
    const { error } = await postData(endpoints.restore, payload);
    if (!error) {
      ctx.commit('MESSAGE', resetPass, { root: true });
      return true;
    } else {
      ctx.commit(
        'ERROR',
        {
          error: true,
          errorType: 'Restore password',
          errorMessage: error,
        },
        { root: true }
      );
      return false;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
