'use strict';

export var name: string = 'rl21.components.truncate';

import __truncate = require('./truncate');

import __objectUtility = require('../../services/objectUtility/objectUtility.module');

angular.module(name, [__objectUtility.name])
	.filter(__truncate.name, __truncate.truncate);
