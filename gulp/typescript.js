var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var typescriptCompiler = ts({
	declarationFiles: true,
	noExternalResolve: true,
	module: 'commonjs',
	target: 'ES5',
	sortOutput: true,
});

module.exports = function (source, noSourceMappings) {
	if (noSourceMappings) {
		return source.pipe(typescriptCompiler);
	} else {
		var tsResult = source.pipe(sourcemaps.init({ debug: true }))
			.pipe(typescriptCompiler);

		return {
			js: tsResult.js.pipe(sourcemaps.write()),
			dts: tsResult.dts,
		};
	}
}