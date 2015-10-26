'use strict';

import * as angular from 'angular';

import * as uuid from 'uuid';

export var moduleName: string = 'rl.utilities.services.guid';
export var serviceName: string = 'guidService';

export interface IGuidService {
	time(): string;
	random(): string;
}

class GuidService implements IGuidService {
	time(): string {
		return uuid.v1();
	}

	random(): string {
		return uuid.v4();
	}
}

angular.module(moduleName, [])
	.service(serviceName, GuidService);
