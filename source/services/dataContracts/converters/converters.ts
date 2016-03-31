'use strict';

export * from './dateConverter/dateConverter';
export * from './enumConverter/enumConverter';

export interface IConverter<TDataType> {
	fromServer(raw: any): TDataType;
    toServer(data: TDataType): any,
}

export interface ITransformMapping {
	[index: string]: IConverter<any> | ITransformMapping;
}

export interface IConverterService {
	applyTransform(data: any, transform: IConverter<any> | ITransformMapping, toServer: boolean): any;
}

export class ConverterService {
	applyTransform(data: any, transform: IConverter<any> | ITransformMapping, toServer: boolean): any {
		if (transform == null) {
			return data;
		}

		if (_.isArray(data)) {
			return _.map(data, (item: any): any => { return this.applyTransform(item, transform, toServer); });
		}

		if (this.isConverter(transform)) {
			let transformFunc: { (data: any): any } = toServer
				? (<IConverter<any>>transform).toServer
				: (<IConverter<any>>transform).fromServer;
			return transformFunc(data);
		} else {
			return <any>_.mapValues(data, (prop: any, key: string): any => {
				if (_.has(transform, key)) {
					return this.applyTransform(prop, transform[key], toServer);
				}
				return prop;
			});
		}
	}

	private isConverter(object: any): boolean {
		return _.isFunction(object.fromServer)
			|| _.isFunction(object.toServer);
	}
}

export let converterService: IConverterService = new ConverterService();
