var baseConfig = require('./karma.shared.conf');

module.exports = function (karma) {
	var config = baseConfig(karma);
	config.browsers = ['ChromeNoSandbox', 'FireFox'];
	karma.set(config);
};
