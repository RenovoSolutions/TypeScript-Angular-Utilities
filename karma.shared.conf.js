// Karma default configuration

var webpackJsonLoader = require('./webpack.json-loader');

module.exports = function (karma, karmaSettings) {
    var karmaConfig = karmaSettings(karma, './test-bootstrapper.js', [
		'./node_modules/moment/moment.js',
		'./node_modules/moment-timezone/builds/moment-timezone-with-data.js',
	], {
		"moment": "moment",
		"moment-timezone": "moment",
	});

	webpackJsonLoader(karmaConfig.webpack);

	karma.set(karmaConfig);
	return karmaConfig;
};
