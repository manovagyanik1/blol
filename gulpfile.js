var gulp = require("gulp"),
    del = require("del"),
    ts = require('gulp-typescript'),
    merge = require('merge2'),
    runSequence = require("run-sequence");

var shell = require('gulp-shell');

var files = require('./gulp.config');
var tsProject = ts.createProject('./tsconfig.json');

gulp.task('default', function(callback) {
    runSequence('build', callback);
});

gulp.task('build', function(callback){
    runSequence('clean', 'copy-build', callback);
});

gulp.task('copy-build', ['copy-configs', 'typescript']);

gulp.task('copy-configs', function(){
    return gulp.src('./configurations/*.json')
    .pipe(gulp.dest('./build/configurations/'));
});

gulp.task('clean', function(callback){
    return del(['./build/**/*'], {force: true}, callback);
});

gulp.task('scripts', function() {
    // return gulp.src(files.app_files.ts)
    // .pipe(sourcemaps.init())
    // .pipe(tsProject())
    // .pipe(sourcemaps.write())
    // .pipe(gulp.dest('build/'));
});

gulp.task('typescript', shell.task('npm run compile'));

// gulp.task('watch', function(){
//     gulp.watch(files.app_files.ts, ['build', 'scripts']);
// });