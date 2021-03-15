const { getData } = require('@/helpers').default;

const endpoints = require('@/config/endpoints').default.delivery;
// const errors = require('@/config/errors').default.online;
// const messages = require('@/config/messages').default.online;

const state = {
  express: null,
  standard: null,
  international: [],
  pickup: {
    country: 'Australia',
    countryCode: 'AUS',
    flag: 'https://nails-australia-staging.herokuapp.com/flags/aus.svg',
    price: 0,
    type: 'pickup',
    _id: '604b30ea4955c5f8cf9726cc',
  },
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
};

const actions = {
  async GET_DELIVERY_PRICES({ commit, dispatch }) {
    // commit('LOADING', true, {
    //   root: true,
    // });
    commit('STANDARD', (await dispatch('GET_PRICES', 'standard'))[0]);
    // commit('PICKUP', (await dispatch('GET_PRICES', 'pickup'))[0]);
    commit('EXPRESS', (await dispatch('GET_PRICES', 'express'))[0]);
    commit('INTERNATIONAL', await dispatch('GET_PRICES', 'international'));
    // commit('LOADING', false, {
    //   root: true,
    // });
  },

  async GET_PRICES(ctx, type) {
    const { data } = await getData(`${endpoints.get}?type=${type}`);
    return data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
