export declare var moduleName: string;
export declare var serviceName: string;
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
export declare let objectUtility: IObjectUtility;
