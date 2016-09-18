var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var connect = require('gulp-connect');
var ejs = require('gulp-ejs');

gulp.task('sass', function() {
  var processor = [autoprefixer];
  return gulp.src('./src/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss(processor))
          .pipe(gulp.dest('./dist'));
});

gulp.task('build:views', function() {
  return gulp.src('./views/*.ejs')
             .pipe(ejs())
             .pipe(gulp.dest('./views'));
});

gulp.task('connect', () => {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('livereload', () => {
  return gulp.src('./views/**/*.html')
             .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(['./views/**/*.html', './src/stylesheets/**/*.scss'], [ 'sass','livereload']);
});

gulp.task('default', ['connect', 'watch']);