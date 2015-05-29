var merge = require('merge2');

exports.config = function (gulp) {
	gulp.task('copy', ['copy.debug']);

	gulp.task('copy.debug', function () {
		return merge([
			gulp.src([
				'./source/**/*.json',
				'./source/**/*.ts',
				'./source/**/*.html',
				'./source/**/*.css',
			]).pipe(gulp.dest('./debug')),
			gulp.src([
				'./libraries/**',
			]).pipe(gulp.dest('./debug/libraries')),
			gulp.src([
				'./assets/**',
			]).pipe(gulp.dest('./debug/assets')),
		]);
	});

	gulp.task('copy.release', function () {
		return merge([
			gulp.src([
				'./source/**/*.js',
				'./source/**/*.json',
				'./source/**/*.html',
				'./source/**/*.css',
			]).pipe(gulp.dest('./release')),
			gulp.src([
				'./libraries/**',
			]).pipe(gulp.dest('./release/libraries')),
			gulp.src([
				'./assets/**',
			]).pipe(gulp.dest('./release/assets')),
		]);
	});
}