/**
 * Created by visaruruqi on 4/28/16.
 */
var gulp = require('gulp');

gulp.task('favicon', ['clean', 'make_dist_folder'], function() {
    return gulp.src(['src/app/favicon.ico'])
        .pipe(gulp.dest('dist'));
});