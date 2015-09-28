// Karma debug configuration

var karmaSettings = require('./source/services/test/karma/karma');

module.exports = function (karma) {
	karmaSettings.debug.default(karma);
};
