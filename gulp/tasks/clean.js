/**
 * Created by visaruruqi on 4/28/16.
 */
var gulp = require('gulp'),
    del = require('del'),
    util = require('gulp-util');


gulp.task('clean', function(cb) {
    log('Deleting dist folder...');
    return del('./dist', cb);
});

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}