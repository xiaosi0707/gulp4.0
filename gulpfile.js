/* create by wyunfei */
'use strict'
let gulp = require('gulp'); // 引入本地gulp
var concat = require('gulp-concat'); // 合并JS的插件
var sass = require('gulp-ruby-sass');
var webServer = require('gulp-webserver')
var imageMin = require('gulp-imagemin')
/*
  task定制任务
* src方法是指定需要处理的源文件的路径
* dest方法是指定处理完后文件输出的路径；
* .pipe()管道，前一个的输出就是后一个的输入
* */

// 配置合并js任务
gulp.task('jsTask', function () {
    gulp.src('./src/components/**/*.js') // 第一步：找到原材料(源文件)
        .pipe(concat('all.js'))   // 加工
        .pipe(gulp.dest('./dist/js')) // 出厂
})

// sass任务配置
gulp.task('sassTask', function () {
    return sass('./src/assets/css/app.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('./dist/css'))
})

// 实时监听sass
gulp.task('sassWatch', function () {
    // gulp.watch('./src/assets/css/app.scss', ['sassTask'])
    gulp.watch('./src/assets/css/app.scss', gulp.series('sassTask')); // 升级了4.0
})

// 服务器配置
gulp.task('webserver', function() {
    gulp.src('./dist')
        .pipe(webServer({
            host: 'localhost',
            port: 8080,
            livereload: true,
            open: true
        }));
});

// 拷贝页面到dist目录下
gulp.task('copyHtml', function () {
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'))
})
// 压缩图片任务
gulp.task('imageTask',function(){
    gulp.src('./src/assets/imgs/*.*')
        .pipe(imageMin({progressive: true}))
        .pipe(gulp.dest('./dist/imgs'))
})

// 通过gulp命令启动sass编译和服务器
gulp.task('default', gulp.parallel('sassWatch', 'webserver', 'imageTask'));