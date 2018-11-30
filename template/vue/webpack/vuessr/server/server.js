const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache') //缓存组件
const express = require('express')
const favicon = require('serve-favicon') //设置服务图标
const compression = require('compression') //检查浏览器是否支持压缩，支持则进行文件压缩
const microcache = require('route-cache') //缓存路由
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

//在响应头中表示，express和ssr的版本
const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        // 提供组件缓存具体实现
        cache: new LRU({
            max: 1000, //缓存1000条
            maxAge: 1000 * 60 * 15 //缓存15分钟
        }),
        // 运行时将会以此目录为基准来解析 node_modules 中的依赖模块
        basedir: resolve('./dist'),
        //使用 runInNewContext: false，bundle 代码将与服务器进程在同一个 global 上下文中运行
        runInNewContext: false
    }))
}



const template = fs.readFileSync(resolve('./index.html'), 'utf-8')
const bundle = require('./vue-ssr-server-bundle.json')
const clientManifest = require('./vue-ssr-client-manifest.json')

let renderer = createRenderer(bundle, {
    template,
    clientManifest
})

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: 1000 * 60 * 60 * 24 * 30
})

app.use(compression({ threshold: 0 }))
app.use(favicon('./static/logo.png'))
app.use('/dist', serve('../dist', true))
    // app.use('/manifest.json', serve('../manifest.json', true))
    // app.use('/service-worker.js', serve('../dist/service-worker.js'))


//路由缓存，在10s内对于同一路由都是从缓存读取
app.use(microcache.cacheSeconds(1, req => req.originalUrl))


app.get('*', (req, res) => {

    const s = Date.now()
    res.setHeader("Content-Type", "text/html")
    res.setHeader("Server", serverInfo)

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    const context = {
        title: 'Vue HN 2.0', // default title
        url: req.url
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        console.log(`whole request: ${Date.now() - s}ms`)
        return res.send(html)

    })
})

const port = 8888
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})