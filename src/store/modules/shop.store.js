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
};

const actions = {
  async GET_CATEGORIES({ commit, state }) {
    state.isCategoriesLoading = true;

    const { categories, error } = await getData(categoriesEndpoints.categories);

    if (!error) {
      commit('CATEGORIES', categories);
    }

    state.isCategoriesLoading = false;
  },

  async SEARCH_COMMODITIES({ state, commit }, { page }) {
    state.isShopLoading = true;

    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints.search}?query=${state.search}&skip=${state.pageSize * (page - 1)}`
    );

    if (!error) {
      commit('COMMODITIES', { commodities, total });
    }

    state.isShopLoading = false;
  },

  async GET_COMMODITIES({ state, commit, dispatch }, { categoryId, isSubcategory, page }) {
    if (state.search.length) {
      dispatch('SEARCH_COMMODITIES', { page });
      return;
    }

    state.isShopLoading = true;

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

    state.isShopLoading = false;
  },

  async GET_COMMODITY({ state, commit }, { commodityId }) {
    state.isCommodityLoading = true;

    const { commodity, error } = await getData(`${commoditiesEndpoints.commodity}/${commodityId}`);

    if (!error) {
      commit('COMMODITY', { commodity: commodity[0] });
    }

    state.isCommodityLoading = false;
  },

  async RANDOM_COMMODITIES({ state, commit }) {
    state.isShopLoading = true;
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

    state.isShopLoading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
