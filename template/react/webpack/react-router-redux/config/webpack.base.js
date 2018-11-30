const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require("webpack")
const config = require("./config")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const deviceHtml = require("./device")
deviceHtml()

const eslintTest=[
    {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')], // 指定检查的目录,
        exclude: [path.resolve(__dirname, '../node_modules')],
        options: config.esLint.config
      }
]
module.exports = {
  entry: config.base.entry,
  output: {
    publicPath: config.base.publicPath, //打包后的文件再引用时，自动注入绝对路径
    path: config.base.outputPath,
    filename: "js/" + config.base.outputFileName,
    chunkFilename: "[id]-[name]-[hash].js" //组件懒加载时的文件名字，以及存储
  },
  module: {
    rules: [
      ...(config.esLint.esLintUse ?eslintTest: []),
      ...(require("./webpack.style.js")),
      {
        test: /\.js|.jsx$/,
        use: [{
          loader: "babel-loader",
          options: config.babel
        }]
      },
      
      {
        test: /\.(jpg|png|gif|ttf|woff|eot|svg)$/,
        use: ["url-loader"]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: config.base.templatePath,
      minify: config.base.htmlMinify
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/static'),
      to: config.base.outputPath + "/static",
      ignore: ['.*']
    }]),
    // 提取css
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true,
    })
    
  ]
}
