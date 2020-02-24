"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./vendor/bootstrap'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));
    var jqueryeasing = gulp.src([
      './node_modules/jquery.easing/*'
    ])
    .pipe(gulp.dest('./vendor/jquery-easing'));
    var magnificpopup = gulp.src([
      './node_modules/magnific-popup/**/*'
    ])
    
    .pipe(gulp.dest('./vendor/magnific-popup'));

    var simplebar = gulp.src([
      './node_modules/simplebar/**/*'
    ])
    .pipe(gulp.dest('./vendor/simplebar'));

    var filterizr = gulp.src([
      './node_modules/filterizr/**/*'
    ])
    .pipe(gulp.dest('./vendor/filterizr'));

    var fontawesome = gulp.src([
      './node_modules/@fortawesome/fontawesome-free/**/*'
    ])
    .pipe(gulp.dest('./vendor/fontawesome'));


    
  return merge(bootstrap, jquery, jqueryeasing, magnificpopup, simplebar, filterizr, fontawesome);
}

// Watch files
function watchFiles() {
  gulp.watch("./**/*.css", browserSyncReload);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
