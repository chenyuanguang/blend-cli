let pathDir = "./src" //开发文件目录
let devSrc = "./devSrc" //开发环境文件生成目录
let buildSrc = "./build" //线上环境文件生成目录

//基础配置 
let baseConfig = (output) => {
    return {
        sass: {
            entry: [`${pathDir}/sass/**/*.scss`],
            output: `${output}/css`
        },
        css: {
            entry: [`${pathDir}/css/**/*.css`],
            output: `${output}/css`
        },
        js: {
            entry: [`${pathDir}/js/**/*.js`, '!node_modules/**'],
            output: `${output}/js`
        },
        page: {
            entry: [`${pathDir}/page/**/*.html`],
            output: `${output}/page`
        },
        static: {
            entry: [`${pathDir}/static/**/*`],
            output: `${output}/static`
        }
    }
}

module.exports = {
    dev: {
        host: "127.0.0.1", //服务主机
        port: 8888, //服务端口
        path: devSrc,
        output: devSrc, //静态文件路径
        livereload: true, //时时更新
        directoryListing: true, //监听文件夹
        open: "/page/index.html", //入口启动页面
        proxies: [{
            source: '/abc',
            target: 'http://localhost:8080/abc',
            options: { headers: { 'ABC_HEADER': 'abc' } }
        }], //代理接口
        middleware: require("../mock/index"),
        ...baseConfig(devSrc)
    },
    build: {
        path: buildSrc,
        htmlMinify: {
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        },
        ...baseConfig(buildSrc)
    },
    jsModule: true, //使用commonjs进行模块化开发（如果采用require需要将此设置为false）
    //   eslint相关配置
    esLint: {
        esLintUse: true, //是否使用eslint
        config: {
            root: true,
            parserOptions: {
                sourceType: "module"
            },
            env: {
                browser: true,
                commonjs: true,
            },
            // https://github.com/standard/standard/blob/master/docs/RULES-en.md
            extends: 'standard',
            // required to lint *.vue files
            plugins: [
                'requirejs'
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
                "no-undef": 0,
                "requirejs/no-invalid-define": 2,
                "requirejs/no-multiple-define": 2,
                "requirejs/no-named-define": 2,
                "requirejs/no-commonjs-wrapper": 2,
                "requirejs/no-object-define": 1
            }
        }
    }
}