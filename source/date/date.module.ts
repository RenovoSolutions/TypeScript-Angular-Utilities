// uses typings/angularjs

export var name: string = 'rl.utilities.dateUtility';

import { name as serviceName, DateUtility } from './date.service';

angular.module(name, [])
	.service(serviceName, DateUtility);
