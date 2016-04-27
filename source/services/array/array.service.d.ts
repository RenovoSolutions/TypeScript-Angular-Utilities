import { OpaqueToken, Provider } from 'angular2/core';
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
    has<TDataType>(array: TDataType[], index: number): boolean;
    arrayify<TDataType>(maybeArray: TDataType[] | TDataType): TDataType[];
}
export declare class ArrayUtility implements IArrayUtility {
    findIndexOf<TDataType>(array: TDataType[], predicate: {
        (item: TDataType): boolean;
    }): number;
    remove<TDataType>(array: TDataType[], item: TDataType | {
        (obj: TDataType): boolean;
    }): TDataType;
    replace<TDataType>(array: TDataType[], oldItem: TDataType, newItem: TDataType): void;
    sum<TDataType>(array: TDataType[], transform?: {
        (item: TDataType): number;
    }): number;
    toDictionary<TDataType>(array: TDataType[], keySelector: {
        (item: TDataType): string;
    }): {
        [index: string]: TDataType;
    };
    last<TDataType>(array: TDataType[]): TDataType;
    has<TDataType>(array: TDataType[], index: number): boolean;
    arrayify<TDataType>(maybeArray: TDataType[] | TDataType): TDataType[];
}
export declare let arrayUtility: IArrayUtility;
export declare const arrayToken: OpaqueToken;
export declare const ARRAY_PROVIDER: Provider;
