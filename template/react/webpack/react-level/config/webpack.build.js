var path = require("path")

var webpack=require("webpack")
var config=require("./config")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpack=require("./webpack.base.js")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports =merge(baseWebpack, {
  devtool:false,
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
        name:"common.js",
        filename:"js/common.js"
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        include: /\/src/,
        compress: {
          warnings: false
        },
        sourceMap:config.build.uglifyJsSourceMap,
        parallel: true   //使用多进程并行运行和文件缓存来提高构建速度
      },
    }),
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ],
})
