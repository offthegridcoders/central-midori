'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');

const htmlPartial = require('gulp-html-partial');

var dist = {
  css: './docs/css',
};

gulp.task('html', function () {
  gulp.src(['templates/**/*.html'])
    .pipe(htmlPartial({
      basePath: 'partials/'
    }))
    .pipe(gulp.dest('./docs/'));

  return gulp.src('./docs/partials/', {read: false})
    .pipe(clean());
});

gulp.task('sass', function () {
  return gulp.src('./public/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(dist.css));
});

gulp.task('copy-images', function () {
  gulp.src('./public/assets/**/**.*')
    .pipe(gulp.dest('./docs/assets/'));
});

gulp.task('copy-js', function () {
  gulp.src('./public/js/**/**.js')
    .pipe(gulp.dest('./docs/js/'));
});

gulp.task('copy-vendor', function () {
  gulp.src('./vendor/**/**.*')
    .pipe(gulp.dest('./docs/vendor/'));
});

gulp.task('default', ['sass', 'html', 'copy-images', 'copy-vendor', 'copy-js'], function() {
  browserSync.init({
    server: "./docs"
  });
  gulp.watch('./public/assets/**/**.*', ['copy-images']).on('change', browserSync.reload);
  gulp.watch('./public/scss/**/*.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch('./templates/**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./partials/**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./public/js/**/*.js', ['copy-js']).on('change', browserSync.reload);
});
