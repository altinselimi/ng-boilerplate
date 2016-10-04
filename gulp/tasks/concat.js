/**
 * Created by visaruruqi on 4/28/16.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rev = require('gulp-rev'),
    header = require('gulp-header'),
    moment = require('moment');
var exec = require('child_process').exec;
var log;

exec('git log -1 --format="Commit: %H %nDate and Time:  %aD %nMessage: %s"').stdout.on('data', function(data) {
    log = data;
    //console.log("Finnished execution of git log");
});

exec('git rev-parse --abbrev-ref HEAD').stdout.on('data', function(data) {
    log += "Branch: " + data;
    //console.log("Finnished execution of get branch");
});

exec('git name-rev --tags --name-only $(git rev-parse HEAD)').stdout.on('data', function(data) {
    log += "Tag: " + data;
});


gulp.task('concat', ['clean', 'make_dist_folder'], function() {

    return gulp.src([
            'src/app/app.js',

            'src/app/common/**/*.config.js',
            'src/app/common/**/*.controller.js',
            'src/app/common/**/*.service.js',
            'src/app/common/**/*.directive.js',
            'src/app/common/**/*.filter.js',

            'src/app/login/*.config.js',
            'src/app/login/*.controller.js',
            'src/app/login/*.service.js',
            'src/app/login/*.directive.js',
            'src/app/login/*.filter.js',
            
            'src/app/views/*.config.js',
            'src/app/views/*.controller.js',
            'src/app/views/*.service.js',
            'src/app/views/*.directive.js',
            'src/app/views/*.filter.js',

            'src/app/views/**/*.config.js',
            'src/app/views/**/*.controller.js',
            'src/app/views/**/*.service.js',
            'src/app/views/**/*.directive.js',
            'src/app/views/**/*.filter.js',
        ])
        .pipe(concat('all.js'))
        .pipe(rev())
        .pipe(gulp.dest('dist/app'));
});
