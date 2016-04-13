// Karma default configuration

module.exports = function (karma, karmaSettings) {
    var karmaConfig = karmaSettings(karma, './test-bootstrapper.js', [
		'./node_modules/moment/moment.js',
		'./node_modules/moment-timezone/builds/moment-timezone-with-data.js',
	], {
		"moment": "moment",
		"moment-timezone": "moment",
	});

	karma.set(karmaConfig);
	return karmaConfig;
};
