var destDir = 'bin';
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var less = require('gulp-less');
var argv = require('yargs').argv;
var debug = require( 'gulp-debug' );
var htmlhint = require('gulp-htmlhint');
var clean = require( 'gulp-clean' );
var livereload = require('gulp-livereload');
var csscomb = require('gulp-csscomb');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var minifyCss = require('gulp-minify-css');
var uglify = require("gulp-uglify");

gulp.task('default', ['libs', 'build']);

gulp.task('defaultAdd', ['css', 'js', 'html', 'images'])

gulp.task('copy-static', function () {
    return gulp.src(['images/**/*.{png,jpg,svg}', '*.html', '**.*.js'])
        .pipe( gulp.dest(destDir) );
});

gulp.task('bower', function () {
    return bower('libs');
});

gulp.task('build', ['copy-static', 'css']);

gulp.task('libs',['bower'], function () {
    return gulp.src('libs/**/*.min.js')
        .pipe(gulp.dest(destDir+'/libs/'));
});

gulp.task('images', function () {
    return gulp.src(['**/*.@(png|jpg|svg)', '!**/node_modules/**', '!**/libs/**', '!**/bin/**']) //Если bin не исключить, то начинает копировать сам себя
        .pipe(gulp.dest(destDir));
});

gulp.task('html', function () {
    return gulp.src(['**/*.html','!**/node_modules/**', '!**/libs/**', '!**/bin/**'])
        .pipe(gulp.dest(destDir));
});

gulp.task('css', function () {
    return gulp.src('styles/**/*.less')
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulpif(argv.prod, minifyCss()))
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
        .pipe(gulp.dest( destDir+'/static/styles.css'));
});

gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
        .pipe(gulp.dest(destDir));
})

gulp.task( 'reload-page', function () {
        gulp.src('*.html')
        connect.server({
        root: 'app',
        livereload: true
    });
} );

gulp.task( 'clean', function (cb) {
    return gulp.src( destDir + '/*', { read: false } )
        .pipe( clean( { force: true } ) );
} );


gulp.task( 'watch', function () {
    gulp.watch('**/*.@(less)', [ 'css' ] );
    gulp.watch('**/*.@(png|jpg|svg)', [ 'images' ] );
    gulp.watch('**/*.html', [ 'html' ] );
    gulp.watch('**/*.js', [ 'js' ] );
} );

gulp.task('autoprefix', function () {
    return gulp.src(destDir + '/static/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

//CODESTYLE
gulp.task('csscomb', function () {
    return gulp.src('styles/*.less')
        .pipe(csscomb().on('error', handleError))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task('htmlhint', function () {
    gulp.src("*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.reporter('HTML error'))
});

gulp.task('jscs', function () {
    return gulp.src('js/*.js')
        .pipe(jscs())
        .pipe(gulp.dest(destDir));
});

gulp.task('jshint', function () {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('JS fatal error'));
});

gulp.task('style', function () {
    return bower ('csscomb')
        .pipe(jscs())
        .pipe(jshint())
        .pipe(htmlhint());
});

//CODESTYLE//

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
    return this;
}

