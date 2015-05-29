var references = require('./gulp/resolve');

// Karma configuration
module.exports = function (config) {
	var files = references.getBowerReferences();
	files = files.concat([
		'libraries/bower/angular-mocks/angular-mocks.js',
		'source/**/*.tests.ts',
	]);

	config.set({
		// list of files / patterns to load in the browser
		// Files are loaded in order, so items listed first are sometimes required by items below
		files: files,

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['browserify', 'mocha', 'chai', 'sinon'],

		preprocessors: {
			'source/**/*.tests.ts': ['browserify']
		},

		browserify: {
			debug: true,
			plugin: [
				['tsify', {
					target: 'ES5',
					removeComments: false,
				}],
			],
		},

        // enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

        // Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
        
		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],
        
		// enable / disable colors in the output (reporters and logs)
		colors: true,
	});
};

//		htmlReporter: {
//			'outputFile': 'testResults.html',
//		},
