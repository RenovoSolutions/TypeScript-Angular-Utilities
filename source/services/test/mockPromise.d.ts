import * as Promise from 'bluebird';
export interface IMockPromiseService {
    promise<TData>(result: TData | {
        (...args: any[]): TData;
    }): IMockedPromise<TData>;
    rejectedPromise<TData>(...params: any[]): IMockedPromise<TData>;
    flushAll(service: any): void;
}
export interface IMockedPromise<TData> extends Sinon.SinonSpy {
    (...args: any[]): Promise<TData>;
    reject(...params: any[]): void;
    rejected: boolean;
    flush(): void;
}
export declare const mock: IMockPromiseService;
