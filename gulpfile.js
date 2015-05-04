var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    less = require('gulp-less'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    size = require('gulp-size'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    amdOptimize = require("amd-optimize");


gulp.task('rjs', function () {
    gulp.src('app/scripts/**/*.js')
        .pipe(amdOptimize('main'), {
            paths: {
                "zepto": "bower_components/zepto/zepto"
            },
            shim: {
                "zepto": {
                    exports: "zepto"
                }
            }

        })
        .pipe(concat("index.js"))           //合并
        .pipe(gulp.dest("dist/js"))          //输出保存
        .pipe(rename("index.min.js"))          //重命名
        .pipe(uglify())                        //压缩
        .pipe(gulp.dest("dist/js"));         //输出保存 ;
});

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(jscs());
});


gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(minifyHtml({
            conditionals: true,
            spare: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('styles', function () {
    return gulp.src('app/styles/**/*.less')
        .pipe(less())
        .pipe(concat('style.css'))
        //.pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(concat('wx-all.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('default', function () {
    //监听
    gulp.watch(['app/scripts/**/*.js', 'gulpfile.js'], ['jshint']);
    gulp.watch(['app/styles/**/*.less'], ['styles']);
    gulp.watch(['app/**/*.html'], ['html']);
    gulp.watch(['app/images/**/*'], ['images'])
});