export var name: string = 'rl.utilities.observable';

import observable = require('./observable.service');

angular.module(name, [])
	.factory('observableFactory', observable.observableServiceFactory);
