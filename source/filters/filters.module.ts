import * as angular from 'angular';

import * as isEmpty from './isEmpty/isEmpty';
import * as truncate from './truncate/truncate';

export { isEmpty, truncate };
export * from './filter';

export var name: string = 'rl.utilities.filters';

angular.module(name, [
	isEmpty.moduleName,
	truncate.moduleName,
]);
