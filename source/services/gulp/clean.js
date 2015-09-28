var _ = require('lodash');
var gulpImport = require('gulp');
var del = require('del');
var defaultOptions = {
    location: './source',
};
function config(options, gulp) {
    if (_.isUndefined(gulp)) {
        gulp = gulpImport;
    }
    if (!options) {
        options = {};
    }
    options = _.defaults(options, defaultOptions);
    gulp.task('clean', function (done) {
        return clean(options.location, done);
    });
}
exports.config = config;
function clean(target, done) {
    var dir = './source';
    var jsFiles = '/**/*.js';
    var mapFiles = '/**/*.js.map';
    var typingFiles = '/**/*.d.ts';
    return del([dir + jsFiles, dir + mapFiles, dir + typingFiles], done);
}
exports.clean = clean;
//# sourceMappingURL=clean.js.map