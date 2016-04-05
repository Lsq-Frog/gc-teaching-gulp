// 引入 gulp及组件
var gulp = require('gulp'), //基础库
    imagemin = require('gulp-imagemin'), //图片压缩
    less = require('gulp-less'), //sass
    minifycss = require('gulp-minify-css'), //css压缩
    jshint = require('gulp-jshint'), //js检查
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    clean = require('gulp-clean'), //清空文件夹
    base64 = require('gulp-base64'); //图片Base64编码

// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst))
});


// 样式处理
var config = {
    src: './src/css/*.css',
    dest: './dist/css',
    options: {
        baseDir: 'dist',
        extensions: ['png', 'jpg'],
        maxImageSize: 20 * 1024, // bytes
        debug: true
    }
}
gulp.task('css', function() {
    var cssSrc = './src/less/*.less',
        cssDst = './dist/css',
        cssDstz = './src/css';

    gulp.src(cssSrc)
        .pipe(less({ style: 'expanded' }))
        .pipe(gulp.dest(cssDstz))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
});

// 图片处理
gulp.task('images', function() {
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
})

// js处理
gulp.task('js', function() {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';

    gulp.src(jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], { read: false })
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'css', 'images', 'js');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
    // gulp.start('html', 'css', 'images', 'js');

    // 监听html
    gulp.watch('src/*.html', function(event) {
            gulp.run('html');
        })
        // 监听css
    gulp.watch('src/less/*.less', function() {
        gulp.run('css');
    });

    // 监听images
    gulp.watch('src/images/**', function() {
        gulp.run('images');
    });

    // 监听js
    gulp.watch('src/js/*.js', function() {
        gulp.run('js');
    });


    // });
});
