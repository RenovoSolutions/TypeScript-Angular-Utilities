/// <vs BeforeBuild='build' AfterBuild='resolve' Clean='clean' />
var gulp = require('gulp');
var build = require('./gulp/build.js');
var test = require('./gulp/test.js');

build.config(gulp);
test.config(gulp);

gulp.task('default', ['build']);

var runSequence = require('run-sequence');

gulp.task('tc', function(done) {
    runSequence('build.release',
                'test.tc',
                done);
});

gulp.task('run', function(done) {
    runSequence('build.release',
                'serve',
                done);
});

gulp.task('run.tests', function (done) {
	runSequence('build.release',
                'test',
                done);
});
