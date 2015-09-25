export interface IMock {
    service(service?: any): any;
    promise<TDataType>(service: any, methodName: string, data?: TDataType, successful?: boolean): void;
    promiseWithCallback<TDataType>(service: any, methodName: string, callback: {
        (...params: any[]): TDataType;
    }, successful?: boolean): void;
    flush<TDataType>(service: any): void;
}
export declare var mock: IMock;
