const gulp = require('gulp');
const {src,dest,series,parallel,watch} = gulp;

const concat = require('gulp-concat');//合并js文件
const ugilfy = require('gulp-uglify');//压缩js文件
const rename = require('gulp-rename');//文件重命名
const concatCSS = require('gulp-concat-css');//合并css文件
const cleanCSS = require('gulp-clean-css');//压缩css文件
const liveReload = require("gulp-livereload");//监视文件
let JSpath = `./src/js/**/*.js`;
let CSSpath = `./src/css/**/*.css`;
let concatName = `build`;
let reNameOptions = {suffix:'.min'};
let watchOptions = {events:'all'}; 
// let destBase = `./dist/`;
// let JSdestPath = `js/`;
// let CSSdestPath = `css/`

function buildJS() {
    return src(JSpath)
    .pipe(concat(`${concatName}.js`))
    .pipe(ugilfy())
    .pipe(rename(reNameOptions))
    .pipe(dest('./dist/js/'))
    .pipe(liveReload())
};
function buildCSS() {
    return src(CSSpath)
    .pipe(concatCSS(`${concatName}.css`))
    .pipe(cleanCSS())
    .pipe(rename(reNameOptions))
    .pipe(dest('./dist/css/'))
    .pipe(liveReload())
};
function Watch() {
    liveReload.listen();
    watch(JSpath,watchOptions,buildJS);
    watch(CSSpath,watchOptions,buildCSS);
};
exports.buildJS = buildJS;
exports.buildCSS = buildCSS;
exports.Watch = Watch;
exports.default = series(parallel(buildJS,buildCSS),Watch);