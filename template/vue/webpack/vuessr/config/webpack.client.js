var path = require("path")

var webpack = require("webpack")
var config = require("./config")
const merge = require('webpack-merge')
const baseWebpack = require("./webpack.base.js")
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
module.exports = merge(baseWebpack, {

    entry: config.clientConfig.entry,

    devtool: config.clientConfig.devtool,
    plugins: [
        new VueSSRClientPlugin()
    ]
})