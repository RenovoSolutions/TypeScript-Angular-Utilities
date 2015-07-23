/// <vs BeforeBuild='build' Clean='clean' />
var gulp = require('gulp');
var gulpUtilities = require('gulp-utilities');

var packageName = 'utilities'; 

var locationConfig = {
	source: 'source',
	libraries: 'libraries',
	assets: 'assets',
	debug: 'output',
	release: 'output',
	tests: 'tests',
};

gulpUtilities.build.config(gulp, packageName, locationConfig, true, false);
gulpUtilities.teamCity.config(gulp);
gulpUtilities.test.config(gulp, __dirname + '/karma.conf.js', locationConfig);

var runSequence = require('run-sequence');

gulp.task('default', ['build']);
gulp.task('build', ['build.library']);
