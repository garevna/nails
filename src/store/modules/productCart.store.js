/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */

const state = {
  cart: []
}

const getters = {
  getCart: state => state.cart,
  // eslint-disable-next-line no-return-assign
  getSumPrice: state => state.cart.reduce((acc, curr) => acc += (curr.price * curr.count), 0),
  // eslint-disable-next-line no-return-assign
  getTotalItem: state => state.cart.reduce((acc, curr) => acc += +curr.count, 0)
}

const mutations = {
  CLEAR_CART: (state) => {
    state.cart = []
  },
  ADD_TO_CART: (state, payload) => {
    state.cart = [...state.cart, payload]
  },
  DELETE_FROM_CART: (state, payload) => {
    state.cart = state.cart.filter(el => el._id !== payload._id)
  },
  GET_CART_FROM_LOCAL: (state, payload) => {
    state.cart = payload
  },
  SET_COUNT_TO_PRODUCT: (state, payload) => {
    state.cart = state.cart.map(el => el._id === payload._id ? payload : el)
  }
}

const persistInterval = 24 * 60 * 60 * 1000
export const createPersistData = () => {
  const data = { data: state.cart, time: new Date().getTime() + persistInterval }
  localStorage.setItem('cart', JSON.stringify(data))
}

const actions = {
  CLEAR_CART ({ state, commit }) {
    localStorage.removeItem('cart')
    commit('CLEAR_CART')
  },
  ADD_TO_CART ({ state, commit }, payload) {
    if (state.cart.some(el => el._id === payload._id)) {
      return
    }
    const newPayload = { ...payload }
    newPayload.count = 1
    commit('ADD_TO_CART', newPayload)
    createPersistData()
  },
  DELETE_FROM_CART ({ state, commit }, payload) {
    commit('DELETE_FROM_CART', payload)
    createPersistData()
  },
  GET_CART_FROM_LOCAL ({ state, commit }) {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
    if (cartFromLocalStorage && Date.now() < cartFromLocalStorage.time) {
      commit('GET_CART_FROM_LOCAL', cartFromLocalStorage.data)

      return
    }

    localStorage.removeItem('cart')
  },
  INCREMENT_COUNT ({ state, commit }, payload) {
    const newPayload = { ...payload }
    newPayload.count++
    commit('SET_COUNT_TO_PRODUCT', newPayload)
    createPersistData()
  },
  DECREMENT_COUNT ({ state, commit }, payload) {
    const newPayload = { ...payload }
    newPayload.count--
    commit('SET_COUNT_TO_PRODUCT', newPayload)
    createPersistData()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
