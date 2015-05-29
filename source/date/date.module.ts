/// <reference path='../../typings/moment/moment.d.ts' />

export var name: string = 'rl.utilities.dateUtility';

import __dateUtility = require('./date.service');

angular.module(name, [])
	.service(__dateUtility.name, __dateUtility.DateUtility);
