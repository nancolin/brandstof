const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const fileInclude = require('gulp-file-include');
const htmlMinifier = require('gulp-html-minifier');
const babelMinify = require("gulp-babel-minify");
const cssSlam = require('css-slam').gulp;

gulp.task('build', function() {
  return del(['build'])
  .then(() => {
    gulp.src([
      'src/**/*',
      '!src/_*',
      '!src/_*/**/*'
    ])
    .pipe(gulpif(/\.html$/, fileInclude({
      prefix: '@@',
      basepath: './src/'
    })))
    .pipe(gulpif(/\.html$/, htmlMinifier({
      collapseWhitespace: true
    })))
    .pipe(gulpif(/\.html|.css$/, cssSlam()))
    .pipe(gulpif(/\.js$/, babelMinify({
      mangle: {
        keepClassName: true
      }
    })))
    .pipe(gulp.dest('build/'));
  });
});

gulp.task('default', ['build']);
