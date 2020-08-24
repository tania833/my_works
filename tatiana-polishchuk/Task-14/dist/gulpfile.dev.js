'use strict';

var gulp = require('gulp');

var _require = require('gulp'),
    src = _require.src,
    dest = _require.dest,
    series = _require.series,
    parallel = _require.parallel;

var sass = require('gulp-sass');

var watch = require('gulp-watch');

var autoprefixer = require('gulp-autoprefixer');

var notify = require("gulp-notify");

function sassToCss() {
  return gulp.src('sass/*.scss').pipe(sass({
    includePaths: ['node_modules']
  })).pipe(notify("Template: <%= file.relative %>")).on("error", notify.onError("Error: <%= error.message %>")).pipe(gulp.dest('css'));
}

;

function watchSassPug() {
  return gulp.src('.').pipe(watch('sass/*.scss', gulp.parallel(sassToCss)));
}

;

function autoprefixerCss() {
  return gulp.src('css/style.css').pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  })).pipe(gulp.dest('dist'));
}

;
exports["default"] = series(sassToCss, autoprefixerCss, watchSassPug);