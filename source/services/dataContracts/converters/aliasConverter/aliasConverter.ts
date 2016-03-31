import * as _ from 'lodash';

import { IConverter } from '../converters';

export class AliasConverter<TDataType> implements IConverter<TDataType> {
	constructor(private alias: string
			, private composedConverter?: IConverter<TDataType>) { }

	fromServer: { (raw: any, parent: any): TDataType } = (raw: any, parent: any): TDataType => {
		if (!_.has(parent, this.alias)) {
			return null;
		}

		raw = parent[this.alias];
		parent[this.alias] = null;

		if (this.composedConverter != null) {
			return this.composedConverter.fromServer(raw, parent);
		}

		return raw;
	}

	toServer: {(data: TDataType, parent: any): any} = (data: TDataType, parent: any): any => {
		if (this.composedConverter != null) {
			data = this.composedConverter.toServer(data, parent);
		}

		parent[this.alias] = data;

		return null;
	}
}
