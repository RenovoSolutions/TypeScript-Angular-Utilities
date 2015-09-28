import * as angular from 'angular';

import * as mock from './mock';

export { mock };
export * from './angularFixture';

export var moduleName: string = 'rl.utilities.services.test';

angular.module(moduleName, [
	mock.moduleName,
]);