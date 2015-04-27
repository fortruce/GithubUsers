var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var sourceMaps = require('gulp-sourcemaps');
var reload = browserSync.reload;

var paths = {
  app: './src/js/app.js',
  src: 'src/js/**/*.*',
  buildJs: 'build/js/',
  buildCss: 'build/css/',
  build: 'build/',
  buildApp: 'app.js',
  html: 'src/index.html',
  scss: 'src/scss/**/*.scss',
  scssMain: 'src/scss/main.scss'
};



gulp.task('browserify', function() {
  var watcher = watchify(browserify({
    entries: [paths.app],
    transform: [babelify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  bundle(watcher);

  return watcher.on('update', function() {
    console.log('browserify: updated');
    bundle(watcher);
  });
});

function bundle(b) {
  return b.bundle()
          // catch transform errors and end current pipe w/o crashing
          .on('error', function(err) {
            console.log(err.message);
            console.log('error');
            this.emit('end');
          })
          .pipe(source(paths.app))
          .pipe(rename(paths.buildApp))
          .pipe(gulp.dest(paths.buildJs))
          .on('end', reload);
}

gulp.task('watch', ['browserify', 'html', 'scss'], function () {
  gulp.watch(paths.src, ['browserify']);
  gulp.watch(paths.html, ['html'])
      .on('change', reload);
  gulp.watch(paths.scss, ['scss']);
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

gulp.task('browserSync', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
});

gulp.task('default', ['browserSync']);