/**
 * Created by temporary on 5/16/16.
 */
var gulp = require('gulp'),
    merge = require('gulp-merge-json'),
    rename = require('gulp-rename');

gulp.task('build_localization_file',['clean', 'make_dist_folder','concat'],function(){

    return gulp.src(['src/app/**/hk_localization.json'])
        .pipe(merge('combined.json'))
        .pipe(rename('locale-en_US.json'))
        .pipe(gulp.dest('dist/resources'));
});