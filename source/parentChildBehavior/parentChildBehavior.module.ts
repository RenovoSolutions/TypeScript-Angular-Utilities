// uses typings/angularjs

'use strict';

export var name: string = 'rl21.services.parentChildBehavior';

import { name as serviceName, ParentChildBehaviorService } from './parentChildBehavior.service';

angular.module(name, [])
	.service(serviceName, ParentChildBehaviorService);
