/**
 * Created by visaruruqi on 4/28/16.
 */
var gulp = require('gulp');

gulp.task('resources', ['clean', 'make_dist_folder'], function() {

    return gulp.src('src/app/resources/*.json')
        .pipe(gulp.dest('dist/resources'));

});