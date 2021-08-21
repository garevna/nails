import { api } from './../../helpers/api';

const endpoints = require('@/config/endpoints').default.delivery;
const { buyBasket } = require('@/config/endpoints').default.payment;
const errors = require('@/config/errors').default.online;
// const messages = require('@/config/messages').default.online;

const state = {
  express: null,
  standard: null,
  international: [],
  pickup: null,
  loading: false,
};
const getters = {};
const mutations = {
  STANDARD: (state, payload) => {
    state.standard = payload;
  },
  EXPRESS: (state, payload) => {
    state.express = payload;
  },
  INTERNATIONAL: (state, payload) => {
    state.international = payload ?? [];
  },
  PICKUP: (state, payload) => {
    state.pickup = payload;
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  async GET_DELIVERY_PRICES({ commit, dispatch }) {
    // commit('LOADING', true, {
    //   root: true,
    // });
    commit('STANDARD', (await dispatch('GET_PRICES', 'standard'))[0]);
    commit('PICKUP', (await dispatch('GET_PRICES', 'pickup'))[0]);
    commit('EXPRESS', (await dispatch('GET_PRICES', 'express'))[0]);
    commit('INTERNATIONAL', await dispatch('GET_PRICES', 'international'));
    // commit('LOADING', false, {
    //   root: true,
    // });
  },
  async GET_PRICES(ctx, type) {
    const params = { type };
    const res = await api.get(endpoints.get, { params });
    if (res.statusText === 'OK') {
      return res.data;
    }
    return [];
  },
  async PAY({ commit, dispatch }, cart) {
    commit('LOADING', true);
    const res = await api.post(buyBasket, cart);
    if (res.statusText === 'Created') {
      // window.open(data.link);
      window.location = res.data.link;
      dispatch('productCart/CLEAR_CART', {}, { root: true });
      commit('LOADING', false);
      return true;
    } else {
      commit('ERROR', errors.buy, { root: true });
      commit('LOADING', false);
      return false;
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
