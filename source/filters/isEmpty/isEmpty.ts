'use strict';

import * as angular from 'angular';

import {
	serviceName as objectServiceName,
	IObjectUtility,
	moduleName as objectModuleName
} from '../../services/object/object.service';

export var moduleName: string = 'rl.utilities.filters.isEmpty';
export var serviceName: string = 'isEmpty';
export var filterName: string = serviceName + 'Filter';

export interface IIsEmptyFilter {
	(input: any, trueWhenEmpty?: boolean): boolean;
}

isEmpty.$inject = [objectServiceName];
function isEmpty(object: IObjectUtility): IIsEmptyFilter {
	'use strict';
	return (input: any, trueWhenEmpty?: boolean): boolean => {
		var isEmpty: boolean = object.isNullOrEmpty(input);

		if (trueWhenEmpty === false) {
			return !isEmpty;
		}
		return isEmpty;
	};
}

angular.module(moduleName, [objectModuleName])
	.filter(serviceName, isEmpty);