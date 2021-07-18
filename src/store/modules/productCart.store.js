const { postData } = require('@/helpers').default;
const endpoints = require('@/config/endpoints').default.commodities;

const errors = require('@/config/errors').default.online;

const state = {
  cart: [],
  commodities: [],
};

const getters = {
  getSumPrice: (state, getters) => Math.trunc(getters.commodityCards.reduce((acc, curr) => (acc += curr.price * curr.count), 0) * 100) / 100,

  getTotalItem: state => state.cart.reduce((acc, curr) => (acc += curr.count), 0),

  commodityCards: state => {
    return state.commodities.map(commodity =>
      Object.assign({}, commodity, { count: state.cart.find(item => item._id === commodity._id)?.count ?? 1 })
    );
  },
};

const mutations = {
  CLEAR_CART: state => {
    state.cart = [];
  },
  SET_CART: (state, payload) => {
    state.cart = payload;
  },
  DELETE_FROM_CART: (state, payload) => {
    state.cart = state.cart.filter(el => el._id !== payload);
    // state.commodities = state.commodities.filter(el => el._id !== payload);
  },
  GET_CART_FROM_LOCAL: (state, payload) => {
    state.cart = payload;
  },
  COMMODITIES: (state, payload) => {
    state.cart = state.cart.map(item => {
      const amount = payload.find(commodity => commodity._id === item._id)?.amount ?? 0;
      return item.count <= amount
        ? item
        : Object.assign(item, {
          count: amount,
        });
    });
    state.commodities = payload ?? [];
  },
};

const actions = {
  async ADD_TO_CART({ state, commit, dispatch }, payload) {
    if (state.cart.some(item => item._id === payload)) {
      dispatch('INCREMENT_COUNT', payload);
    } else {
      commit(
        'SET_CART',
        state.cart.concat([
          {
            _id: payload,
            count: 1,
          },
        ])
      );
    }
    dispatch('UPDATE_CART');
  },

  DELETE_FROM_CART({ commit, dispatch }, payload) {
    commit('DELETE_FROM_CART', payload);
    dispatch('UPDATE_CART');
  },

  INCREMENT_COUNT({ state, commit, dispatch }, payload) {
    const cart = state.cart.map(item => (item._id === payload ? Object.assign(item, { count: item.count + 1 }) : item));
    commit('SET_CART', cart);
    dispatch('UPDATE_CART');
  },

  DECREMENT_COUNT({ state, commit, dispatch }, payload) {
    const cart = state.cart.map(item => (item._id === payload ? Object.assign(item, { count: item.count - 1 }) : item));
    commit('SET_CART', cart);
    dispatch('UPDATE_CART');
  },

  async GET_COMMODITIES(ctx) {
    const { commodity, error } = await postData(`${endpoints.getById}`, { ids: ctx.state.cart.map(item => item._id) });
    if (!error) {
      ctx.commit('COMMODITIES', commodity.filter(item => item));
    } else {
      ctx.commit('ERROR', errors.get, { root: true });
    }
  },

  async INIT_CART({ commit, dispatch }) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!Array.isArray(cart) || !cart.length) return;
    commit('SET_CART', cart);
    dispatch('GET_COMMODITIES');
  },

  async UPDATE_CART({ state, dispatch }) {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    dispatch('GET_COMMODITIES');
  },
  CLEAR_CART({ commit }) {
    commit('CLEAR_CART');
    localStorage.removeItem('cart');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
