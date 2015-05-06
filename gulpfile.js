var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');



gulp.task('scripts', function () {
    gulp.src('app/scripts/**/*.js')
        .pipe(concat('simpleJQ.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/scripts'));
});



gulp.task('jshint', function () {
    return gulp.src(['app/scripts/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(jscs());
});





gulp.task('default', function () {
    //监听
    gulp.watch(['app/scripts/**/*.js', 'gulpfile.js'], ['jshint', 'scripts']);
});