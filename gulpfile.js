var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');

var utilities = require('@renovolive/gulp-utilities');
utilities.gulp.clean.config();
utilities.gulp.version.config();

gulp.task('wipe-npm', () => {
	return del('node_modules');
});

gulp.task('systemjs-for-tests', (done) => {
	var builder = new Builder();

	builder.loadConfig('./system.config.js')
		.then(() => {
			return builder.bundle('source/main.js + source/**/*.tests.js', 'tests/tests.bundle.js', {
				sourceMaps: true,
			});
		})
		.then(() => {
			console.log('Build complete');
			done();
		})
		.catch((err) => {
			console.log('Build error');
			console.error(err);
		});
});
