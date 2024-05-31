const { src, dest, watch, series, parallel } = require('gulp')
// Have gulp-sass and sass in the same constant
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
// Tool that let you know in what SASS file is the style you're looking for.
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')

const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

const MAIN_SASS_ROUTE = 'src/scss/app.scss'

function css(done) {
  // Compile SASS
  // Step 1: Identify file
  src(MAIN_SASS_ROUTE)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' })) // Step 2: Compile
    .pipe(postcss([autoprefixer(), cssnano()])) // Step 2.1 
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css')) // Step 3: Save the .css
  
    done()
}

function imagenes(done) {
  src('src/img/**/*')
  // Image min is generating broken images
    // .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest('build/img'))
  done()
}

function versionWebp() {
  // If we use return, there is no need to use the done callback
  return src('src/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(dest('build/img'))
}

function versionAvif() {
  const opts = {
    quality: 50
}
  // If we use return, there is no need to use the done callback
  return src('src/img/**/*.{png,jpg}')
    .pipe(avif(opts))
    .pipe(dest('build/img'))
}

// Watcher to compile from sass to css
function dev() {
  watch('src/scss/**/*.scss', css)
  // watch('src/img/**/*', imagenes)
  // watch(MAIN_SASS_ROUTE, css)
}

exports.css = css
exports.dev = dev
exports.imagenes = imagenes
exports.versionWebp = versionWebp
exports.versionAvif = versionAvif
// exports.default = series(imagenes, versionWebp, css, dev)
// Do not process images everytime it refreshes
exports.default = series(css, dev)
// Series: It will execute the tasks in series, first css and then dev
// exports.default = series(css, dev)
// Paralell: It will execute all tasks at the same time.
// exports.default = parallel(css,dev)