export var name: string = 'rl.utilities.number';

import __numberUtility = require('./number.service');

angular.module(name, [])
	.service(__numberUtility.name, __numberUtility.NumberUtility);
