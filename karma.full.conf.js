// Karma full browser configuration

var karmaSettings = require('gulp-utilities').karma.full;
var config = require('./karma.shared.conf');

module.exports = function (karma) {
	karmaSettings = config(karma, karmaSettings);
};
