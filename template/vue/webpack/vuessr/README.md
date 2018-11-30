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
│   ├── build.js                // 实现线上打包配置
│   ├── webpack.base.js         // webpack基本配置
│   ├── webpack.client.js       // webpack客户端环境
│   ├── webpack.server.js       // webpack服务端环境
│   ├── webpack.style.js        // 关于css样式的处理
├── mock    
│   ├── data.js                 //mock的数据文件
│   ├── index.js                //mock的接口文件
├── server                                
│   ├── dev-server.js           //本地开发环境服务
│   ├── server.js               //线上服务
├── src    
│   ├── components              // 组件
│   ├── directives              // 指令
│   ├── service                 // 接口api统一调用
│   ├── router                  // 路由
│   ├── static                  // 静态文件
│   ├── store                   // vuex
│   ├── util                    // 工具文件夹
│   ├── index.html              // 单页面入口html       
│   ├── app.js                  // 针对客户端和服务端返回应用实例         
│   ├── entry-client.js         // 客户端入口文件
│   ├── entry-server.js         // 服务端入口文件
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
        outputPath: path.join(__dirname, "../dist"),    //项目的打包文件夹
        outputFileName: "[id]-[name]-[hash].js",        //打包后文件的命名格式
        templatePath: `./src/index.html`,               //入口html，（自动生成）
        publicPath: '/dist/',                           //打包后文件自动添加的绝对路径
        cssType: false,                                 //采用哪种css的类型
    },
    devServer: {
        host: '127.0.0.1',                              //本地服务的主机号
        port: '8888',                                   //本地服务的端口号
        browserOpen: true,                              //是否自动在浏览器中打开
        proxy: {                                        //代理
            "/blogs": {
                target: "http://www.cygdream.com/",
                pathRewrite: {
                    "^/blogs": "/blog"
                }
            }
        },
        before: require("../mock/index"),                 //mock接口
    },
    //   开发环境
    clientConfig: {
        devtool: 'cheap-module-eval-source-map',          //形成sourceMap的类型
        entry: {
            app: path.join(__dirname, `../src/entry-client.js`)
        },
    },
    //   线上环境
    serverConfig: {
        uglifyJsSourceMap: false,
        entry: path.join(__dirname, `../src/entry-server.js`),
    },
    //   使用设备配置
    device: {
        type: 'pc',
    },
    //   babel相关配置
    babel: {
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
            "syntax-dynamic-import", "transform-object-rest-spread"
        ]
    },
    //   eslint相关配置
    esLint: {
        esLintUse: false, //是否使用eslint
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

