"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************

var gulp        = require("gulp"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    concat      = require("gulp-concat"),
    rename      = require("gulp-rename"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    sourcemaps  = require("gulp-sourcemaps"),
    buffer      = require('vinyl-buffer'),
    uglify      = require("gulp-uglify"),
    replace     = require('gulp-replace'),
    clean       = require("gulp-clean"),
    tsify       = require("tsify");

//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function() {
    var config =  { formatter: "verbose", fix: true };
    return gulp.src([
        "src/**/**.ts"
    ])
    .pipe(tslint(config))
    .pipe(tslint.report());
});

/**
 * Builds the app - does not uglify.
 */
gulp.task('build:app', () => {
    return browserify({
        basedir: '.',
        entries: ['src/fancychessboard.ts'],
        cache: {},
        packageCache: {},
        extensions: ['.js', '.ts']
    })
    .plugin(tsify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))  
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist"));
});

/**
 * Builds the app - and uglifies.
 */
gulp.task('build:app_and_uglify', () => {
    return browserify({
        basedir: '.',
        entries: ['src/fancychessboard.ts'],
        cache: {},
        packageCache: {},
        extensions: ['.js', '.ts']
    })
    .external(vendors)
    .plugin(tsify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))    
    .pipe(uglify())   
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("out"));
});

//******************************************************************************
//* DEFAULT
//******************************************************************************

gulp.task('clean', 
    function (done) {
        gulp.src('dist', {
            read: false,
            allowEmpty: true
        })
        .pipe(clean());        
        done();
    }
);

/**
 * Build  
 */
gulp.task("build", function (cb) {
    runSequence("build:app", cb);
});

/**
 * Default for development.
 */
gulp.task('default', 
    gulp.series('clean', 'lint', 'build:app', function (done) {
        done();
    }
));


//******************************************************************************
//* WATCH
//******************************************************************************
gulp.task("watch", function() {
    gulp.watch(["src/**/*.ts"], ["default"]);
});