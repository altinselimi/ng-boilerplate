/**
 * Created by visaruruqi on 4/28/16.
 */
var gulp = require('gulp');

gulp.task('fonts', ['clean', 'make_dist_folder'], function() {

    return gulp.src(['src/app/bower_components/bootstrap/dist/fonts/*',
        'src/app/fonts/FontAwesome/fonts/*',
        'src/app/fonts/open-sans/fonts/*',
        'src/app/fonts/roboto/fonts/*',
        'src/app/bower_components/entypo/fonts/*',
        'src/app/fonts/icomoon-bower/fonts/*'
    ]).pipe(gulp.dest('dist/fonts'));

});