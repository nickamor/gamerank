
let gulp = require('gulp')

let concat = require('gulp-concat')
let uglify = require('gulp-uglify')
let watch = require('gulp-watch')

let sources = [
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'public/scripts/base.js'
]

gulp.task('scripts', () => {
    gulp.src(sources)
        .pipe(concat('app.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('public/scripts/'))
})

gulp.task('watch', () => {
    gulp.watch(sources, ['scripts'])
})

gulp.task('default', ['scripts', 'watch'])
