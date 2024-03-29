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
const getters = {
  minimumDeliveryPrice: (state) => {
      const express = state.express?.price || 0
      const standard = state.standard?.price || 0
      const prices = state.international || []
      const international = Math.min(...prices.map(country => country.price))
      return Math.min(express, standard, international)
    },
};
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
  GET_PRICES(ctx, type) {
    const params = { type };
    let resolve = null
    const promise = new Promise((res) => resolve = res)
    api.get(endpoints.get, { params })
      .then((res) => resolve(res.data))
      .catch(() => resolve(null))
    return promise
  },
  PAY({ commit, dispatch }, cart) {
    commit('LOADING', true);
    api.post(buyBasket, cart)
      .then((res) => {
        dispatch('productCart/CLEAR_CART', {}, { root: true });
        window.location = res.data.link;
      })
      .catch(() => {
        commit('ERROR', errors.buy, { root: true });
      })
      .finally(() => commit('LOADING', false))
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
