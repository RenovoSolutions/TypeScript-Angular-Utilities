var webserver = require('gulp-webserver');

var port = 8008;

exports.config = function(gulp) {
	gulp.task('serve', ['serve.debug']);
	
	gulp.task('serve.debug', function() {
		gulp.src('debug')
			.pipe(webserver({
				port: port,
				path: '/rl21',
				livereload: true,
				directoryListing: false,
				open: '/rl21',
			}));
	});

	gulp.task('serve.release', function () {
		gulp.src('release')
			.pipe(webserver({
				port: port,
				path: '/rl21',
				livereload: false,
				directoryListing: false,
				open: '/rl21',
			}));
	});
};