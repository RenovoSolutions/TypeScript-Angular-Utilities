'use strict';

export * from './aliasConverter/aliasConverter';
export * from './dateConverter/dateConverter';
export * from './enumConverter/enumConverter';
export * from './timeConverter/timeConverter';

import { objectUtility } from '../../object/object.service';

export interface IConverter<TDataType> {
	fromServer(raw: any, parent?: any): TDataType;
    toServer(data: TDataType, parent?: any): any,
}

export interface ITransformMapping {
	[index: string]: IConverter<any> | ITransformMapping;
}

export interface IConverterService {
	applyTransform(data: any, transform: IConverter<any> | ITransformMapping, toServer: boolean): any;
}

export class ConverterService {
	applyTransform(data: any, transform: IConverter<any> | ITransformMapping, toServer: boolean, parent?: any): any {
		if (transform == null || (parent == null && objectUtility.isNullOrEmpty(data))) {
			return data;
		}

		if (_.isArray(data)) {
			return _.map(data, (item: any): any => { return this.applyTransform(item, transform, toServer); });
		}

		if (this.isConverter(transform)) {
			let transformFunc: { (data: any, parent?: any): any } = toServer
				? (<IConverter<any>>transform).toServer
				: (<IConverter<any>>transform).fromServer;
			return transformFunc(data, parent);
		} else {
			let mappedData: any = _.clone(data);
			_.each(transform, (childTransform: any, key: string): any => {
				mappedData[key] = this.applyTransform(_.get(mappedData, key), childTransform, toServer, mappedData);
			});
			return mappedData;
		}
	}

	private isConverter(object: any): boolean {
		return _.isFunction(object.fromServer)
			|| _.isFunction(object.toServer);
	}
}

export let converterService: IConverterService = new ConverterService();
