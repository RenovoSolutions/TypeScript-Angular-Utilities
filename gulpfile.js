var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function (done) {
	var dir = './source';
	var jsFiles = '/**/*.js';
	var mapFiles = '/**/*.js.map';
	var typingFiles = '/**/*.d.ts';
	return del([dir + jsFiles, dir + mapFiles, dir + typingFiles], done);
});
