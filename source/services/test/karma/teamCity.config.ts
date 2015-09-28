// Karma configuration

import fullConfig from './full.config';

export default function (karma: any): any {
	var options: any = fullConfig(karma);
	options.reporters = ['teamcity'];

	karma.set(options);
	return options;
}
