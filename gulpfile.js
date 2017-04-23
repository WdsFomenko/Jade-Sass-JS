var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var http = require('http');
var st = require('st');
var liveServer = require("live-server");

var params = {
  port: 9090, // Set the server port. Defaults to 8080.
  host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "./dist", // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  ignore: 'scss,my/templates', // comma-separated string for paths to ignore
  file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  mount: [], // Mount a directory to a route.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

var paths = {
  scripts: 'src/js/*',
  images: 'src/img/*',
  style: 'src/style/*'
};

gulp.task('clean', function (cb) {
  return gulp.src('dist', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('sass', function() {
return sass('src/style/*')
  .on('error', sass.logError)
  .pipe(gulp.dest('dist/style'));
});

gulp.task('scripts', function () {
  return gulp.src(['src/js/*.js'])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('src/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('default', function (cb) {
  runSequence('build', 'watch', 'server', cb);
});

gulp.task('build', function (cb) {
  runSequence('clean', 'images', 'templates', 'sass', 'scripts', cb);
});

gulp.task('watch', function() {
  livereload.listen({ basePath: 'dist' });
  gulp.watch('src/**/*', ['build']);
});

gulp.task('server', function() {
  liveServer.start(params);
});
