import { getAccountList } from '@/api/AccountList'
export default {
  namespaced: true,
  state: {
    data: [],
    total: 30,
    loading: true,
    conditions: {
      pageIndex: 1,
      pageSize: 5
    }
  },
  actions: {
    setConditions({ commit }, payLoad) {
      commit('SETSTATUS')
      commit('SETCONDITIONS', payLoad)
    },
    initList({ commit, state, dispatch }, payLoad) {
      const { conditions } = state
      const { pageIndex, pageSize } = conditions;
      fetch(`http://localhost:3000/api/getAccountList?pageIndex=${pageIndex}&pageNum=${pageSize}`)
        .then(res => res.json())
        .then(json => {
          commit('SETDATA', json.result)
          setTimeout(() => {
            commit('SETSTATUS')
          }, 2000)
        }, 0)
    }
  },
  mutations: {
    SETDATA(state, data) {
      state.data = data
    },
    SETCONDITIONS(state, conditions) {
      state.conditions = {
        ...state.conditions,
        ...conditions
      }
    },
    SETSTATUS(state) {
      state.loading = !state.loading
    }
  }
}
