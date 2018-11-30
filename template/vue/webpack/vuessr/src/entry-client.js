import Vue from 'vue'
import { createApp } from './app'

//vue混入对象
//组件更新时，重新请求数据
Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}


router.onReady(() => {

    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
            //
        let diffed = false
            //如果当前路由的和即将跳转路由的地址不一样，所对应的组件就不一样，这样需要重新进行数据请求asyncData
        const activated = matched.filter((c, i) => {
                return diffed || (diffed = (prevMatched[i] !== c))
            })
            //检测到新路由中有新组件，则执行asyncData
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
            //假如没有新组件，则直接进行路由，无需等待数据请求完毕
        if (!asyncDataHooks.length) {
            return next()
        }

        //如果有新组建，则需要等待所有的新组件的asyncData请求完毕
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                next()
            })
            .catch(next)
    })


    app.$mount('#app')
})