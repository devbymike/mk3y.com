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
    gulp.src('app/assets/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/assets/css/'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app/'))
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/'));
});


gulp.task('critical', function () {
   critical.generate({
     base: './',
     src: 'deploy/index.html',
     css: 'deploy/style.css',
     dest: 'app/_includes/critical.css',
     width: 320,
     height: 480,
     minify: true
   });
 });
 
 gulp.task('watch', function() {
   gulp.watch('app/assets/css/*.scss', ['sass'])
 })
 
 gulp.task('default', ['sass', 'watch']);