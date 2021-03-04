const {src, dest, watch, parallel, series } = require('gulp');
const scss         = require('gulp-sass');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');
const fileinclude  = require('gulp-file-include');
const svgSprite    = require('gulp-svg-sprite');
const group_media  = require("gulp-group-css-media-queries");



function htmlInclude() {
  return src(['app/html/[^_]*.html'])
    .pipe(fileinclude())
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}



function styles() {
  return src (['node_modules/normalize.css/normalize.css',
              'node_modules/slick-carousel/slick/slick.css',
              'app/scss/style.scss'
              ])
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(group_media())
    .pipe(autoprefixer({
      overrideBrewserlist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}


function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'app/js/main.js'
  ])
    .pipe(fileinclude())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}


// Делаем SVG спрайт

function svgSprites() {
  return src('app/images/svg/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      },
    }))
    .pipe(dest('app/images'));
}


function images() {
  return src('app/images/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive:true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/images'))
}



function browsersync() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
}


function watching(){
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/*.html']).on('change', browserSync.reload);
  watch(['app/js/main.js'], scripts);
  // watch('app/images/**/*.{gif,png,jpg,svg,webp}', series(images)).on('change', server.reload);
  watch(['app/images/sprite/svg/*.svg'], svgSprites);
  watch('app/html/*.html', htmlInclude);
}


function cleanDist() {
  return del('dist')
}


function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
  .pipe(dest('dist'))
}


exports.svgSprites = svgSprites;
exports.fileinclude = htmlInclude;
exports.styles = styles;
exports.watching = watching;
exports.browserSync = browserSync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);
exports.default = parallel(svgSprites, htmlInclude, styles, scripts, browsersync, watching);
