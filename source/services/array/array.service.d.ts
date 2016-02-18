export declare var moduleName: string;
export declare var serviceName: string;
export interface IArrayUtility {
    findIndexOf<TDataType>(array: TDataType[], predicate: {
        (item: TDataType): boolean;
    }): number;
    remove<TDataType>(array: TDataType[], item: {
        (obj: TDataType): boolean;
    }): TDataType;
    remove<TDataType>(array: TDataType[], item: TDataType): TDataType;
    replace<TDataType>(array: TDataType[], oldItem: TDataType, newItem: TDataType): void;
    sum<TDataType>(array: TDataType[], transform: {
        (item: TDataType): number;
    }): number;
    sum(array: number[]): number;
    last<TDataType>(array: TDataType[]): TDataType;
    toDictionary<TDataType>(array: TDataType[], keySelector: {
        (item: TDataType): string;
    }): {
        [index: string]: TDataType;
    };
}
export declare let arrayUtility: IArrayUtility;
