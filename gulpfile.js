const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const prettify = require('gulp-jsbeautifier');

gulp.task('serve', ['scss'], function () {
  browserSync.init({
    server: './public',
    browser: 'google chrome'
  });

  gulp.watch('scss/vendor/*.css', ['css']);
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('public/**/*.html').on('change', browserSync.reload);
});

gulp.task('css', function () {
  return gulp.src('scss/vendor/*.css')
    .pipe(gulp.dest('public/assets/css/vendor'))
    .pipe(browserSync.stream());
});

gulp.task('scss', ['css'], function () {
  const processors = [
    cssnano()
  ];

  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(prettify({ 'indent_size': 2, 'indent_char': ' ' }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
