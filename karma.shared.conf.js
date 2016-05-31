// Karma default configuration

module.exports = function (karma, karmaSettings) {
    var karmaConfig = karmaSettings(karma, './test-bootstrapper.js', [
		'./node_modules/zone.js/dist/zone.js',
		'./node_modules/zone.js/dist/sync-test.js',
		'./node_modules/zone.js/dist/async-test.js',
		'./node_modules/zone.js/dist/fake-async-test.js',
		'./node_modules/moment/moment.js',
		'./node_modules/moment-timezone/builds/moment-timezone-with-data.js',
	], {
		'Zone': 'Zone',
		"moment": "moment",
		"moment-timezone": "moment",
	});

	karma.set(karmaConfig);
	return karmaConfig;
};
