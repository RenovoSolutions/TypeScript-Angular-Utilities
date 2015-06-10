// uses typings/angularjs

export var name: string = 'rl.utilities.number';

import { name as serviceName, NumberUtility } from './number.service';

angular.module(name, [])
	.service(serviceName, NumberUtility);
