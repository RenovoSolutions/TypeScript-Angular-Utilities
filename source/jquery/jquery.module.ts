// uses typings/angularjs

export var name: string = 'rl.utilities.jquery';

import { name as serviceName, JQueryUtility } from './jquery.service';

angular.module(name, [])
	.service(serviceName, JQueryUtility);
