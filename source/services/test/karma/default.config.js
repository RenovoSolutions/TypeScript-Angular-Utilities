// Default karma configuration
function default_1(karma) {
    var options = {
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon'],
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
        // level of logging
        // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
        logLevel: karma.LOG_INFO,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        files: [
            'test-bootstrapper.js',
        ],
        preprocessors: {
            // add webpack as preprocessor
            'test-bootstrapper.js': ['webpack'],
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        exclude: /node_modules/,
                        loader: 'ts-loader',
                    },
                ],
            },
            resolve: {
                extensions: ['', '.webpack.js', '.web.js', '.js', '.ts'],
            },
        },
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
        ]
    };
    karma.set(options);
    return options;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=default.config.js.map