export * from './aliasConverter/aliasConverter';
export * from './dateConverter/dateConverter';
export * from './enumConverter/enumConverter';
export interface IConverter<TDataType> {
    fromServer(raw: any, parent?: any): TDataType;
    toServer(data: TDataType, parent?: any): any;
}
export interface ITransformMapping {
    [index: string]: IConverter<any> | ITransformMapping;
}
export interface IConverterService {
    applyTransform(data: any, transform: IConverter<any> | ITransformMapping, toServer: boolean): any;
}
export declare class ConverterService {
    applyTransform(data: any, transform: IConverter<any> | ITransformMapping, toServer: boolean, parent?: any): any;
    private isConverter(object);
}
export declare let converterService: IConverterService;
