/// <reference path="../typings/angularjs/angular.d.ts" />

export var name: string = 'rl.utilities';

import __observable = require('./observable/observable.module');
import __jquery = require('./jquery/jquery.module');
import __number = require('./number/number.module');
import __promise = require('./promise/promise.module');
import __array = require('./array/array.module');
import __date = require('./date/date.module');
import __object = require('./object/object.module');

angular.module(name, [
	__observable.name,
	__jquery.name,
	__number.name,
	__promise.name,
	__array.name,
	__date.name,
	__object.name,
]);
