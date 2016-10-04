var gulp = require('gulp');

gulp.task('styles', ['fonts', 'clean', 'make_dist_folder'], function() {

    return gulp.src([
            'src/app/fonts/FontAwesome/css/font-awesome.min.css',
            'src/app/bower_components/angular-toastr/dist/angular-toastr.min.css',
            'src/app/assets/custom_fonts/*',
            'src/app/bower_components/bootstrap/dist/css/bootstrap.min.css',
            'src/bower_components/angular-toastr/dist/angular-toastr.css',
            'src/app/fonts/open-sans/css/open-sans.css',
            'src/app/fonts/roboto/css/roboto.css',
            'src/app/bower_components/angular-material/angular-material.min.css',
            'src/app/bower_components/bootstrap/dist/bootstrap.min.css',
            'src/app/bower_components/tether/dist/css/tether.min.css',
            'src/app/bower_components/entypo/css/entypo.css',
            'src/app/fonts/icomoon-bower/css/icomoon.css',
            'src/app/css/app.css'

        ])
        //.pipe(minifyCss())
        //.pipe(rev())
        .pipe(gulp.dest('dist/styles'));

});
