const { src, dest, watch } = require('gulp')
// Have gulp-sass and sass in the same constant
const sass = require('gulp-sass')(require('sass'))

const MAIN_SASS_ROUTE = 'src/scss/app.scss'

function css(done) {
  // Compile SASS
  // Step 1: Identify file
  src(MAIN_SASS_ROUTE)
    .pipe(sass()) // Step 2: Compile
    .pipe(dest('build/css')) // Step 3: Save the .css
  
    done()
}
// Watcher to compile from sass to css
function dev() {
  watch(MAIN_SASS_ROUTE, css)
}

exports.css = css
exports.dev = dev