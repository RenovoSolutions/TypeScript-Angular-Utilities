'use strict';

const gulp = require('gulp');
const Builder = require('systemjs-builder');
const runSequence = require('run-sequence');
const del = require('del');

const utilities = require('gulp-utilities');
utilities.gulp.clean.config();

const scriptFiles = ['./source/**/*.js', '!./source/**/*.tests.js'];

gulp.task('bundle.watch', (done) => {
	gulp.watch(scriptFiles, ['bundle']);
});

gulp.task('bundle', (done) => {
	runSequence('copy',
				'systemjs',
				'clean-up',
				done);
});

gulp.task('copy', () => {
	return gulp.src(scriptFiles)
		.pipe(gulp.dest('./utilities'))
});

gulp.task('systemjs', (done) => {
	var builder = new Builder();

	builder.loadConfig('./system.config.js')
		.then(() => {
			return builder.bundle('utilities/main', 'output/utilities.js', {
				sourceMaps: true,
			});
		})
		.then(() => {
			return builder.bundle('utilities/main', 'output/utilities.min.js', {
				minify: true,
				mangle: true,
				sourceMaps: false,
				globalDefs: { DEBUG: false },
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

gulp.task('clean-up', () => {
	return del('./utilities');
});
