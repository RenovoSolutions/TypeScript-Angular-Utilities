/// <vs BeforeBuild='build' Clean='clean' />
var gulp = require('gulp');
var gulpUtilities = require('gulp-utilities');

var packageName = 'utilities'; 

var locationConfig = {
	source: 'source',
	libraries: 'libraries',
	assets: 'assets',
	debug: 'debug',
	release: 'release',
	tests: 'tests',
};

gulpUtilities.build.config(gulp, packageName, locationConfig, false);
gulpUtilities.teamCity.config(gulp);
gulpUtilities.test.config(gulp, __dirname + '/karma.conf.js', locationConfig);

gulp.task('default', ['build']);