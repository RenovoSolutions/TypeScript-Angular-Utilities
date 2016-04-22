import * as angular from 'angular';
import './chaiMoment';

import * as angularBluebirdName from 'angular-bluebird-promises';

export * from './mockPromise';
export * from './angularFixture';

export var moduleName: string = 'rl.utilities.services.test';

angular.module(moduleName, [angularBluebirdName])
	// For tests, update the bluebird scheduler to run async immediately
	.run(['Bluebird', (Bluebird: any) => {
		Bluebird.setScheduler((cb: Function) => cb());
	}]);
