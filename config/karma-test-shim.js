/*global mocha, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () { };
window.expect = chai.expect;

var basePath = '/base/';

function isJsFile(path) {
	return endsWith(path, '.js');
}

function isSpecFile(path) {
	return endsWith(path, '.tests.js');
}

function endsWith(path, ending) {
	return path.slice(-ending.length) == ending;
}

var allSpecFiles = Object.keys(window.__karma__.files)
	.filter(isSpecFile);

// Load our SystemJS configuration.
System.config({
	baseURL: basePath
});

System.import('system.config.js').then(function () {
	// Load and configure the TestComponentBuilder.
	return Promise.all([
		System.import('@angular/core/testing'),
		System.import('@angular/platform-browser-dynamic/testing')
	]).then(function (providers) {
		var testing = providers[0];
		var testingBrowser = providers[1];

		testing.TestBed.initTestEnvironment(testingBrowser.BrowserDynamicTestingModule
										, testingBrowser.platformBrowserDynamicTesting());
	});
}).then(function () {
	// Finally, load all spec files.
	// This will run the tests directly.
	return Promise.all(
		allSpecFiles.map(function (moduleName) {
			return System.import(moduleName);
		}));
}).then(__karma__.start, __karma__.error);
