var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');

var utilities = require('@renovolive/gulp-utilities');
utilities.gulp.clean.config();
utilities.gulp.version.config();

gulp.task('wipe-npm', () => {
	return del('node_modules');
});

const testBundleSource = '(source/main.js + source/**/*.tests.js)';
utilities.gulp.bundle.config('tests', testBundleSource, {
	outDir: 'tests',
	outFile: 'tests.bundle.js',
});
