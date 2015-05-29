var del = require('del');

exports.config = function (gulp) {
	gulp.task('clean', ['clean.debug']);

	gulp.task('clean.debug', function (done) {
		return clean('debug', done);
	});

	gulp.task('clean.release', function (done) {
		return clean('release', done);
	});

	function clean(target, done) {
		var dir = '/' + target;
		return del([dir + '/*', '!' + dir + '/web.config'], done);
	}
}