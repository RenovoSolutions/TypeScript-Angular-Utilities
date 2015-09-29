// Karma debug configuration

var karmaSettings = require('gulp-utilities').karma.debug;

module.exports = function (karma) {
	karmaSettings(karma, ['test-bootstrapper.js']);
};
