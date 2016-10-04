/**
 * Created by visaruruqi on 4/28/16.
 */
var gulp = require('gulp');

gulp.task('views', ['clean', 'make_dist_folder'], function() {

    return gulp.src(['src/app/views/*.html', 'src/app/views/*.json',
            'src/app/views/*.html', 'src/app/views/*.json',
            'src/app/views/**/*.html', 'src/app/views/**/*.json',
            'src/app/common/**/*.html', 'src/app/common/**/*.json',
            'src/app/login/*.html', 'src/app/login/*.json'
        ], { 'base': 'src' })
        .pipe(gulp.dest('dist'));

});
