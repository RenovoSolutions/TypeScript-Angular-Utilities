// Karma debug configuration

var karmaSettings = require('@renovolive/gulp-utilities').karma.debug;
var config = require('./karma.shared.conf');

module.exports = function (karma) {
	karmaSettings(karma, config.files, config.settings);
};
