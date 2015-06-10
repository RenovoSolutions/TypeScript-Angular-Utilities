// uses typings/angularjs

'use strict';

export var name: string = 'rl.utilities.object';

import { name as serviceName, ObjectUtility } from './object.service';

angular.module(name, [])
	.service(serviceName, ObjectUtility);
