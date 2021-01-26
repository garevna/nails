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
  totalCommodities: 0,
  skip: 0,
  searchParams: '',
  selectedCategoryName: '',
  isCategoriesLoading: false,
  totalPages: 0,
};

const getters = {
  selectedCategoryName: state => {
    return state.activeCategory?.fullName || 'Commodities';
  },
  alsoViewedCommodities: state => {},
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
    state.totalPages = payload.total / 8;
  },
  SHOP_COMMODITY: (state, { commodity }) => {
    state.commodity = commodity[0];
  },
  CLEAR_COMMODITY: state => {
    state.commodity = null;
  },
  CLEAR_COMMODITIES: state => {
    state.commodities = [];
  },
  SET_ACTIVE_CATEGORY: (state, { category }) => {
    const fullName = category.parentName ? `${category.parentName} > ${category.name}` : `${category.name} > View all`;
    state.activeCategory = { ...category, fullName };
  },
};

const actions = {
  async GET_SHOP_CATEGORIES({ commit, state }) {
    state.isCategoriesLoading = true;
    const { categories } = await getData(categoriesEndpoints.categories);
    if (categories) {
      commit('SHOP_CATEGORIES', categories);
    }
    state.isCategoriesLoading = false;
  },
  async SEARCH_COMMODITIES({ state, getters, commit }, { search, skip }) {
    const response = await (await fetch(`${getters.searchEndpoint}/?query=${search}&skip=${skip}`)).json();
    commit('SHOP_COMMODITIES', response);
    return state.comodities;
  },
  async GET_SHOP_COMMODITIES({ state, commit }, { categoryId, skip }) {
    state.isShopLoading = true;
    state.skip = skip || 0;
    const category = state.fullListOfCategories.find(el => el._id === categoryId);
    const subcategory = category && !!category.parentId;
    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints[subcategory ? 'subcommodities' : 'commodities']}/${categoryId}?skip=${state.skip}`
    );
    if (!error) {
      commit('SHOP_COMMODITIES', {
        commodities,
        total,
      });
    } else {
      console.log(error);
    }
    state.isShopLoading = false;
  },
  async GET_MORE_COMMODITIES({ state, commit }, { skip }) {
    state.skip = skip;
    const subcategory = state.activeCategory && !!state.activeCategory.parentId;
    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints[subcategory ? 'subcommodities' : 'commodities']}/${state.activeCategory._id}?skip=${
        state.skip
      }`
    );
    if (!error) {
      commit('SHOP_COMMODITIES', {
        commodities: commodities,
        total,
      });
    } else {
      console.log(error);
    }
  },
  async GET_COMMODITY({ state, commit }, { commodityId }) {
    const { commodity } = await getData(`${commoditiesEndpoints.commodity}/${commodityId}`);
    commit('SHOP_COMMODITY', { commodity });
    return state.commodity;
  },
  SET_NEW_CATEGORY({ state, commit, dispatch }, { category, categoryId }) {
    if (category && typeof category === 'string') {
      category = state.fullListOfCategories.find(elem => elem.slug === category);
    } else if (categoryId && typeof categoryId === 'string') {
      category = state.fullListOfCategories.find(elem => elem._id === categoryId);
    }
    commit('SET_ACTIVE_CATEGORY', { category });
    dispatch('GET_SHOP_COMMODITIES', {
      categoryId: category._id,
    });
  },
  async INIT_SHOP({ state, dispatch, commit }, { categoryName, skip }) {
    state.isShopLoading = true;
    state.skip = skip || 0;
    await dispatch('GET_SHOP_CATEGORIES');
    if (state.categories && state.categories[0] && state.fullListOfCategories) {
      if (categoryName) {
        const category = state.fullListOfCategories.find(el => categoryName === el.slug);
        console.log('category init', category);
        await commit('SET_ACTIVE_CATEGORY', {
          category: category || state.categories[0],
        });
      }
      await dispatch('GET_SHOP_COMMODITIES', {
        categoryId: state.activeCategory._id,
        skip: skip,
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
