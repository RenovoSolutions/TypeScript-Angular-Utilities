
// Karma default configuration

var karmaSettings = require('gulp-utilities').karma.standard;

module.exports = function (karma) {
	karmaSettings(karma, ['test-bootstrapper.js']);
};
