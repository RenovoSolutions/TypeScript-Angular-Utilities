import { IConverter } from '../converters';
export declare class AliasConverter<TDataType> implements IConverter<TDataType> {
    private alias;
    private composedConverter;
    constructor(alias: string, composedConverter?: IConverter<TDataType>);
    fromServer: {
        (raw: any, parent: any): TDataType;
    };
    toServer: {
        (data: TDataType, parent: any): any;
    };
}
