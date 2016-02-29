var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var watch = require('gulp-watch');

gulp.task('browserify', function () {
    browserify('./src/js/index.js')
        .transform('babelify', {
            presets: ['es2015', 'react']
        })
        .bundle()
        .on('error', function (err) {
            console.log('Error: ' + err.message);
        })
        .pipe(source('index.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));

    gulp.src('package.json')
        .pipe(gulp.dest('dist'));

    gulp.src('src/styles/**')
        .pipe(gulp.dest('dist/styles'));

});

gulp.task('reload', ['browserify', 'copy'], function () {
    console.log('Reloading application...');
});

gulp.task('default', ['browserify', 'copy'], function () {
    gulp.watch('src/**/**/*', ['reload']);
});
