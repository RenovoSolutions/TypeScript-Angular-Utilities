/* global require */

var karma = require('karma').server;

exports.config = function(gulp) {
    
    var karmaConfig = __dirname + '/../karma.conf.js';
    
    gulp.task('test', function (done) {
    	karma.start({
	    	configFile: karmaConfig,
	    }, done);
    });

    gulp.task('test.debug', function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		singleRun: false,
    		autoWatch: true,
    		reporters: [],
    	}, done);
    });

    gulp.task('test.tc', function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		browsers: ['Chrome', 'Firefox', 'IE'],
    		reporters: ['teamcity'],
    	}, done);
    });

    gulp.task('test.all', function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		browsers: ['Chrome', 'Firefox', 'IE'],
    	}, done);
    });
};