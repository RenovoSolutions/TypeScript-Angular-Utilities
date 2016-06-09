import { OpaqueToken, Provider } from '@angular/core';

import { UUID } from 'angular2-uuid';

export interface IGuidService {
	random(): string;
}

class GuidService implements IGuidService {
	random(): string {
		return UUID.UUID();
	}
}

export const guid: IGuidService = new GuidService();

export const guidToken: OpaqueToken = new OpaqueToken('Service for generating guids');

export const GUID_PROVIDER: Provider = new Provider(guidToken, {
	useClass: GuidService,
});
