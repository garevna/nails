/* eslint-disable no-unused-vars */
const { getData } = require('@/helpers').default;
import { api } from './../../helpers/api';

const categoriesEndpoints = require('@/config/endpoints').default.categories;
const commoditiesEndpoints = require('@/config/endpoints').default.commodities;
const ordersEndpoints = require('@/config/endpoints').default.orders;

const errors = require('@/config/errors').default.shop;

const state = {
  isShopLoading: false,
  isCategoriesLoading: false,
  isCommodityLoading: false,
  categories: [],
  commodities: [],
  commodity: null,
  pageSize: 12,
  total: 0,
  search: '',
  orders: [],
};

const getters = {
  pages: state => {
    if (!state.total) return 1;

    return Math.ceil(state.total / state.pageSize);
  },

  fullListOfCategories: state => {
    return state.categories.reduce((prev, curr) => {
      prev.push(curr);

      if (Array.isArray(curr.subcategories) && curr.subcategories.length) {
        prev = prev.concat(curr.subcategories);
      }

      return prev;
    }, []);
  },
};

const mutations = {
  CATEGORIES: (state, categories) => {
    state.categories = categories ?? [];
  },
  COMMODITIES: (state, payload) => {
    state.commodities = payload ?? [];
  },
  TOTAL: (state, payload) => {
    state.total = payload || 0;
  },
  COMMODITY: (state, payload) => {
    state.commodity = payload;
  },
  SEARCH: (state, payload) => {
    state.search = payload;
  },
  LOADING: (state, payload) => {
    state.isShopLoading = payload;
  },
  CATEGORIES_LOADING: (state, payload) => {
    state.isCategoriesLoading = payload;
  },
  COMMODITY_LOADING: (state, payload) => {
    state.isCommodityLoading = payload;
  },
  ORDERS: (state, payload) => {
    state.orders = payload;
  },
};

const actions = {
  async GET_CATEGORIES({ commit, state }) {
    commit('CATEGORIES_LOADING', true);

    const res = await api.get(categoriesEndpoints.categories);
    if (res.statusText === 'OK') {
      commit('CATEGORIES', res.data);
    }

    commit('CATEGORIES_LOADING', false);
  },

  async SEARCH_COMMODITIES({ state, commit }, { page }) {
    commit('LOADING', true);

    const params = {
      // skip: state.pageSize * (page - 1),
      query: state.search,
      page,
      per_page: state.pageSize,
      published: true,
    };

    const res = await api.get(commoditiesEndpoints.search, { params });
    if (res.statusText === 'OK') {
      commit('COMMODITIES', res.data.data);
      commit('TOTAL', res.data.total);
    }

    commit('LOADING', false);
  },

  async GET_COMMODITIES({ state, commit, dispatch }, { categoryId, isSubcategory, page }) {
    if (state.search.length) {
      dispatch('SEARCH_COMMODITIES', { page });
      return;
    }

    commit('LOADING', true);

    const params = {
      // skip: state.pageSize * (page - 1),
      page,
      per_page: state.pageSize,
      published: true,
    };

    const res = await api.get(
      `${commoditiesEndpoints[isSubcategory ? 'subcommodities' : 'commodities']}/${categoryId}`,
      { params }
    );
    if (res.statusText === 'OK') {
      commit('COMMODITIES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }

    commit('LOADING', false);
  },

  async GET_COMMODITY({ state, commit }, { commodityId }) {
    commit('COMMODITY_LOADING', true);
    const res = await api.get(`${commoditiesEndpoints.commodity}/${commodityId}`);
    if (res.statusText === 'OK') {
      commit('COMMODITY', res.data[0]);
    } else {
      commit('COMMODITY', null);
    }
    commit('COMMODITY_LOADING', false);
  },

  async RANDOM_COMMODITIES({ state, commit }) {
    commit('LOADING', true);
    state.activeCategory = null;

    const params = {
      // limit: state.pageSize,
      per_page: state.pageSize,
    };
    const res = await api.get(commoditiesEndpoints.random, { params });
    if (res.statusText === 'OK') {
      commit('COMMODITIES', res.data);
      commit('TOTAL', 0);
    } else {
      commit('ERROR', errors.get, { root: true });
    }

    commit('LOADING', false);
  },

  async GET_ORDERS({ commit }) {
    const res = await api.get(`${ordersEndpoints.get}/commodity`);
    if (res.statusText === 'OK') {
      commit('ORDERS', res.data.data);
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
