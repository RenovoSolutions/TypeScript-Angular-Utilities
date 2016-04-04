
// Karma default configuration

var karmaSettings = require('gulp-utilities').karma.tc;
var config = require('./karma.shared.conf');

module.exports = function (karma) {
	karmaSettings = config(karma, karmaSettings);
	karmaSettings.browsers = ['Chrome', 'Firefox'];

	karma.set(karmaSettings);
};
