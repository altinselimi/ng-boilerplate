/**
 * Created by visaruruqi on 4/28/16.
 */
var gulp = require('gulp'),
    mkdir = require('mkdirp');

gulp.task('make_dist_folder', ['clean'], function(cb) {
    mkdir('dist', cb);
});