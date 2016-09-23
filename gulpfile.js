var gulp = require('gulp');
var del = require('del');

var utilities = require('@renovolive/gulp-utilities');
utilities.gulp.clean.config();
utilities.gulp.version.config();

gulp.task('wipe-npm', () => {
	return del('node_modules');
});
