'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');

const htmlPartial = require('gulp-html-partial');

let dist = {
  css: './dist/css',
};

gulp.task('html', function () {
  gulp.src(['templates/*.html'])
    .pipe(htmlPartial({
      basePath: 'partials/'
    }))
    .pipe(gulp.dest('./dist/'));

  return gulp.src('./dist/partials/', {read: false})
    .pipe(clean());
});

gulp.task('sass', function () {
  return gulp.src('./public/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(dist.css));
});

gulp.task('copy-images', function () {
  gulp.src('./public/assets/**/**.*')
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('default', ['sass', 'html', 'copy-images'], function() {
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('./public/assets/**/**.*', ['copy-images']).on('change', browserSync.reload);
  gulp.watch('./public/scss/**/*.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch('./templates/**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./partials/**/*.html', ['html']).on('change', browserSync.reload);
});
