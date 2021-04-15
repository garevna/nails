/* eslint-disable no-unused-vars */
const { getData } = require('@/helpers').default;

const categoriesEndpoints = require('@/config/endpoints').default.categories;
const commoditiesEndpoints = require('@/config/endpoints').default.commodities;

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
    state.commodities = payload.commodities ?? [];
    state.total = payload.total;
  },
  COMMODITY: (state, { commodity }) => {
    state.commodity = commodity;
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
};

const actions = {
  async GET_CATEGORIES({ commit, state }) {
    commit('CATEGORIES_LOADING', true);

    const { categories, error } = await getData(categoriesEndpoints.categories);

    if (!error) {
      commit('CATEGORIES', categories);
    }

    commit('CATEGORIES_LOADING', false);
  },

  async SEARCH_COMMODITIES({ state, commit }, { page }) {
    commit('LOADING', true);

    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints.search}?query=${state.search}&skip=${state.pageSize * (page - 1)}`
    );

    if (!error) {
      commit('COMMODITIES', { commodities, total });
    }
    commit('LOADING', false);
  },

  async GET_COMMODITIES({ state, commit, dispatch }, { categoryId, isSubcategory, page }) {
    if (state.search.length) {
      dispatch('SEARCH_COMMODITIES', { page });
      return;
    }

    commit('LOADING', true);

    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints[isSubcategory ? 'subcommodities' : 'commodities']}/${categoryId}?skip=${
        state.pageSize * (page - 1)
      }`
    );

    if (!error) {
      commit('COMMODITIES', {
        commodities,
        total,
      });
    } else {
      commit('ERROR', errors.get, { root: true });
    }

    commit('LOADING', false);
  },

  async GET_COMMODITY({ state, commit }, { commodityId }) {
    commit('COMMODITY_LOADING', true);

    const { commodity, error } = await getData(`${commoditiesEndpoints.commodity}/${commodityId}`);

    if (!error) {
      commit('COMMODITY', { commodity: commodity[0] });
    }
    commit('COMMODITY_LOADING', false);
  },

  async RANDOM_COMMODITIES({ state, commit }) {
    commit('LOADING', true);
    state.activeCategory = null;

    const { data, total, error } = await getData(commoditiesEndpoints.random);

    if (!error) {
      commit('COMMODITIES', {
        commodities: data,
        total,
      });
    } else {
      commit('ERROR', errors.get, { root: true });
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
