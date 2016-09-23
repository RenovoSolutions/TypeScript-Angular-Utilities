var baseConfig = require('./karma.shared.conf');

module.exports = function (karma) {
	karma.set(baseConfig(karma));
};
