/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */

const state = {
  categories: null,
  commodities: [],
  selectedSectionName: '',
  totalCommodities: 0,
  commodity: null,
  selectedSectionId: null
}

const getters = {
  categoriesEndpoint: (state, getters, rootState) =>
    `${rootState.host}/shop/categories`,
  commoditiesEndpoint: (state, getters, rootState) =>
    `${rootState.host}/shop/commodities`,
  commodityEndpoint: (state, getters, rootState) =>
    `${rootState.host}/shop/commodity`,
  searchEndpoint: (state, getters, rootState) =>
    `${rootState.host}/shop/search`
}

const mutations = {
  SHOP_CATEGORIES: (state, payload) => {
    state.categories = payload.flat()
  },
  SHOP_COMMODITIES: (state, payload) => {
    state.commodities = payload.commodities
    state.totalCommodities = payload.total
  },
  SHOP_COMMODITY: (state, payload) => {
    state.commodity = payload.commodity[0]
  },
  CLEAR_COMMODITY: (state) => {
    state.commodity = null
  },
  CLEAR_COMMODITIES: (state) => {
    state.commodities = []
  },
  SELECT_SECTION: (state, payload) => {
    state.selectedSectionName = payload.name
    state.selectedSectionId = payload.id
  }
}

const actions = {
  async GET_SHOP_CATEGORIES ({
    state,
    getters,
    commit
  }) {
    const response = (
      await (
        await fetch(`${getters.categoriesEndpoint}`)
      ).json()
    ).categories
    commit('SHOP_CATEGORIES', response)
    return state.categories
  },
  async SEARCH_COMMODITIES ({
    state,
    getters,
    commit
  }, {
    search,
    skip
  }) {
    const response = await (
      await fetch(`${getters.searchEndpoint}/?query=${search}&skip=${skip}`)
    ).json()
    commit('SHOP_COMMODITIES', response)
    return state.comodities
  },
  async GET_SHOP_COMMODITIES ({
    state,
    getters,
    commit
  }, {
    categoryId,
    skip
  }) {
    const response = await (
      await fetch(`${getters.commoditiesEndpoint}/${categoryId}?skip=${skip}`)
    ).json()
    commit('SHOP_COMMODITIES', response)
    return state.comodities
  },
  async GET_COMMODITY ({
    state,
    getters,
    commit
  }, {
    commodityId
  }) {
    const response = await (
      await fetch(`${getters.commodityEndpoint}/${commodityId}`)
    ).json()
    commit('SHOP_COMMODITY', response)
    return state.commodity
  },
  SET_SELECTED_SECTION ({
    commit,
    dispatch
  }, {
    name,
    id
  }) {
    commit('SELECT_SECTION', {
      name,
      id
    })
    dispatch('GET_SHOP_COMMODITIES', {
      categoryId: id
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
