import { OpaqueToken, Provider, ExceptionHandler } from 'angular2/core';
export interface IWatcher<TReturnType> {
    action: IAction<TReturnType>;
    event?: string;
}
export interface IAction<TReturnType> {
    (...params: any[]): TReturnType;
}
export interface IUnregisterFunction {
    (): void;
}
export interface IObservableService {
    allowableEvents?: string[];
    register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction;
    register(action: IAction<void>, event?: string): IUnregisterFunction;
    fire<TReturnType>(event?: string, ...params: any[]): TReturnType[];
    fire(event?: string, ...params: any[]): void;
}
export declare class ObservableService implements IObservableService {
    private exceptionHandler;
    private watchers;
    private nextKey;
    allowableEvents: string[];
    constructor(exceptionHandler: ExceptionHandler);
    register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction;
    fire<TReturnType>(event?: string, ...params: any[]): TReturnType[];
    private unregister(key);
}
export declare const observableToken: OpaqueToken;
export declare const OBSERVABLE_PROVIDER: Provider;
