import Vue from 'vue'
import App from './components/app.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'


// tittle的处理
Vue.mixin(titleMixin)

export function createApp() {

    const store = createStore()
    const router = createRouter()
        //将router挂在到store上
    sync(store, router)


    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })


    return { app, router, store }
}