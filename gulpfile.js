
const gulp = require("gulp");

const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const watch = require("gulp-watch");

const sources = [
    "node_modules/angular/angular.js",
    "node_modules/angular-route/angular-route.js",
    "public/scripts/base.js"
];

const scripts = () => {
    gulp.src(sources)
        .pipe(concat("app.js"))
        // .pipe(uglify())
        .pipe(gulp.dest("public/scripts/"));
};

const watch = () => {
    gulp.watch(sources, ["scripts"]);
};

const default = gulp.series(scripts, watch);	

exports.scripts = scripts;
exports.watch = watch;
exports.default = default;
