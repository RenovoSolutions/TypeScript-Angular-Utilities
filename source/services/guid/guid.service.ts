import { OpaqueToken, Provider } from '@angular/core';

import * as uuid from 'uuid';

export interface IGuidService {
	time(): string;
	random(): string;
}

class GuidService implements IGuidService {
	time(): string {
		return uuid.v1();
	}

	random(): string {
		return uuid.v4();
	}
}

export const guid: IGuidService = new GuidService();

export const guidToken: OpaqueToken = new OpaqueToken('Service for generating guids');

export const GUID_PROVIDER: Provider = new Provider(guidToken, {
	useClass: GuidService,
});
