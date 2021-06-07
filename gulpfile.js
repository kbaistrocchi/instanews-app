// Modules

const gulp = require('gulp');

const terser = require('gulp-terser'),
rename = require('gulp-rename'),
sass = require('gulp-sass'),
cssnano = require('gulp-cssnano'),
autoprefixer = require('gulp-autoprefixer'),
eslint = require('gulp-eslint'),
browserSync = require('browser-sync').create()

gulp.task('eslint', function() {
    return gulp
    .src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

// converts sass to css (instead of sass watch), add prefixes, minifies
gulp.task('sass', function() {
    return gulp
    // locate css files
    .src('./sass/style.scss')
    // convert sass to css
    .pipe(sass())
    // add prefixes for browser compatibility
    .pipe(
        autoprefixer())
    // add css to build directory
    .pipe(gulp.dest('./build/css'))
    // minify css
    .pipe(cssnano())
    // rename minified file
    .pipe(rename('style.min.css'))
    // add final output to build dir
    .pipe(gulp.dest('./build/css'))
    // syncs browser whenever change is made
    .pipe(browserSync.stream())
    
})

gulp.task('minify-pretty-dropdown', function() {
    return gulp
    .src('./css/prettydropdowns.css')
    .pipe(cssnano())
    .pipe(rename('prettydropdowns.min.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
})


// minify js and outputs to build directory
gulp.task('scripts', function() {
    return gulp
    // where to consume all js files
    .src('./js/*.js')
    .pipe(terser())
    // rename minified files
    .pipe(rename({ extname: '.min.js'}))
    // where to save files
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
  
})


gulp.task('default', function() {
    
    // configure server
    browserSync.init({
        server: {
            baseDir: './'
        }
    })

    // watch any js files and if there's a change, run my series of scripts defined above
    gulp.watch('js/*.js', gulp.series(['scripts', 'eslint']) ).on('change', browserSync.reload)
    // run sass above if changed occur in sass files
    gulp.watch('./sass/*.scss', gulp.series('sass')).on('change', browserSync.reload)
    gulp.watch('./css/prettydropdowns.css', gulp.series('minify-pretty-dropdown')).on('change', browserSync.reload)
    gulp.watch('./*.html').on('change', browserSync.reload)

     
})