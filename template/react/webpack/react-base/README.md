# 使用说明：

## 查看node版本：

    "必须保证node在7.3以上版本"
## 项目结构
```
.
├── Readme.md                   // help                    
├── config                      // 配置
│   ├── config.js               // 唯一可以配置的地方
│   ├── device.js               // pc和mobile设备的选择
│   ├── webpack.base.js         // webpack基本配置
│   ├── webpack.build.js        // webpack线上环境
│   ├── webpack.dev.js          // webpack本地环境
│   ├── webpack.style.js        // 关于css样式的处理
├── mock    
│   ├── data.js                 //mock的数据文件
│   ├── index.js                //mock的接口文件
├── src    
│   ├── components              // 组件
│   ├── static                  // 静态文件
│   ├── css                     // 组件样式
│   ├── tool                    // 封装类库
│   ├── index.html              // 单页面入口html                
│   ├── main.js                 // 主入口文件
├── .editorconfig
├── .gitignore
├── package.json
.
```
## 创建项目：

``` bash

vuecli init <template-name> [project-name]

cd  [project-name]

npm install 或 cnpm install

# 启动项目
npm start

# 项目打包
npm run build

```
    

## 项目配置文件使用方式：

整个项目只有一个配置文件（./config/config）

``` javascript
var path = require("path")

module.exports = {
// webpack基本配置 
  base: {
    entry: path.join(__dirname, `../src/main.js`),   //项目入口文件
    outputPath: path.join(__dirname, "../dist"),     //项目的打包文件夹
    outputFileName: "[id]-[name]-[hash].js",         //打包后文件的命名格式
    templatePath: `./src/index.html`,                //入口html，（自动生成）
    publicPath: "http://localhost:8099/",            //打包后文件自动添加的绝对路径
    htmlMinify: {                                    //html文件的处理
      removeComments: true, //去除注释
      collapseWhitespace: true, //去除空格
      removeAttributeQuotes: true, //移除属性的引号
      removeEmptyAttributes: true, //去除空属性
    },
    cssType:"less",                                   //采用css的类型
  },

  dev: {                                              //   开发环境
    host: "localhost",                                //本地服务的主机号      
    port: 8099,                                       //本地服务的端口号
    browserOpen: true,                                //是否自动在浏览器中打开
    devtool: "cheap-module-eval-source-map",          //形成sourceMap的类型
    proxy: {                                          //代理
      "/apis": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/apis": "/api"
        },
        secure: false
      }
    },
    before: require("../mock/index"),                  //请求拦截（mock接口）
  },

  build: {                                             //   线上环境
    uglifyJsSourceMap: false,
  },
  device: {                                            //   使用设备配置
    type: "pc", //pc（px单位）或mobile（rem单位）
    width: 750, //只有mobile此字段才生效，值为设计图的宽度，1rem=100px
  },

  babel: {                                             //   babel相关配置
    presets: [
      ["env", {
        modules: false
      }],
    //   "stage-0"
    ],
    plugins: [
      ["transform-runtime",
        {
          "helpers": false,
          "polyfill": false,
          "regenerator": true,
          "moduleName": "babel-runtime",
        }
      ],
      "syntax-dynamic-import", 
      "transform-object-rest-spread",
      "transform-react-jsx",
    //   使用antd-mobile插件时进行如下配置
    //   ["import", {
    //     libraryName: "antd-mobile",
    //     style: true,
    //   }],
      //   使用antd插件时进行如下配置
      ["import", { 
        "libraryName": "antd",
        "libraryDirectory": "es", 
        "style": "css" 
      }]
    ]
  },

  esLint: {                                             //   eslint相关配置
    esLintUse: true, //是否使用eslint
    config: {
      root: true,
      parser: 'babel-eslint',
      parserOptions: {
        sourceType: 'module'
      },
      env: {
        browser: true,
      },
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      extends: 'standard',
      // required to lint *.vue files
      plugins: [
        'html'
      ],
      // add your custom rules here
      'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
        "quotes": ["error", "single"], //字符串必须使用单引号
        "semi": [2, "always"], //语句强制分号结尾(可选)
        "indent": [2, 4], //缩进风格
        "eqeqeq": 2, //必须使用全等
        // "eol-last": 2,//文件以单一的换行符结束
        "curly": [2, "all"], //必须使用 if(){} 中的{}
        "camelcase": 2, //强制驼峰法命名
        "consistent-this": [2, "that"], //this别名
        // "no-unused-vars": [2],//不能有声明后未被使用的变量或参数
        "no-alert": 0, //禁止使用alert confirm
        "no-new": 0,
        "no-undef": 0
      }
    }
  },
}


```

