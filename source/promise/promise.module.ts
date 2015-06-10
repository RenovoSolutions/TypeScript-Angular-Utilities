// uses typings/angularjs

export var name: string = 'rl.utilities.promise';

import { name as serviceName, PromiseUtility } from './promise.service';

angular.module(name, [])
	.service(serviceName, PromiseUtility);
