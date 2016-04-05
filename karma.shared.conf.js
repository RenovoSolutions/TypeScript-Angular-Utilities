// Karma default configuration

var webpackJsonLoader = require('./webpack.json-loader');

module.exports = function (karma, karmaSettings) {
	var karmaConfig = karmaSettings(karma, ['test-bootstrapper.js']);
	webpackJsonLoader(karmaConfig.webpack);

	karma.set(karmaConfig);
	return karmaConfig;
};
