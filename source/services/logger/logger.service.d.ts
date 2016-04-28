import { OpaqueToken, Provider } from 'angular2/core';
export interface ILogger {
    log(message: any): void;
}
export declare class Logger {
    private console;
    constructor();
    log(message: any): void;
}
export declare const loggerToken: OpaqueToken;
export declare const LOGGER_PROVIDER: Provider;
