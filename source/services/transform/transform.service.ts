import { Provider, OpaqueToken } from 'angular2/core';
import * as _ from 'lodash';

export interface ITransformService {
	getValue<TItemType, TReturnType>(item: TItemType, transform: { (item: TItemType): TReturnType } | string);
}

export class TransformService implements ITransformService {
	getValue<TItemType, TReturnType>(item: TItemType, transform: { (item: TItemType): TReturnType } | string) {
		if (item == null) {
			return null;
		}

		if (transform == null) {
			return item;
		}

		return _.isFunction(transform)
			? (<{ (item: TItemType): TReturnType }>transform)(item)
			: item[<string>transform];
	}
}


export const transformServiceToken: OpaqueToken = new OpaqueToken('transform service token');

export const TRANSFORM_SERVICE_PROVIDER: Provider = new Provider(transformServiceToken, {
	useClass: TransformService
});
