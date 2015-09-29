// Karma full browser configuration

var karmaSettings = require('gulp-utilities').karma.full;

module.exports = function (karma) {
	karmaSettings(karma, ['test-bootstrapper.js']);
};
