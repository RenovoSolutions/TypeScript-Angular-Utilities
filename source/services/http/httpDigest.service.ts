import { Injectable, Provider, OpaqueToken } from '@angular/core';


export interface IHttpDigestService {
	startDigestCycle($digest: Function): void;
}


@Injectable()
export class HttpDigestService implements IHttpDigestService {

    constructor() { }

    startDigestCycle(digest: Function): void {
        if (digest != null) {
            digest();
        }
    }

}

export const httpDigestToken: OpaqueToken = new OpaqueToken('A service for initiating a new digests cycle after http calls');

export const HTTP_DIGEST_PROVIDER: Provider = new Provider(httpDigestToken, {
	useClass: HttpDigestService,
});
