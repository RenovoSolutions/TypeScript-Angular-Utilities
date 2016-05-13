import { OpaqueToken, Provider } from '@angular/core';
import { IArrayUtility } from '../array/array.service';
import { IDateUtility } from '../date/date.module';
export interface IObjectUtility {
    isNullOrEmpty(object: any[]): boolean;
    isNullOrEmpty(object: number): boolean;
    isNullOrEmpty(object: string): boolean;
    isNullOrEmpty(object: any): boolean;
    isNullOrWhitespace(object: any[]): boolean;
    isNullOrWhitespace(object: number): boolean;
    isNullOrWhitespace(object: string): boolean;
    isNullOrWhitespace(object: any): boolean;
    areEqual(obj1: any, obj2: any): boolean;
    toString(object: any): string;
    valueOrDefault(value: any, defaultValue: any): any;
    propertyNameToString(propertyFunction: () => any): string;
}
export declare class ObjectUtility implements IObjectUtility {
    private array;
    private dateUtility;
    constructor(array: IArrayUtility, dateUtility: IDateUtility);
    isNullOrEmpty(object: any): boolean;
    isNullOrWhitespace(object: any): boolean;
    areEqual(obj1: any, obj2: any): boolean;
    private areDates(obj1, obj2);
    toString(object: any): string;
    valueOrDefault(value: any, defaultValue: any): any;
    propertyNameToString(propertyFunction: () => any): string;
}
export declare let objectUtility: IObjectUtility;
export declare const objectToken: OpaqueToken;
export declare const OBJECT_PROVIDER: Provider;
