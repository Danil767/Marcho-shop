const {src, dest, watch, parallel, series} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const nunjucksRender = require('gulp-nunjucks-render');
const rename = require('gulp-rename')

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        },
    });
}

function nunjucks() {
    return src('app/*.njk')
        .pipe(nunjucksRender())
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

function cleanDist() {
    return del('dist')
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'node_modules/rateyo/src/jquery.rateyo.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        'app/js/main.js'
    ])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('app/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // .pipe(concat())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

function watching() {
    watch(['app/**/*.scss'], styles);
    watch(['app/*.njk'], nunjucks);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.images = images;
exports.styles = styles;
exports.nunjucks = nunjucks;
exports.scripts = scripts;
exports.watching = watching;


exports.build = series(cleanDist, images, build);
exports.default = parallel(nunjucks, styles, scripts, browsersync, watching);