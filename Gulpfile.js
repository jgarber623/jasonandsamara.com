const { dest, parallel, src, watch } = require('gulp');

const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sassGlobbing = require('node-sass-globbing');
const uglify = require('gulp-uglify');

const inputDir = './src/_assets';
const outputDir = './public/assets';

const imagesFilePaths = `${inputDir}/images/**/*`;
const javascriptsFilePaths = `${inputDir}/javascripts/**/*`;
const stylesheetsFilePaths = `${inputDir}/stylesheets/**/*.scss`;

const vendorJavascriptsPaths = [
  './node_modules/html5shiv/dist/html5shiv.min.js',
  './node_modules/picturefill/dist/picturefill.min.js'
];

function images() {
  return src(imagesFilePaths)
    .pipe(dest(`${outputDir}/images`));
}

function javascripts() {
  return src(javascriptsFilePaths)
    .pipe(concat('application.js'))
    .pipe(uglify())
    .pipe(dest(`${outputDir}/javascripts`));
}

function stylesheets() {
  return src(stylesheetsFilePaths)
    .pipe(sass({
      importer: sassGlobbing,
      outputStyle: 'compressed'
    }))
    .pipe(dest(`${outputDir}/stylesheets`));
}

function vendorJavascripts() {
  return src(vendorJavascriptsPaths)
    .pipe(dest(`${outputDir}/javascripts/vendor`));
}

exports.build = parallel(images, javascripts, stylesheets, vendorJavascripts);

exports.watch = () => {
  watch(imagesFilePaths, images);
  watch(javascriptsFilePaths, javascripts);
  watch(stylesheetsFilePaths, stylesheets);
  watch(vendorJavascriptsPaths, vendorJavascripts);
};
