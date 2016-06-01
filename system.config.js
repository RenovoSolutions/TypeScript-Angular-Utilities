'use strict';

const map = {
	'@angular': 'node_modules/@angular',
	'angular': 'node_modules/angular',
	'angular-mocks': 'node_modules/angular-mocks/angular-mocks',
	'angular2-uuid': 'node_modules/angular2-uuid',
	'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js',
	'lodash': 'node_modules/lodash/index',
	'moment': 'node_modules/moment/moment',
	'moment-timezone': 'node_modules/moment-timezone/builds/moment-timezone-with-data.min',
	'ng-wig': 'node_modules/ng-wig',
	'rxjs': 'node_modules/rxjs',
};

const meta = {
	'jquery': {
		build: false,
	},
	'angular': {
		build: false,
	},
};

System.config({
	baseURL: '/',
	meta,
	map,
	packages: {
		'source': {
			defaultExtension: 'js',
		},
		'node_modules': {
			defaultExtension: 'js',
		},
		'@angular/http': {
			main: 'index.js',
		},
		'@angular/core': {
			main: 'index.js',
		},
		'@angular/upgrade': {
			main: 'index.js',
		},
		'@angular/platform-browser-dynamic': {
			main: 'index.js',
		},
		'@angular/platform-browser': {
			main: 'index.js',
		},
		'@angular/compiler': {
			main: 'index.js',
		},
		'@angular/common': {
			main: 'index.js',
		},
		'angular2-uuid': {
			main: 'index.js',
		},
		'rxjs': {
			main: 'Rx.js',
		},
		'angular': {
			main: 'index.js',
		},
	},
});
