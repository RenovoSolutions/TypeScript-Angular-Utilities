import { OpaqueToken, Provider } from 'angular2/core';
export interface IBooleanUtility {
    toBool(object: any): boolean;
}
export declare class BooleanUtility implements IBooleanUtility {
    toBool(object: any): boolean;
}
export declare const booleanToken: OpaqueToken;
export declare const BOOLEAN_PROVIDER: Provider;
