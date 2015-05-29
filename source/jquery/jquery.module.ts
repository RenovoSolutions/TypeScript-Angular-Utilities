/// <reference path="../../typings/angularjs/angular.d.ts" />

export var name: string = 'rl.utilities.jquery';

import __jquery = require('./jquery.service');

angular.module(name, [])
	.service('jqueryUtility', __jquery.JQueryUtility);
