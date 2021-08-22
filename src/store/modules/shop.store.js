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
  GET_CATEGORIES({ commit }) {
    commit('CATEGORIES_LOADING', true);
    api.get(categoriesEndpoints.categories)
      .then((res) => {
        commit('CATEGORIES', res.data);
      })
      .catch(() => {
        console.log('Failed to load categories')
      })
      .finally(() => {
        commit('CATEGORIES_LOADING', false);
      })

  },

  SEARCH_COMMODITIES({ state, commit }, { page }) {
    commit('LOADING', true);

    const params = {
      // skip: state.pageSize * (page - 1),
      query: state.search,
      page,
      per_page: state.pageSize,
      published: true,
    };

    api.get(commoditiesEndpoints.search, { params })
      .then((res) => {
        commit('COMMODITIES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => console.log('error search commodities'))
      .finally(() => commit('LOADING', false))
  },

  GET_COMMODITIES({ state, commit, dispatch }, { categoryId, isSubcategory, page }) {
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

    api.get(
      `${commoditiesEndpoints[isSubcategory ? 'subcommodities' : 'commodities']}/${categoryId}`,
      { params }
    )
      .then((res) => {
        commit('COMMODITIES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => {
        commit('ERROR', errors.get, { root: true });
      })
      .finally(() => commit('LOADING', false))
  },

  GET_COMMODITY({ commit }, { commodityId }) {
    commit('COMMODITY_LOADING', true);
    api.get(`${commoditiesEndpoints.commodity}/${commodityId}`)
      .then((res) => commit('COMMODITY', res.data[0]))
      .catch(() => commit('COMMODITY', null))
      .finally(() => commit('COMMODITY_LOADING', false))
  },

  RANDOM_COMMODITIES({ state, commit }) {
    commit('LOADING', true);
    state.activeCategory = null;

    const params = {
      // limit: state.pageSize,
      per_page: state.pageSize,
    };
    api.get(commoditiesEndpoints.random, { params })
      .then((res) => {
        commit('COMMODITIES', res.data);
        commit('TOTAL', 0);
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
      .finally(() => commit('LOADING', false))
  },

  GET_ORDERS({ commit }) {
    api.get(`${ordersEndpoints.get}/commodity`)
    .then((res) =>  commit('ORDERS', res.data.data))
    .catch(() => console.log('failed get orders'))
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
