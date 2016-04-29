import { Provider, OpaqueToken } from 'angular2/core';
export interface ITransformService {
    getValue<TItemType, TReturnType>(item: TItemType, transform: {
        (item: TItemType): TReturnType;
    } | string): any;
}
export declare class TransformService implements ITransformService {
    getValue<TItemType, TReturnType>(item: TItemType, transform: {
        (item: TItemType): TReturnType;
    } | string): any;
}
export declare const transform: ITransformService;
export declare const transformServiceToken: OpaqueToken;
export declare const TRANSFORM_SERVICE_PROVIDER: Provider;
