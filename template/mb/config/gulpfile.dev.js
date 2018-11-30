var gulp = require("gulp")
var webserver = require('gulp-webserver'); //web服务热启动
var sass = require('gulp-sass'); //sass编译
var sequence = require('gulp-sequence');
var autoprefixer = require('gulp-autoprefixer'); //自动添加浏览器前缀
const eslint = require('gulp-eslint');
var browserify = require('gulp-browserify'); //模块化的打包
var mock = require("../mock/index.js")
var rev = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //- 路径替换
const config = require("./config.js")
var chokidar = require('chokidar'); //文件监听
var log = console.log.bind(console);
//sass编译
gulp.task('devSass', function() {
    gulp.src(config.dev.sass.entry)
        .pipe(sass())
        .pipe(autoprefixer({
            borwsers: ['last 2 versions', 'Android > 4.0']
        }))
        .pipe(gulp.dest(config.dev.sass.output)) //输出到本地的路径
});
// css文件的copy
gulp.task('devCss', function() {
    gulp.src(config.dev.css.entry)
        .pipe(gulp.dest(config.dev.css.output)) //输出到本地的路径
});
// js检测
gulp.task("devJsEslint", function() {
        gulp.src(config.dev.js.entry)
            .pipe(eslint(config.esLint.config))
            .pipe(eslint.format())
            .pipe(eslint.results(results => {
                // Called once for all ESLint results.
                log(`Total Results: ${results.length}`);
                log(`Total Warnings: ${results.warningCount}`);
                log(`Total Errors: ${results.errorCount}`);
            }))

    })
    // js任务
gulp.task("devJsModule", function() {
    if (config.jsModule) {
        gulp.src(config.dev.js.entry)
            .pipe(browserify({
                insertGlobals: true,
                debug: !gulp.env.production
            }))
            .pipe(gulp.dest(config.dev.js.output))
    } else {
        gulp.src(config.dev.js.entry)
            .pipe(gulp.dest(config.dev.js.output))

    }

})

// 静态文件的copy
gulp.task('devCopy', function() {
    // static的复制
    gulp.src(config.dev.static.entry)
        .pipe(gulp.dest(config.dev.static.output))

    // html的复制
    gulp.src(config.dev.page.entry)
        .pipe(gulp.dest(config.dev.page.output))
        .on('end', () => {
            // 只有监听到html复制完毕，才会启动服务
            sequence(['devServer'], () => {
                log("服务启动")
            })
        });

});

// html监听
gulp.task('htmlListen', function() {
    // static的复制

    // html的复制
    gulp.src(config.dev.page.entry)
        .pipe(gulp.dest(config.dev.page.output))
});



//热启动服务
gulp.task("devServer", function() {

    gulp.src(config.dev.path)
        .pipe(webserver({
            host: config.dev.host,
            port: config.dev.port,
            livereload: true,
            directoryListing: true,
            open: config.dev.open, //入口启动页面
            middleware: config.dev.middleware,
            proxies: config.dev.proxies
        }));
})


// 监控变动
gulp.task("devWatch", function() {
    chokidar.watch(config.dev.css.entry).on('all', (event, path) => {
        sequence(["devCss"], () => {
            log("css监听")
        })
    });
    chokidar.watch(config.dev.page.entry).on('all', (event, path) => {
        sequence(["htmlListen", 'devSass', "devCss"], () => {
            log("page监听")
        })
    });
    chokidar.watch(config.dev.sass.entry).on('all', (event, path) => {
        sequence(['devSass'], () => {
            log("sass监听")
        })
    });
    chokidar.watch(config.dev.js.entry).on('all', (event, path) => {

        config.esLint.esLintUse ? sequence(["devJsModule", 'devJsEslint'], () => {
            log("js监听")
        }) : sequence(["devJsModule"], () => {
            log("js监听")
        })

    });
    chokidar.watch(config.dev.static.entry).on('all', (event, path) => {
        // static的复制
        gulp.src(config.dev.static.entry)
            .pipe(gulp.dest(config.dev.static.output))
        log("静态文件监听")
    });

})

gulp.task("dev", function() {
    sequence(["devCopy", 'devSass', "devCss", 'devJsModule'], function() {
        log("打包处理成功")
    })

    config.esLint.esLintUse ? sequence(['devJsEslint'], () => {}) : null

    sequence("devWatch", function() {
        log("监听成功")
    })
})