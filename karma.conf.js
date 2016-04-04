
// Karma default configuration

var karmaSettings = require('gulp-utilities').karma.standard;
var config = require('./karma.shared.conf');

module.exports = function (karma) {
	karmaSettings = config(karma, karmaSettings);
};
