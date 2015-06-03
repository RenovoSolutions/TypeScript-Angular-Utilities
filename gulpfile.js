/// <vs BeforeBuild='build' Clean='clean' />
var gulp = require('gulp');
var gulpUtilities = require('gulp-utilities');

var browserify = gulpUtilities.browserify;
var main = 'utilities'; 

var merge = require('merge2');
var typescript = gulpUtilities.typescript;

gulp.task('compile.debug', function(done) {
	return merge([
		browserify.compileDebug(main),
		typescript.compileTypeDefinitions('**/*.ts', 'source', 'debug/typings'),
	]);
});

gulp.task('compile.release', function(done) {
	return merge([
		browserify.compileRelease(main),
		typescript.compileTypeDefinitions('**/*.ts', 'source', 'release/typings'),
	]);
});

gulp.task('compile', ['compile.debug']);

gulpUtilities.build.config(gulp, 'compile.debug', 'compile.release');
gulpUtilities.teamCity.config(gulp);
gulpUtilities.test.config(gulp, __dirname + '/karma.conf.js');

gulp.task('default', ['build']);
