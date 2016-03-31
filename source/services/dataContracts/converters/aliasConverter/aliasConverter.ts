import { IConverter } from '../converters';

export class AliasConverter<TDataType> implements IConverter<TDataType> {
	constructor(private alias: string) {}

	fromServer(raw: any, parent: any): TDataType {
		return null;
	}

	toServer(data: TDataType, parent: any): any {

	}
}
