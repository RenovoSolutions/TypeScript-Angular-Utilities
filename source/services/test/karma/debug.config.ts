// Karma configuration

import defaultConfig from './default.config';

export default function (karma: any) {
	var options: any = defaultConfig(karma);
	options.singleRun = false;

	karma.set(options);
	return options;
}
