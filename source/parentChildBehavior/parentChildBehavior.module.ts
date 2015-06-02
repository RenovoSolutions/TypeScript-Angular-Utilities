'use strict';

export var name: string = 'rl21.services.parentChildBehavior';

import __parentChildBehavior = require('./parentChildBehavior.service');

angular.module(name, [])
	.service(__parentChildBehavior.name, __parentChildBehavior.ParentChildBehaviorService);
