/// <vs BeforeBuild='build' Clean='clean' />
var gulp = require('gulp');
var gulpUtilities = require('gulp-utilities');

var packageName = 'utilities';

var locationConfig = require('./locations.json');

gulpUtilities.build.config({
	locations: locationConfig,
	includeLibraries: false,
}, gulp);

gulpUtilities.teamCity.config('tc', gulp);
gulpUtilities.test.config(__dirname + '/karma.conf.js', { locations: locationConfig }, gulp);

gulp.task('default', ['build']);
gulp.task('build', ['build.library']);
