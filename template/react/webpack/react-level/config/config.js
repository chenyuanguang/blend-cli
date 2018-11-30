var path = require("path")

module.exports = {
// webpack基本配置 
  base: {
    entry: path.join(__dirname, `../src/main.jsx`),
    outputPath: path.join(__dirname, "../dist"),
    outputFileName: "[id]-[name]-[hash].js",
    templatePath: `./src/index.html`,
    publicPath: "http://localhost:8099/",
    htmlMinify: {
      removeComments: true, //去除注释
      collapseWhitespace: true, //去除空格
      removeAttributeQuotes: true, //移除属性的引号
      removeEmptyAttributes: true, //去除空属性
    },
    cssType:"less",     //采用哪种css的类型
  },
//   开发环境
  dev: {
    host: "localhost",
    port: 8099,
    browserOpen: true,
    devtool: "cheap-module-eval-source-map",
    proxy: {
      "/apis": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/apis": "/api"
        },
        secure: false
      }
    },
    before: require("../mock/index"),
  },
//   线上环境
  build: {
    uglifyJsSourceMap: false,
  },
//   使用设备配置
  device: {
    type: "pc",
    width: 750,
  },
//   babel相关配置
  babel: {
    presets: [
      // "env",
      ["env", {
        modules: false
      }],
      "stage-0",
      "react",
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
      ["import", {
        libraryName: "antd-mobile",
        style: true,
      }]
    ]
  },
//   eslint相关配置
  esLint: {
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
