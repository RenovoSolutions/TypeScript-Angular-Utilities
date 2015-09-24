'use strict';

import * as angular from 'angular';

import * as behaviors from './behaviors/behaviors.module';
import * as filters from './filters/filters.module';
import * as services from './services/services.module';

export { behaviors, filters, services };

export var name: string = 'rl.utilities';

angular.module(name, [
	behaviors.name,
	filters.name,
	services.name,
]);
