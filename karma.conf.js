
// Karma default configuration

var karmaSettings = require('@renovolive/gulp-utilities').karma.standard;
var config = require('./karma.shared.conf');

module.exports = function (karma) {
	karmaSettings(karma, config.files, config.settings);
};
