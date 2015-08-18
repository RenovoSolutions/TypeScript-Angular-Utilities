var libraries = require('./libReferences.json');
var defaultKarma = require('gulp-utilities').karma;

var locations = require('./locations.json');

module.exports = function(karma) {
	config = defaultKarma(karma, libraries, locations);
	karma.set(config);
};
