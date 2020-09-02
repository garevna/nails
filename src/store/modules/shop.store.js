/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */

const state = {
  categories: null,
  commodities: [],
  commodity: null
}

const getters = {
  categoriesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/categories`,
  commoditiesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/commodities`,
  commodityEndpoint: (state, getters, rootState) => `${rootState.host}/shop/commodity`
}

const mutations = {
  SHOP_CATEGORIES: (state, payload) => {
    state.categories = payload
  },
  SHOP_COMMODITIES: (state, payload) => {
    state.commodities = payload.commodities
  },
  SHOP_COMMODITY: (state, payload) => {
    state.commodity = payload.commodity[0]
  }
}
const actions = {
  async GET_SHOP_CATEGORIES ({ state, getters, commit }) {
    const response = (await (await fetch(`${getters.categoriesEndpoint}?subbs=true&withId=true`)).json()).categories
    commit('SHOP_CATEGORIES', response)
    return state.categories
  },
  async GET_SHOP_COMMODITIES ({ state, getters, commit }, { categoryId }) {
    const response = (await (await fetch(`${getters.commoditiesEndpoint}/${categoryId}`)).json())
    commit('SHOP_COMMODITIES', response)
    return state.comodities
  },
  async GET_COMMODITY ({ state, getters, commit }, { commodityId }) {
    const response = (await (await fetch(`${getters.commodityEndpoint}/${commodityId}`)).json())
    commit('SHOP_COMMODITY', response)
    return state.commodity
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
