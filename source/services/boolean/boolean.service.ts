'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.boolean';
export var serviceName: string = 'booleanUtility';

export interface IBooleanUtility {
	toBool(object: any): boolean;
}

class BooleanUtility implements IBooleanUtility {
	toBool(object: any): boolean {
		return !!object;
	}
}

angular.module(moduleName, [])
	.service(serviceName, BooleanUtility);
