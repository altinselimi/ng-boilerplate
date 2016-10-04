/**
 * Created by visaruruqi on 4/28/16.
 */
var gulp = require('gulp'),
    inject = require('gulp-inject');

gulp.task('inject', ['clean', 'make_dist_folder', 'styles', 'concat', 'scripts'], function() {

    var target = gulp.src('src/app/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(
        ['dist/scripts/jquery.js',
            'dist/scripts/tether.min.js',
            'dist/scripts/bootstrap.min.js',
            'dist/scripts/moment.js',
            'dist/scripts/toolkit.js',
            'dist/scripts/angular.js',
            'dist/scripts/angular-ui-router.js',
            'dist/scripts/angular-animate.js',
            'dist/scripts/angular-local-storage.js',
            'dist/scripts/angular-toastr.tpls.min.js',
            'dist/scripts/ui-utils.min.js',
            'dist/scripts/angular-sanitize.js',
            'dist/scripts/angular-messages.min.js',
            'dist/scripts/validate.min.js',
            'dist/scripts/keepr.min.js',
            'dist/scripts/ui-bootstrap-tpls.min.js',
            'dist/scripts/tmhDynamicLocale.js',
            'dist/scripts/angular-translate.js',
            'dist/scripts/angular-translate-handler-log.js',
            'dist/scripts/angular-translate-loader-static-files.js',
            'dist/scripts/angular-translate-storage-local.js',
            'dist/scripts/moment.js',
            'dist/scripts/lodash.js',
            'dist/scripts/bootstrap-datepicker.min.js',
            'dist/app/all*.js',
            'dist/styles/tether.min.css',
            'dist/styles/bootstrap.min.css',
            'dist/styles/font-awesome.min.css',
            'dist/styles/roboto.css',
            'dist/styles/icomoon.css',
            'dist/styles/open-sans.css',
            'dist/styles/angular-toastr.min.css',
            'dist/styles/entypo.css',
            'dist/styles/icomoon.css',
            'dist/styles/bootstrap-datepicker.standalone.min.css',
            'dist/styles/app.css'
            // 'dist/styles/select2.min.css',
        ], { read: false });

    return target.pipe(inject(sources, {

            // Do not add a root slash to the beginning of the path
            addRootSlash: false,

            // Remove the `public` from the path when doing the injection
            ignorePath: 'dist'
        }))
        .pipe(gulp.dest('dist'));
});
