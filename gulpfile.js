var utilities = require('gulp-utilities');
var gulp = require('gulp');
var del = require('del');

var utilities = require('@renovolive/gulp-utilities');
utilities.gulp.clean.config();

gulp.task('wipe-npm', () => {
	return del('node_modules');
});
