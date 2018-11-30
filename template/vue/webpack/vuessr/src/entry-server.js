import { createApp } from './app'



export default context => {
    return new Promise((resolve, reject) => {
        const s = Date.now()
        const { app, router, store } = createApp()

        const { url } = context
        const { fullPath } = router.resolve(url).route

        if (fullPath !== url) {
            return reject({ url: fullPath })
        }

        // 根据服务提供的地址跳转路由
        router.push(url)


        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()

            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
                store,
                route: router.currentRoute
            }))).then(() => {
                console.log(`data pre-fetch: ${Date.now() - s}ms`)

                context.state = store.state
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}