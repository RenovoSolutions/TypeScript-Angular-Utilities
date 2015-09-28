import * as _ from 'lodash';
import * as gulpImport from 'gulp';
import * as del from 'del';

export interface ICleanOptions {
	location: string;
}

let defaultOptions: ICleanOptions = {
	location: './source',
};

export function config(options: ICleanOptions, gulp: any): void {
	if (_.isUndefined(gulp)) {
		gulp = gulpImport;
	}

	if (!options) {
		options = <any>{};
	}

	options = _.defaults<ICleanOptions, ICleanOptions>(options, defaultOptions);

	gulp.task('clean', (done: any): void => {
		return clean(options.location, done);
	});
}

export function clean(target: string, done: any): any {
	let dir: string = './source';
	let jsFiles: string = '/**/*.js';
	let mapFiles: string = '/**/*.js.map';
	let typingFiles: string = '/**/*.d.ts';
	return del([dir + jsFiles, dir + mapFiles, dir + typingFiles], done);
}
