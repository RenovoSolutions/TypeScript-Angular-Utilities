// uses typings/angularjs

export var name: string = 'rl.utilities.observable';

import { name as serviceName, observableServiceFactory } from './observable.service';

angular.module(name, [])
	.factory(serviceName, observableServiceFactory);
