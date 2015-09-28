// Karma full browser configuration

var karmaSettings = require('./source/services/test/karma/karma');

module.exports = function (karma) {
	karmaSettings.full.default(karma);
};
