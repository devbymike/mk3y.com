var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    rename       = require('gulp-rename');

gulp.task('minify', function () {
   return gulp.src('assets/js/theme.js')
      .pipe(uglify())
      .pipe(rename('theme.min.js'))
      .pipe(gulp.dest('assets/js'))
});

gulp.task('sass', function() {
  return gulp.src('assets/css/init.scss')
    .pipe(sass())
    .pipe(autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ))
    .pipe(minifycss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(''))
});