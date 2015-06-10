var libraries = require('./libReferences.json');
var defaultKarma = require('gulp-utilities').karma;

module.exports = function(karma) {
	config = defaultKarma(karma, libraries);
	karma.set(config)
};
