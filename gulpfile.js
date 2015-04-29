var gulp = require('gulp');
var fs = require('fs');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
  app: './src/js/app.js',
  src: 'src/js/**/*.*',
  vendorJs: 'src/js/vendor/*.js',
  buildJs: 'build/js/',
  buildCss: 'build/css/',
  build: 'build/',
  buildApp: 'app.js',
  html: 'src/index.html',
  scss: 'src/scss/**/*.scss',
  scssMain: 'src/scss/main.scss'
};

gulp.task('browserify', function() {
  gulp.src(paths.app)
      .pipe(browserify({
        transform: ['babelify'],
      }))
      .pipe(gulp.dest(paths.buildJs));
});

gulp.task('watch', ['browserify', 'html', 'scss', 'vendor-js'], function () {
  gulp.watch(paths.src, ['browserify']);
  gulp.watch(paths.scss, ['scss']);
  gulp.watch(paths.vendorJs, ['vendor-js']);
  gulp.watch(paths.html, ['html']);

  gulp.watch(paths.buildJs + '**/*.*').on('change', reload);
  gulp.watch(paths.build + '*.html').on('change', reload);
});

/**
 * Copy index.html file into build folder and reload browserSync
 */
gulp.task('html', function () {
  gulp.src(paths.html)
      .pipe(gulp.dest(paths.build));
});

/**
 * Compile main Scss file into build folder and stream update browserSync
 */
gulp.task('scss', function () {
  gulp.src(paths.scssMain)
      .pipe(sass())
      .pipe(gulp.dest(paths.buildCss))
      .pipe(reload({stream: true}));
});

gulp.task('vendor-js', function () {
  gulp.src(paths.vendorJs)
      .pipe(gulp.dest(paths.buildJs));
});

gulp.task('browserSync', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
});

gulp.task('default', ['browserSync']);