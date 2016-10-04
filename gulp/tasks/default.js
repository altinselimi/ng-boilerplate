var gulp = require('gulp');

gulp.task('default', ['make_dist_folder','favicon', 'views', 'inject','build_localization_file', 'images']);
