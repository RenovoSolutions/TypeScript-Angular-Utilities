'use strict';

const externalDeps = [
	'@angular/*',
	'angular',
	'angular-mocks',
	'rxjs/*',
	'lodash',
	'moment',
	'moment-timezone',
];

const map = {
	'@angular': 'node_modules/@angular',
	'angular': 'node_modules/angular/angular',
	'angular-mocks': 'node_modules/angular-mocks/angular-mocks',
	'rxjs': 'node_modules/rxjs',
	'lodash': 'node_modules/lodash/index',
	'node-uuid': 'node_modules/node-uuid/uuid',
	'moment': 'node_modules/moment/moment',
	'moment-timezone': 'node_modules/moment-timezone/builds/moment-timezone-with-data.min',
}

let meta = {};
externalDeps.forEach(dep => {
	meta[dep] = { build: false };
});

System.config({
	meta,
	map,
	paths: {
		'*': '*.js',
	},
});
