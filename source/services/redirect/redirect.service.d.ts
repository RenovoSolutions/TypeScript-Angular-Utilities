import { Provider, OpaqueToken } from 'angular2/core';
export interface IRedirectService {
    getCurrentLocationAsParam(): string;
    to(target: string, newTab?: boolean): void;
}
export declare class RedirectService implements IRedirectService {
    private window;
    constructor(window: Window);
    getCurrentLocationAsParam(): string;
    to(target: string, newTab?: boolean): void;
}
export declare const redirectToken: OpaqueToken;
export declare const REDIRECT_PROVIDER: Provider;
