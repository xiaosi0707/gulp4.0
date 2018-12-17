/* create by wyunfei */
'use strict'
let gulp = require('gulp'); // 引入本地gulp
var concat = require('gulp-concat'); // 合并JS的插件
var sass = require('gulp-ruby-sass'); // sass编译
var webServer = require('gulp-webserver') // 服务器
var imageMin = require('gulp-imagemin') // 图片压缩
var prefixer=require('gulp-autoprefixer'); // css前缀
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
        .pipe(prefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                // remove:true //是否去掉不必要的前缀 默认：true
            }))
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

// css前缀
// gulp.task('prefixerTask',function(cb){　　　　　　//做一个gulp的任务
//     pump([　　　　　　　　　　　　　　　//添加任务到管道,排队
//         gulp.src('./src/assets/css/*.scss'),　　　　　　//这是查找css的路径
//         prefixer({　　　　　　　　　　　　//这是自动处理的参数
//             borwsers:["last 2 versions"],　　　　//针对游览器
//             remove:true
//         }),gulp.dest('./dist/test')　　　　　　//这是输出css的路径,如果该文件夹没有,那就自动创建
//     ],cb)　　　　　　　　　　　　　　　　////cb跟踪的参数,监控用的.
// })

// 通过gulp命令启动sass编译和服务器
gulp.task('default', gulp.parallel('sassWatch', 'webserver', 'imageTask'));