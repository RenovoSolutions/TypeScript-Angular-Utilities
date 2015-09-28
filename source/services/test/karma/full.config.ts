// Karma configuration

import defaultConfig from './default.config';

export default function(karma: any) {
	var options: any = defaultConfig(karma);
	options.browsers = ['Chrome', 'Firefox', 'IE'];

	karma.set(options);
	return options;
}
