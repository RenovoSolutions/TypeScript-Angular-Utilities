
// Karma default configuration

var karmaSettings = require('gulp-utilities').karma.tc;

module.exports = function (karma) {
	karmaSettings(karma, ['test-bootstrapper.js']);
	karmaSettings.browsers = ['Chrome', 'Firefox'];

	karma.set(karmaSettings);
};
