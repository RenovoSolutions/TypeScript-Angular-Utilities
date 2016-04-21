import * as Promise from 'bluebird';
export interface IMockPromiseService {
    promise<TData>(result: TData | {
        (...args: any[]): TData;
    }): IMockedPromise<TData>;
    rejectedPromise<TData>(...params: any[]): IMockedPromise<TData>;
}
export interface IMockedPromise<TData> {
    (...args: any[]): Promise<TData>;
    reject(...params: any[]): void;
    rejected: boolean;
    flush(): void;
}
export declare const mock: IMockPromiseService;
