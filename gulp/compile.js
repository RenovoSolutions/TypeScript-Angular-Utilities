var runSequence = require('run-sequence');

var browserify = require('browserify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var typescript = require('./typescript');
var merge = require('merge2');

exports.config = function (gulp) {
	gulp.task('compile', ['compile.debug']);

	gulp.task('compile.debug', function (done) {
		runSequence('compile.core.debug',
					'compile.app.debug',
					done);
	});

	gulp.task('compile.core.debug', function() {
		var bundler = browserify({ debug: true })
			.add('./source/core.ts')
			.plugin(tsify, {
				target: 'ES5',
				removeComments: false,
			});

		return bundler.bundle()
			.pipe(source('core.js'))
			.pipe(gulp.dest('./debug'));
	});

	gulp.task('compile.app.debug', function () {
		var ts = typescript(gulp.src(['./source/app.ts', './typings/**/*.d.ts']));

		return merge([
            ts.js.pipe(gulp.dest('./debug')),
            ts.dts.pipe(gulp.dest('./debug/typings')),
		]);
	});

	gulp.task('compile.release', function (done) {
		runSequence('compile.core.release',
					'compile.app.release',
					done);
	});

	gulp.task('compile.core.release', function() {
		var bundler = browserify()
			.add('./source/core.ts')
			.plugin(tsify, {
				target: 'ES5',
				removeComments: true,
			});

		return bundler.bundle()
			.pipe(source('core.js'))
			.pipe(streamify(uglify()))
			.pipe(gulp.dest('./release'));
	});

	gulp.task('compile.app.release', function() {
		var ts = typescript(gulp.src(['./source/app.ts', './typings/**/*.d.ts']));

		return ts.js.pipe(streamify(uglify()))
			.pipe(gulp.dest('./release'));
	});
};