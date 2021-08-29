import { api } from './../../helpers/api';
import { storage } from './../../helpers/storage';
import router from './../../router';

const errors = require('@/config/errors').default.auth;
const { requestReset, resetPass, changePass, signUpMessage } = require('@/config/messages').default.auth;

const endpoints = require('@/config/endpoints').default.auth;

const state = {
  isLogged: false,
  user: null,
  loading: false,
};

const getters = {};

const mutations = {
  IS_LOGGED: (state, payload) => {
    state.isLogged = payload;
  },
  USER: (state, payload) => {
    state.user = payload;
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
  LOGOUT: state => {
    storage.clearAuthorization();
    state.user = null;
    state.isLogged = false;
  },
};

const actions = {
  GET_PROFILE({ commit, dispatch }) {
    api.get(endpoints.profile)
      .then((res) => {
        commit('USER', res.data);
        commit('IS_LOGGED', true);
      })
      .catch(() => {
        dispatch('CLEAR_USER')
      })
  },

  LOG_OUT({ commit }, all) {
    api.post(endpoints.logout, { all })
      .then(() => commit('LOGOUT'))
      .catch(() => commit('ERROR', errors.get, { root: true }))

  },

  CLEAR_USER({ commit }) {
    commit('USER', null);
    commit('IS_LOGGED', false);
    if (router.history.current.name !== 'home') {
      router.push({
        name: 'home'
      })
    }
  },

  SIGN_IN({ commit, dispatch }, payload) {
    commit('LOADING', true);
    api.post(endpoints.login, payload)
      .then((res) => {
        storage.saveAuthorization(res.data);
        dispatch('GET_PROFILE');
      })
      .catch((error) => {
        commit('ERROR', { ...errors.signIn, errorMessage: error.data.message }, { root: true })
      })
      .finally(() => commit('LOADING', false))
  },

  SIGN_UP({ commit }, payload) {
    commit('LOADING', true);
    api.post(endpoints.registration, payload)
      .then((res) => {
        storage.saveAuthorization(res.data);
        commit('MESSAGE', { ...signUpMessage, messageText: signUpMessage.messageText + ` ${payload.email}` }, { root: true });
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
      .finally(() => commit('LOADING', false))
  },
  EDIT_USER({ commit }, payload) {
    commit('LOADING', true);
    api.patch(endpoints.profile, payload)
      .then((res) => commit('USER', res.data))
      .catch(() => commit('ERROR', errors.put, { root: true }))
      .finally(() => commit('LOADING', false))
  },

  CHANGE_PASSWORD({ commit }, payload) {
    api.post(endpoints.change, payload)
      .then(() => {
        commit('MESSAGE', changePass, { root: true });
        return true;
      })
      .catch((error) => {
        commit(
          'ERROR',
          {
            error: true,
            errorType: 'Change password',
            errorMessage: error.data.message,
          },
          { root: true }
        );
        return false;
      })
  },

  REQUEST_RESET({ commit }, payload) {
    api.post(endpoints.reset, { email: payload })
      .then(() => {
        commit('MESSAGE', requestReset, { root: true });
        return true;
      })
      .catch((error) => {
        commit(
          'ERROR',
          {
            error: true,
            errorType: 'Request reset',
            errorMessage: error.data.message,
          },
          { root: true }
        );
        return false;
      })
  },

  RESTORE({ commit }, payload) {
    api.post(endpoints.restore, payload)
      .then(() => {
        commit('MESSAGE', resetPass, { root: true });
        return true;
      })
      .catch((error) => {
        commit(
          'ERROR',
          {
            error: true,
            errorType: 'Restore password',
            errorMessage: error.response.data.message,
          },
          { root: true }
        );
        return false;
      })
  },
  ACTIVATION({ commit }, hash) {
    api.get(`${endpoints.activate}/${hash}`)
      .then(() => console.log('success'))
      .catch((error) => {
        console.log('failed')
        commit(
          'ERROR',
          {
            error: true,
            errorType: 'Activate account',
            errorMessage: error.response.data.message,
          },
          { root: true }
        );
      })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
