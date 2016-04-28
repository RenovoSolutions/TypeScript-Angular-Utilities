export interface IMockPromiseService {
    promise<TData>(result?: TData | {
        (...args: any[]): TData;
    }, share?: boolean): IMockedPromise<TData>;
    rejectedPromise<TData>(...params: any[]): IMockedPromise<TData>;
    flushAll(service: any): void;
}
export interface IMockedPromise<TData> extends Sinon.SinonSpy {
    (...args: any[]): Promise<TData>;
    reject(...params: any[]): void;
    rejected: boolean;
    flush(): void;
    share(share?: boolean): void;
}
export declare const mock: IMockPromiseService;
