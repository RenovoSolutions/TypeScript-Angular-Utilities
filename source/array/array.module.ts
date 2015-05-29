/// <reference path="../../typings/angularjs/angular.d.ts" />

export var name: string = 'rl.utilities.array';

import __array = require('./array.service');

angular.module(name, [])
	.service(__array.name, __array.ArrayUtility);
