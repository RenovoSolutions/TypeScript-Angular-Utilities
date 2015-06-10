// uses typings/angularjs

export var name: string = 'rl.utilities.array';

import * as __array from './array.service';

angular.module(name, [])
	.service(__array.name, __array.ArrayUtility);
