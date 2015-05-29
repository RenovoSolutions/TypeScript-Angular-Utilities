'use strict';

export var name: string = 'rl.utilities.object';

import __object = require('./object.service');

angular.module(name, [])
	.service(__object.name, __object.ObjectUtility);
