var gulp = require('gulp');

gulp.task('scripts', ['clean', 'make_dist_folder'], function() {

    return gulp.src([
            'src/app/bower_components/jquery/dist/jquery.js',
            'src/app/bower_components/moment/src/moment.js',
            'src/app/bower_components/angular/angular.min.js',
            'src/app/bower_components/angular/angular.js',
            'src/app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'src/app/bower_components/angular-sanitize/angular-sanitize.js',
            'src/app/bower_components/angular-messages/angular-messages.min.js',
            'src/app/bower_components/angular-ui-utils/ui-utils.js',
            'src/app/bower_components/angular-ui-validate/dist/validate.min.js',
            'src/app/bower_components/angular-keepr/dist/keepr.js',
            'src/app/bower_components/angular-keepr/dist/keepr.min.js',
            'src/app/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
            'src/app/bower_components/angular-local-storage/dist/angular-local-storage.js',
            'src/app/bower_components/angular-local-storage/dist/angular-local-storage.min.js',
            'src/app/bower_components/bootstrap/dist/js/bootstrap.min.js',
            'src/app/bower_components/angular-translate/angular-translate.js',
            'src/app/bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
            'src/app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'src/app/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
            'src/app/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
            'src/app/bower_components/angular-dynamic-locale/dist/tmhDynamicLocale.js',
            'src/app/bower_components/moment/moment.js',
            'src/app/bower_components/lodash/lodash.js',
            'src/assets/timezones.json/timezones.json',
            'src/assets/countries/countries.min.json',
            'src/assets/countries/languages.json',
            'src/assets/countries/languageCodes.json',
            'src/assets/currencies/currencies.json',
            'src/app/bower_components/angular/*.map',
            'src/app/bower_components/angular-animate/*.map',
            'src/app/bower_components/angular-sanitize/*.map',
            'src/app/bower_components/bootstrap/dist/js/bootstrap.min.js',
            'src/app/bower_components/tether/dist/js/tether.min.js',
            'src/app/bower_components/jquery/dist/*.map'
        ])
        .pipe(gulp.dest('dist/scripts'));

});
