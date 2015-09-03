// Require Gulp
 var    gulp = require('gulp');
        util = require("gulp-util"),
        sass = require('gulp-sass');
      concat = require('gulp-concat'),
autoprefixer = require('gulp-autoprefixer'),
   minifycss = require('gulp-minify-css'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      notify = require('gulp-notify'),
      prefix = require('gulp-autoprefixer');
       watch = require('gulp-watch');
    critical = require('critical');
 

gulp.task('sass', function () {
    gulp.src('assets/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css/'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./'))
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('critical', function () {
   critical.generate({
    base: './',
    src: 'public/index.html',
    css: 'public/style.css',
    dest: '_includes/critical.css',
    width: 320,
    height: 480,
    minify: true
  });
});
 
 gulp.task('watch', function() {
   gulp.watch('app/assets/css/*.scss', ['sass'])
 })
 
 gulp.task('default', ['sass', 'watch']);