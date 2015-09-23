'use strict';

import * as angular from 'angular';

import * as stopEventPropogation from './stopEventPropagation/stopEventPropagation';

export { stopEventPropogation };

export var name: string = 'rl.utilities.behaviors';

angular.module(name, [
	stopEventPropogation.moduleName,
]);
