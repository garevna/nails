/* eslint-disable quote-props */
const state = {
  token: null,
  role: 'Guest',
  isLogged: false,
  user: {},
  authError: null,
  loading: false,
};

const getters = {
  authorizationEndpoint: (state, getters, rootState) => `${rootState.host}/auth/signin`,
  registrationEndpoint: (state, getters, rootState) => `${rootState.host}/auth/signup`,
  checkTokenEndpoint: (state, getters, rootState) => `${rootState.host}/user/findByJwt`,
  editUserEndpoint: (state, getters, rootState) => `${rootState.host}/user/`,
};

const mutations = {
  ROLE: (state, payload) => {
    state.role = payload;
  },
  TOKEN: (state, payload) => {
    state.token = payload;
  },
  ISLOGGED: (state, payload) => {
    state.isLogged = payload;
  },
  USER: (state, payload) => {
    state.user = payload;
  },
  ERROR: (state, payload) => {
    state.authError = payload;
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
  async CHECK_TOKEN({ getters, commit }, token) {
    const { user, error, statusCode } = await (
      await fetch(getters.checkTokenEndpoint, {
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
    }
  },
  async LOG_OUT({ commit }) {
    commit('TOKEN', null);
    commit('USER', null);
    commit('ISLOGGED', false);
    localStorage.removeItem('token');
  },
  async SIGN_IN({ getters, commit, dispatch }, payload) {
    commit('LOADING', true);
    commit('ERROR', null);
    const res = await fetch(getters.authorizationEndpoint, {
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
      commit('TOKEN', token);
      localStorage.setItem('token', token);
      commit('LOADING', false);
    } else {
      commit('ERROR', error);
      commit('LOADING', false);
    }
    // if (bearer) {
    //   const token = bearer.split(' ')[1]
    //   const { error } = await res.json()
    //   if (!error) {
    //     dispatch('CHECK_TOKEN', token)
    //     commit('TOKEN', token)
    //     localStorage.setItem('token', token)
    //     commit('LOADING', false)
    //   } else {
    //     commit('ERROR', error)
    //     commit('LOADING', false)
    //   }
    // } else {
    //   commit('ERROR', 'Something wrong')
    //   commit('LOADING', false)
    // }
  },
  async SIGN_UP({ getters, commit, dispatch }, payload) {
    commit('LOADING', true);
    commit('ERROR', null);
    const { error } = await (
      await fetch(getters.registrationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(payload),
      })
    ).json();
    if (!error) {
      const { email, password } = payload;
      dispatch('SIGN_IN', { email, password });
      commit('LOADING', false);
    } else {
      commit('ERROR', error);
      commit('LOADING', false);
    }
  },
  async SET_ROLE({ commit }, payload) {
    commit('ROLE', payload);
  },
  async EDIT_USER({ getters, commit }, payload) {
    commit('LOADING', true);
    commit('ERROR', null);
    const { error } = await (
      await fetch(`${getters.editUserEndpoint}${state.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    ).json();
    if (!error) {
      commit('USER', payload);
      commit('LOADING', false);
      commit('ERROR', null);
    } else {
      commit('LOADING', false);
      commit('ERROR', error);
    }
  },
  async AUTH_ERROR({ commit }) {
    commit('ERROR', 'Please, sign in or create an account');
  },
  async CLEAR_AUTH_ERROR({ commit }) {
    commit('ERROR', null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
