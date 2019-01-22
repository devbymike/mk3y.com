// Mike's Gulp Workflow
'use strict';


// Require our stuff
var    gulp = require('gulp'),
browserSync = require('browser-sync').create(),
   cleanCSS = require('gulp-clean-css'),
   imagemin = require('gulp-imagemin'),
     concat = require('gulp-concat'),
     uglify = require('gulp-uglify'),
     rename = require('gulp-rename'),
     deploy = require('gulp-gh-pages'),
      gutil = require('gulp-util'),
       sass = require('gulp-sass'),
       maps = require('gulp-sourcemaps'),
         cp = require('child_process');


// Set those paths
const base_path = './',
            src = base_path + '_dev',
           dist = base_path + 'assets',
          paths = {
              js: src + '/js/*.js' ,
             img: src + '/img/*',
            scss: src + '/sass/app.scss',
          jekyll: ['*.html', '*.md', '_posts/*.md', '_layouts/*.html', '_includes/*.html'],
        critical: src + '/sass/critical.scss'
          };


// Do important stuff with SASS
gulp.task('makeCRITICAL', () => {
    return gulp.src(paths.critical)
        .pipe(sass())
        .pipe(cleanCSS({compatibility: '*'}, {level: '2'}))
        .pipe(rename({
            basename: 'criticalCSS',
            extname: '.php'
          }))
        .pipe(gulp.dest('_inc/'))
        .pipe(browserSync.stream());
});


// Do stuff with SASS
gulp.task('makeCSS', () => {
    return gulp.src(paths.scss)
        .pipe(maps.init())
        .pipe(sass())
        .pipe(cleanCSS({compatibility: '*'}, {level: '2'}))
        .pipe(rename('styles.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});


// Do stuff with Javascript
gulp.task('makeJS', () => {
    return gulp.src(paths.js)
        .pipe(maps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename('scripts.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});


// Let's compress some images
gulp.task('compressIMG', () => {
    return gulp.src(paths.img)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('images/'));
});


// Build Jekyll
gulp.task('jekyll-build', (code) => {
  return cp.spawn('jekyll', ['build', '--incremental'], { stdio: 'inherit' }) // Adding incremental reduces build time.
    .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
    .on('close', code);
});


// Rebuild Jekyll with Delay
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
    browserSync.reload({reloadDelay: 5000});
});


// Setup a Gulp Server with Browser Sync
gulp.task('serve', ['makeCSS', 'makeJS', 'jekyll-build'], () => {
    browserSync.init({
        server: './public_html/',
        port: 3000
    });
    gulp.watch(src + '/sass/*.scss', ['makeCSS']).on('change', browserSync.reload);
    gulp.watch(src + '/js/*.js', ['makeJS']).on('change', browserSync.reload);
    gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});


// DEPLOY TO GITHUB
gulp.task('push', () => {
  return gulp.src("./**/*")
    .pipe(deploy())
});


// Do this stuff by default
gulp.task('default', ['serve']);
gulp.task('build', ['makeCSS', 'makeJS', 'compressIMG', 'jekyll-build']);
gulp.task('deploy', ['build', 'push']);
