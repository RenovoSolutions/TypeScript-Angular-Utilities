// Karma configuration

module.exports = function (karma) {
	var options = require('./default.config')(karma);
	options.singleRun = false;

	karma.set(options);
	return options;
};
