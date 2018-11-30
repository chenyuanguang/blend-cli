const config=require("./config")
const autoprefixer=require("autoprefixer")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const createCssType = () =>{
    switch(config.base.cssType){
        case "less":{
            return [{
                test: /\.less$/,
                use: [{
                  loader: "style-loader"
                },
                 {
                  loader: "css-loader"
                }, {
                  loader: "less-loader",
                }
                ],
                include: /node_modules/
              },
              {
                test: /\.less$/,
                use: [{
                  loader: "style-loader"
                },
                 {
                  loader: "css-loader?module"
                }, {
                  loader: "less-loader",
                }
                ],
                exclude: /node_modules/
              }
            ]
        }
        case "sass":{
            return [{
                test: /\.scss$/,
                use: [{
                  loader: "style-loader"
                }, 
                {
                  loader: "css-loader"
                }, {
                  loader: "sass-loader",
                },
                ...postcss
                ],
                include: /node_modules/
              },
              {
                test: /\.scss$/,
                use: [{
                  loader: "style-loader"
                }, 
                {
                  loader: "css-loader?module"
                }, {
                  loader: "sass-loader",
                },
                ...postcss
                ],
                exclude: /node_modules/
              }]
        }
        default: {
            return []
        }
    }
    
}

let postcss=[{
    loader: 'postcss-loader',
    options: {
        plugins: [autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 7'],
            remove: true,
        })]
    }
  }]

  //  使用css的module方式进行css的局部作用域划分
  let styleConfig=[{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use:[
          {
              loader:'css-loader?module'
          },
          ...postcss
      ] 
    }),
    exclude: /node_modules/
  },
  // 对于antd的modules中的css不可以使用css的module方式加载
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
            loader:'css-loader'
        },
        ...postcss
    ] 
    }),
    include: /node_modules/
  },...createCssType()]


  module.exports=styleConfig