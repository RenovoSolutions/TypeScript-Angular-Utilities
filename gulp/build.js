var runSequence = require('run-sequence');

var lint = require('./lint');
var clean = require('./clean');
var compile = require('./compile');
var copy = require('./copy');
var resolve = require('./resolve');

exports.config = function (gulp) {
	lint.config(gulp);
	clean.config(gulp);
	compile.config(gulp);
	copy.config(gulp);
	resolve.config(gulp);
	
	gulp.task('build', ['build.debug']);

	gulp.task('build.debug', function(done) {
		runSequence('lint',
					'clean.debug',
					'compile.debug',
					'copy.debug',
					'resolve.debug',
					done);
	});

	gulp.task('build.release', function(done) {
		runSequence('lint',
					'clean.release',
					'compile.release',
					'copy.release',
					'resolve.release',
					done);
	});
};