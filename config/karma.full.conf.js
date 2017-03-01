var baseConfig = require('./karma.shared.conf');

module.exports = function (karma) {
	var config = baseConfig(karma);
	config.browsers = ['ChromeNoSandbox', 'Firefox'];
	karma.set(config);
};
