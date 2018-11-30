/**
 * Created by dream on 2017/4/23.
 */
var gulp = require('gulp');
var browserify = require('gulp-browserify'); //模块化的打包
var uglify = require('gulp-uglify'); //js的压缩
var concat = require('gulp-concat'); //文件合并
var sass = require('gulp-sass'); //sass编译
// var less = require('gulp-less');//less编译
var cleanCSS = require('gulp-clean-css'); //css的压缩
var rev = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //- 路径替换
var sequence = require('gulp-sequence');
var htmlmin = require('gulp-htmlmin'); //html压缩为一行
var autoprefixer = require('gulp-autoprefixer'); //自动添加浏览器前缀
const config = require("./config.js")

gulp.task('buildJspPackMin', function() {
    gulp.src(config.build.js.entry)
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(uglify())
        .pipe(rev()) //md5加密
        .pipe(gulp.dest(config.build.js.output))
        .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(`${config.build.path}/rev/js`)) //将re-manifest.json存放到的路径
        .on("end", () => {
            gulp.src([`${config.build.path}/rev/js/*.json`, `${config.build.page.output}/**/*.html`]) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
                .pipe(revCollector({
                    replaceReved: true,

                })) //- 执行文件内css名的替换
                .pipe(gulp.dest(config.build.page.output)); //- 替换后的文件输出的目录
        })
});
//文件拷贝；
gulp.task('buildCopy', function() {
    gulp.src(config.build.static.entry)
        .pipe(gulp.dest(config.build.static.output)) //输出到本地的路径

});
gulp.task('buildSass', function() {
    gulp.src(config.build.sass.entry)
        .pipe(sass())
        .pipe(autoprefixer({
            borwsers: ['last 2 versions', 'Android > 4.0']
        }))
        .pipe(rev()) //md5加密
        .pipe(gulp.dest(config.build.sass.output)) //输出到本地的路径
        .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(`${config.build.path}/rev/css`)) //将re-manifest.json存放到的路径
        .on("end", () => {
            gulp.src([`${config.build.path}/rev/css/*.json`, `${config.build.page.output}/**/*.html`]) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
                .pipe(revCollector({
                    replaceReved: true,

                })) //- 执行文件内css名的替换
                .pipe(gulp.dest(config.build.page.output)); //- 替换后的文件输出的目录
        })
})

gulp.task('buildCss', function() {

    gulp.src(config.build.css.entry)
        .pipe(cleanCSS())
        .pipe(rev()) //md5加密
        .pipe(gulp.dest(config.build.css.output)) //输出到本地的路径
        .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(`${config.build.path}/rev/css`)) //将re-manifest.json存放到的路径
        .on("end", () => {
            gulp.src([`${config.build.path}/rev/css/*.json`, `${config.build.page.output}/**/*.html`]) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
                .pipe(revCollector({
                    replaceReved: true,

                })) //- 执行文件内css名的替换
                .pipe(gulp.dest(config.build.page.output)); //- 替换后的文件输出的目录
        })
});


gulp.task('htmlcopy', function() {

    gulp.src(config.build.page.entry)
        .pipe(gulp.dest(config.build.page.output))
});
gulp.task('htmlminify', function() {

    gulp.src(config.build.page.entry)
        .pipe(htmlmin(config.build.htmlMinify))
        .pipe(gulp.dest(config.build.page.output))

});


gulp.task("build", function() {
    sequence("htmlcopy", "buildCopy", "buildSass", "buildJspPackMin", ["htmlminify"], function() {

        console.log("线上环境打包成功")
    })
})