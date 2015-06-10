// uses typings/angularjs

'use strict';

export var name: string = 'rl21.components.truncate';

import { name as serviceName, truncate } from './truncate';

import { name as objectUtilityModule } from '../object/object.module';

angular.module(name, [objectUtilityModule])
	.filter(serviceName, truncate);
