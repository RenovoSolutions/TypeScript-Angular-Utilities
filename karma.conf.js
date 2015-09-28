
// Karma default configuration

var karmaSettings = require('./source/services/test/karma/karma');

module.exports = function (karma) {
	karmaSettings.standard.default(karma);
};
