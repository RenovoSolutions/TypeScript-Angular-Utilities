import { OpaqueToken, Provider } from '@angular/core';
export interface IGuidService {
    random(): string;
}
export declare const guid: IGuidService;
export declare const guidToken: OpaqueToken;
export declare const GUID_PROVIDER: Provider;
