var gulp = require('gulp');

gulp.task('images', ['clean', 'make_dist_folder'], function () {

    return gulp.src(['src/assets/images/*'])
        .pipe(gulp.dest('dist/images'));
});
