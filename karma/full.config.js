// Karma configuration

module.exports = function (karma) {
	var options = require('./default.config')(karma);
	options.browsers = ['Chrome', 'Firefox', 'IE'];

	karma.set(options);
	return options;
};
