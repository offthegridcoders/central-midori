'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var concat = require('gulp-concat');

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
});

gulp.task('sass', function () {
  gulp.src([
    './public/**/*.scss',
    './templates/**/*.scss',
    './partials/**/*.scss'
  ])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.css')) // this is what was missing
    .pipe(gulp.dest(dist.css));
});

gulp.task('copy-images', function () {
  gulp.src([
    './partials/**/*.jpg',
    './partials/**/*.png',
    './templates/**/*.jpg',
    './templates/**/*.png'
  ])
    .pipe(gulp.dest('./docs/assets/'));
});

gulp.task('copy-public-assets', function () {
  gulp.src(['./public/assets/favicon/*.*'])
    .pipe(gulp.dest('./docs/favicon/'));

  gulp.src(['./public/assets/logos/*.*'])
    .pipe(gulp.dest('./docs/logos/'));
});

gulp.task('copy-js', function () {
  gulp.src('./public/js/**/**.js')
    .pipe(gulp.dest('./docs/js/'));
});

gulp.task('copy-vendor', function () {
  gulp.src('./vendor/**/**.*')
    .pipe(gulp.dest('./docs/vendor/'));
});

gulp.task('default', ['build']);

gulp.task('build', ['clean']);

gulp.task('clean', function() {
  return gulp.src('./docs/', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean', 'sass', 'html', 'copy-images', 'copy-vendor', 'copy-js', 'copy-public-assets'], function() {
  browserSync.init({
    server: "./docs"
  });

  gulp.watch([
    './partials/**/*.jpg',
    './partials/**/*.png',
    './templates/**/*.jpg',
    './templates/**/*.png'
  ], ['copy-images']).on('change', browserSync.reload);

  gulp.watch([
    './public/**/*.scss',
    './templates/**/*.scss',
    './partials/**/*.scss'
  ], ['sass']).on('change', browserSync.reload);
  gulp.watch('./templates/**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./partials/**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./public/js/**/*.js', ['copy-js']).on('change', browserSync.reload);
  gulp.watch('./public/assets/**/*.*', ['copy-public-assets']).on('change', browserSync.reload);
});
