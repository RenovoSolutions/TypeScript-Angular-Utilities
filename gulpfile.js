/// <vs BeforeBuild='build' Clean='clean' />
var gulp = require('gulp');
var gulpUtilities = require('gulp-utilities');

var browserify = gulpUtilities.browserify;
var main = 'utilities'; 

gulp.task('compile.debug', function(done) {
	return browserify.compileDebug(main);
});

gulp.task('compile.release', function(done) {
	return browserify.compileRelease(main);
});

gulp.task('compile', ['compile.debug']);

gulpUtilities.build.config(gulp, 'compile.debug', 'compile.release');
gulpUtilities.teamCity.config(gulp);
gulpUtilities.test.config(gulp, __dirname + '/karma.conf.js');

gulp.task('default', ['build']);
