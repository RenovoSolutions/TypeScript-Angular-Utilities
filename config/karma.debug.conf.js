var baseConfig = require('./karma.shared.conf');

module.exports = function (karma) {
	var config = baseConfig(karma);
	config.autoWatch = true;
	config.singleRun = false;
	karma.set(config);
};
