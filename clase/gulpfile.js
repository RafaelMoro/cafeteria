const { src, dest } = require('gulp')
// Have gulp-sass and sass in the same constant
const sass = require('gulp-sass')(require('sass'))

function css(done) {
  // Compile SASS
  // Step 1: Identify file
  src('src/scss/app.scss')
    .pipe(sass()) // Step 2: Compile
    .pipe(dest('build/css')) // Step 3: Save the .css
  
    done()

}

exports.css = css