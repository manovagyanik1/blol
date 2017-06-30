var gulp = require("gulp");

var program = "MyApp";
var port = 55555;

gulp.task('buildCopy', 
function() 
{
    return gulp.src(['./src/**/*', '!./**/*.ts'])
            .pipe(gulp.dest('build'));
});