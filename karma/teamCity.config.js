// Karma configuration

module.exports = function (karma) {
	var options = require('./full.config')(karma);
	options.reporters = ['teamcity'];

	karma.set(options);
	return options;
};
