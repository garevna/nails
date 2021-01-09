/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */

const { getData } = require('@/helpers').default;

const categoriesEndpoints = require('@/config/endpoints').default.categories;
const commoditiesEndpoints = require('@/config/endpoints').default.commodities;

const state = {
  isShopLoading: false,
  isCommodityLoading: false,
  categories: null,
  fullListOfCategories: [],
  commodities: [],
  selectedSectionName: '',
  commodity: null,
  activeCategory: null,
  activeSubcategory: null,
  skip: 0,
  searchParams: '',
};

const getters = {
  categoriesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/categories`,
  commoditiesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/commodities`,
  commodityEndpoint: (state, getters, rootState) => `${rootState.host}/shop/commodity`,
  searchEndpoint: (state, getters, rootState) => `${rootState.host}/shop/search`,
};

const mutations = {
  SHOP_CATEGORIES: (state, categories) => {
    state.fullListOfCategories = categories.reduce((prev, curr) => {
      prev.push(curr);
      if (Array.isArray(curr.subcategories) && curr.subcategories.length) {
        prev = prev.concat(curr.subcategories);
      }
      return prev;
    }, []);
    state.categories = categories;
  },
  SHOP_COMMODITIES: (state, payload) => {
    state.commodities = payload.commodities;
    state.totalCommodities = payload.total;
  },
  SHOP_COMMODITY: (state, payload) => {
    state.commodity = payload.commodity[0];
  },
  CLEAR_COMMODITY: state => {
    state.commodity = null;
  },
  CLEAR_COMMODITIES: state => {
    state.commodities = [];
  },
  SET_ACTIVE_CATEGORY: (state, payload) => {
    const fullName = payload.parentName ? `${payload.parentName} > ${payload.name}` : `${payload.name} > View all`;
    state.activeCategory = { ...payload, fullName };
  },
};

const actions = {
  async GET_SHOP_CATEGORIES({ commit }) {
    const { categories } = await getData(categoriesEndpoints.categories);
    if (categories) {
      commit('SHOP_CATEGORIES', categories);
    }
  },
  async SEARCH_COMMODITIES({ state, getters, commit }, { search, skip }) {
    const response = await (await fetch(`${getters.searchEndpoint}/?query=${search}&skip=${skip}`)).json();
    commit('SHOP_COMMODITIES', response);
    return state.comodities;
  },
  async GET_SHOP_COMMODITIES({ state, commit }, { categoryId }) {
    state.isShopLoading = true;
    state.skip = 0;
    const category = state.fullListOfCategories.find(el => el._id === categoryId);
    const subcategory = category && !!category.parentId;
    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints[subcategory ? 'subcommodities' : 'commodities']}/${categoryId}?withHidden=${
        state.filterShow
      }&skip=${state.skip}`
    );
    if (!error) {
      commit('SHOP_COMMODITIES', {
        commodities,
        total,
      });
    } else {
      console.log(error);
    }
  },
  async GET_COMMODITY({ state, getters, commit }, { commodityId }) {
    const response = await (await fetch(`${getters.commodityEndpoint}/${commodityId}`)).json();
    commit('SHOP_COMMODITY', response);
    return state.commodity;
  },
  SET_NEW_CATEGORY({ state, commit, dispatch }, { category }) {
    if (typeof category === 'string') {
      category = state.fullListOfCategories.find(elem => elem.slug === category);
    }
    console.log(category);
    commit('SET_ACTIVE_CATEGORY', category);
    dispatch('GET_SHOP_COMMODITIES', {
      categoryId: category._id,
    });
    return state.commodity;
  },
  async INIT_SHOP({ state, dispatch }) {
    state.isShopLoading = true;
    await dispatch('GET_SHOP_CATEGORIES');
    if (state.categories && state.categories[0]) {
      state.activeCategory = state.categories[0];
      state.activeSubcategory = state.activeCategory;
      await dispatch('GET_SHOP_COMMODITIES', {
        categoryId: state.activeCategory._id,
      });
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
