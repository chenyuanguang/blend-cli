import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);


import actions from './actions';
import state from './state';
import mutations from './mutations';

export * from './type';
const storeConfig = {
    state: state,
    actions: actions,
    mutations: mutations
};
export function createStore() {
    return new Vuex.Store(storeConfig);
}