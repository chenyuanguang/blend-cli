var path = require("path")

var webpack = require("webpack")
var config = require("./config")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpack = require("./webpack.base.js")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseWebpack, {
    target: 'node',
    entry: config.serverConfig.entry,
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    devtool: false,
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "common.js",
        //     filename: "js/common.js"
        // }),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         include: /\/src/,
        //         compress: {
        //             warnings: false
        //         },
        //         sourceMap: config.build.uglifyJsSourceMap,
        //         parallel: true //使用多进程并行运行和文件缓存来提高构建速度
        //     },
        // }),
        new VueSSRServerPlugin()
    ],
})