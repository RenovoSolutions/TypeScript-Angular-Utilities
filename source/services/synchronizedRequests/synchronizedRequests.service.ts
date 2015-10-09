'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.synchronizedRequests';
export var serviceName: string = 'synchronizedRequests';

export class SynchronizedRequestsService {
	// implementation
}

angular.module(moduleName, [])
	.service(serviceName, SynchronizedRequestsService);
