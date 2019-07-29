import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lorem: "Lorem ipsum dolor sit amet.",
    count: 0
  },
  mutations: { // sync
    countUp (state, payload) {
      state.count += payload.amount * payload.mult
    }
  },
  actions: { // async

  },
  getters: {
    getLorem (state) {
      return state.lorem
    },
    getCount (state) {
      return state.count
    }
  }
})
