export var name: string = 'rl.utilities.promise';

import __promise = require('./promise.service');

angular.module(name, [])
	.service(__promise.name, __promise.PromiseUtility);
