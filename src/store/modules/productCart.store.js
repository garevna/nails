/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */

const state = {
  cart: []
}

const getters = {
  getCart: state => state.cart,
  // eslint-disable-next-line no-return-assign
  getPrice: state => state.cart.reduce((acc, curr) => acc += curr.price, 0)
}

const mutations = {
  CLEAR_CART: (state) => {
    state.cart = []
  },
  ADD_TO_CART: (state, payload) => {
    state.cart = [...state.cart, payload]
  },
  DELETE_CART: (state, payload) => {
    state.cart = state.cart.filter(el => el._id !== payload._id)
  },
  GET_CART_FROM_LOCAL: (state, payload) => {
    state.cart = payload
  }
}

const persistInterval = 24 * 60 * 60 * 1000

const actions = {
  CLEAR_CART ({ state, commit }) {
    localStorage.removeItem('cart')
    commit('CLEAR_CART')
  },
  ADD_TO_CART ({ state, commit }, payload) {
    commit('ADD_TO_CARTS', payload)
    const data = { data: state.cart, time: new Date().getTime() + persistInterval }
    localStorage.setItem('cart', JSON.stringify(data))
  },
  DELETE_CART ({ state, commit }, payload) {
    commit('DELETE_CART', payload)
    const data = { data: state.cart, time: new Date().getTime() + persistInterval }
    localStorage.setItem('cart', JSON.stringify(data))
  },
  GET_CART_FROM_LOCAL ({ state, commit }) {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
    if (cartFromLocalStorage && Date.now() < cartFromLocalStorage.time) {
      commit('GET_CART_FROM_LOCAL', cartFromLocalStorage.data)

      return
    }

    localStorage.removeItem('cart')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
