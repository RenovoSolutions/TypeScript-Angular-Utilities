export declare var moduleName: string;
export declare var serviceName: string;
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
export declare let transform: ITransformService;
