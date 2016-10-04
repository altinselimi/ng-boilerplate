/**
 * Created by visaruruqi on 4/28/16.
 */
var gulp = require('gulp');

var browserSync = require('browser-sync').create();


// Static server browser-sync, ['default']
gulp.task('serve', ['default'], function() {
    browserSync.init({

        port: 8080,
        server: {
            baseDir: "./dist/"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    /*gulp.watch(['./src/app/resources/!*.json', './src/app/index.html',
     './src/app/enterprise/!**!/!*.html',
     './src/app/enterprise/!**!/!**!/!*.html',
     './src/app/enterprise/!*.js',
     './src/app/enterprise/!**!/!*.js',
     './src/app/enterprise/!**!/!**!/!*.js',
     './src/app/login/!*.html',
     './src/app/login/!*.js',
     './src/app/common/!*.js',
     './src/app/login/login.css',
     './src/app/app.css'], ['html-watch']);*/

    gulp.watch([
        'src/app/app.js',
        'src/app/css/app.css',
        'src/app/common/**/*.config.js',
        'src/app/common/**/*.controller.js',
        'src/app/common/**/*.service.js',
        'src/app/common/**/*.directive.js',
        'src/app/common/**/*.filter.js',
        'src/app/common/**/*.css',
        'src/app/common/**/*.html',

        'src/app/login/*.config.js',
        'src/app/login/*.controller.js',
        'src/app/login/*.service.js',
        'src/app/login/*.directive.js',
        'src/app/login/*.filter.js',
        'src/app/login/*.css',
        'src/app/login/*.html',

        'src/app/views/*.config.js',
        'src/app/views/*.controller.js',
        'src/app/views/*.service.js',
        'src/app/views/*.directive.js',
        'src/app/views/*.filter.js',
        'src/app/views/*.html',

        'src/app/views/**/*.config.js',
        'src/app/views/**/*.controller.js',
        'src/app/views/**/*.service.js',
        'src/app/views/**/*.directive.js',
        'src/app/views/**/*.filter.js',
        'src/app/views/**/*.html',

        'src/app/*.html'
    ], ['html-watch']);

    //gulp.watch("app/*.html").on('change', browserSync.reload);

});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('html-watch', ['default'], function() {
    browserSync.reload();
});
