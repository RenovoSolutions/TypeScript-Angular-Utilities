var map = {
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

var defaultPackages = [
	'@angular/core',
	'@angular/compiler',
	'@angular/common',
	'@angular/platform-browser',
	'@angular/platform-browser-dynamic',
	'@angular/http',
];

var meta = {
	'jquery': {
		build: false,
	},
	'angular': {
		build: false,
	},
};

var packages = {
	'source': {
		defaultExtension: 'js',
	},
	'node_modules': {
		defaultExtension: 'js',
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
};

function setDefaultPackage(packageName) {
	packages[packageName] = {
		main: 'index.js',
	};
}

defaultPackages.forEach(setDefaultPackage);

System.config({
	meta: meta,
	map: map,
	packages: packages,
});
