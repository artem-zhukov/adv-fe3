var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');


gulp.task('gulp', function() {
    return gulp.src('./**/*/gulpfile.js')
        .pipe(gulpGulp());
});

gulp.task('gulp-clean', function () {
    return gulp.src('app/tmp', {read: false})
        .pipe(clean());
});

gulp.task('build', function(callback) {
    runSequence('build-clean',
        ['build-scripts', 'build-styles'],
        'build-html',
        callback);
});

gulp.task('start', ['gulp', 'gulp-clean', 'build']);