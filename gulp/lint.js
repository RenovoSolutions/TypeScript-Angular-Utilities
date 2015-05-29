var tslint = require('gulp-tslint');

exports.config = function(gulp) {
    gulp.task('lint', function() {
		gulp.src(['./source/**/*.ts', '!./source/typings/*.d.ts'])
			.pipe(tslint())
			.pipe(tslint.report('verbose'));
    });
};