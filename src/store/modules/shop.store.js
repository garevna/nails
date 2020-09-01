/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */

const state = {
  categories: null,
  commodities: []
}

const getters = {
  categoriesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/categories`,
  commoditiesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/commodities`
}

const mutations = {
  SHOP_CATEGORIES: (state, payload) => {
    state.categories = payload
  },
  SHOP_COMODITIES: (state, payload) => {
    state.commodities = payload.commodities
  }
}
const actions = {
  async GET_SHOP_CATEGORIES ({ state, getters, commit }) {
    const response = (await (await fetch(`${getters.categoriesEndpoint}?subbs=true&withId=true`)).json()).categories
    commit('SHOP_CATEGORIES', response)
    return state.categories
  },
  async GET_SHOP_COMODITIES ({ state, getters, commit }, { categoryId }) {
    const response = (await (await fetch(`${getters.commoditiesEndpoint}/${categoryId}`)).json())
    commit('SHOP_COMODITIES', response)
    return state.comodities
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
