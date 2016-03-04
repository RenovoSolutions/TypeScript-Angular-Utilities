'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

export var moduleName: string = 'rl.utilities.services.transform';
export var serviceName: string = 'transformService';

export interface ITransformService {
	getValue<TItemType, TReturnType>(item: TItemType, transform: { (item: TItemType): TReturnType } | string);
}

export class TransformService implements ITransformService {
	getValue<TItemType, TReturnType>(item: TItemType, transform: { (item: TItemType): TReturnType } | string) {
		return _.isFunction(transform)
			? (<{ (item: TItemType): TReturnType }>transform)(item)
			: item[<string>transform];
	}
}

export let transform: ITransformService = new TransformService();

angular.module(moduleName, [])
	.service(serviceName, TransformService);
