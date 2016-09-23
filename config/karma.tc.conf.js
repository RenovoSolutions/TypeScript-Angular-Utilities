var teamCityReporter = require('karma-teamcity-reporter');
var baseConfig = require('./karma.shared.conf');

module.exports = function (karma) {
	var config = baseConfig(karma);
	config.browsers = ['ChromeNoSandbox', 'Firefox'];
	config.reporters = ['teamcity'];

	config.plugins = config.plugins || [];
	config.plugins.push(teamCityReporter);
	karma.set(config);
};
