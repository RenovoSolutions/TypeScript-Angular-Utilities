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
	'rl-async-testing': 'node_modules/rl-async-testing',
	'rl-http': 'node_modules/rl-http',
	'rxjs': 'node_modules/rxjs',
};

var angularPackageNames = [
	'core',
	'compiler',
	'common',
	'platform-browser',
	'platform-browser-dynamic',
	'http',
];

var defaultPackages = [
	'rl-async-testing',
	'rl-http',
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

function setAngularPackage(packageName) {
	map[`@angular/${packageName}`] = `node_modules/@angular/${packageName}/bundles/${packageName}.umd.js`;
}

function setAngularTestingPackage(packageName) {
	map[`@angular/${packageName}/testing`] = `node_modules/@angular/${packageName}/bundles/${packageName}-testing.umd.js`;
}

function setDefaultPackage(packageName) {
	packages[packageName] = { main: 'index.js' };
}

angularPackageNames.forEach(setAngularPackage);
angularPackageNames.forEach(setAngularTestingPackage);
defaultPackages.forEach(setDefaultPackage);

System.config({
	meta: meta,
	map: map,
	packages: packages,
});
