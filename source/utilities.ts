/// <reference path="../typings/angularjs/angular.d.ts" />

export var name: string = 'rl.utilities';

import __array = require('./array/array.module');
import __date = require('./date/date.module');
import __jquery = require('./jquery/jquery.module');
import __number = require('./number/number.module');
import __object = require('./object/object.module');
import __observable = require('./observable/observable.module');
import __promise = require('./promise/promise.module');
import __truncate = require('./truncate/truncate.module');

angular.module(name, [
	__array.name,
	__date.name,
	__jquery.name,
	__number.name,
	__object.name,
	__observable.name,
	__promise.name,
	__truncate.name,
]);

import __test = require('./test/test.module');

/* tslint:disable */
// reference components and services so that both are included as children of this page
[__test];
/* tslint:enable */
