import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: 'default',
    test: 'hello hot11133323'
  },
  actions: {
    setTitle({commit}, tit) {
      commit('SETTITLE', tit)
    }
  },
  mutations: {
    SETTITLE(state, tit) {
      state.title = tit;
    }
  },
  modules
})
export default store
