/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */

const state = {
  categories: null,
  commodities: [],
  totalCommodities: 0,
  commodity: null
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
  }
}
const actions = {
  async GET_SHOP_CATEGORIES ({ state, getters, commit }) {
    const response = (await (await fetch(`${getters.categoriesEndpoint}?subbs=true&withId=true`)).json()).categories
    // const response = [
    //   {
    //     name: 'Nail tools',
    //     slug: 'nippers',
    //     _id: 'iddd',
    //     subcategories: [
    //       {
    //         name: 'Cuticle nippers',
    //         slug: 'cuticle-nippers',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       },
    //       {
    //         name: 'Nail nippers',
    //         slug: 'nail-nippers',
    //         _id: '5f4b81770e15c400178e3b3e'
    //       },
    //       {
    //         name: 'Cuticle scissors',
    //         slug: 'cuticle-scissors',
    //         _id: '5f4b81610e15c400178e3bs3d'
    //       },
    //       {
    //         name: 'Nail scissors',
    //         slug: 'nail-scissors',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       },
    //       {
    //         name: 'Pushers',
    //         slug: 'pushers',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       },
    //       {
    //         name: 'Pedicure tools',
    //         slug: 'pedicure-tools',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       },
    //       {
    //         name: 'Nail clipper',
    //         slug: 'nail-clipper',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Drill bits',
    //     slug: 'drill-bits',
    //     _id: 'iddd2',
    //     subcategories: [
    //       {
    //         name: 'carbide bits',
    //         slug: 'carbide-bits',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       },
    //       {
    //         name: 'diamond bits',
    //         slug: 'diamond-bits',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Brushes',
    //     slug: 'brushes',
    //     _id: 'iddd2',
    //     subcategories: [
    //       {
    //         name: 'Brushes',
    //         slug: 'carbide-bits',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       }
    //     ]
    //   },
    //   {
    //     name: 'eyebrows/eyelashes',
    //     // TODO: Notice that '/' symbol can take some problems.
    //     slug: 'eyebrows-eyelashes',
    //     _id: 'iddd2',
    //     subcategories: [
    //       {
    //         name: 'eyebrows',
    //         slug: 'eyebrows',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       },
    //       {
    //         name: 'eyelashes',
    //         slug: 'eyelashes',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Cosmetics',
    //     slug: 'cosmetics',
    //     _id: 'iddd2',
    //     subcategories: [
    //       {
    //         name: 'Cosmetics',
    //         slug: 'cosmetics',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Disposable materials',
    //     slug: 'disposable-materials',
    //     _id: 'iddd2',
    //     subcategories: [
    //       {
    //         name: 'Materials',
    //         slug: 'materials',
    //         _id: '5f4b81610e15c400178e3b3d'
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Promotions',
    //     slug: 'promotions',
    //     _id: 'iddd2',
    //     subcategories: []
    //   }
    // ]
    commit('SHOP_CATEGORIES', response)
    return state.categories
  },
  async SEARCH_COMMODITIES ({ state, getters, commit }, { search, skip }) {
    const response = await (
      await fetch(`${getters.searchEndpoint}/?query=${search}&skip=${skip}`)
    ).json()
    commit('SHOP_COMMODITIES', response)
    return state.comodities
  },
  async GET_SHOP_COMMODITIES ({ state, getters, commit }, { categoryId, skip }) {
    const response = await (
      await fetch(`${getters.commoditiesEndpoint}/${categoryId}?skip=${skip}`)
    ).json()
    commit('SHOP_COMMODITIES', response)
    return state.comodities
  },
  async GET_COMMODITY ({ state, getters, commit }, { commodityId }) {
    const response = await (
      await fetch(`${getters.commodityEndpoint}/${commodityId}`)
    ).json()
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
