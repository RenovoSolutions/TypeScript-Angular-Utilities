import * as angular from 'angular';

import * as mock from './mock';
import * as karma from './karma/karma';

export { mock, karma };
export * from './angularFixture';

export var moduleName: string = 'rl.utilities.services.test';

angular.module(moduleName, [
	mock.moduleName,
]);