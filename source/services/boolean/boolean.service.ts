import { OpaqueToken, Provider } from '@angular/core';

export interface IBooleanUtility {
	toBool(object: any): boolean;
}

export class BooleanUtility implements IBooleanUtility {
	toBool(object: any): boolean {
		return !!object;
	}
}

export const booleanToken: OpaqueToken = new OpaqueToken('A utility for working with booleans');

export const BOOLEAN_PROVIDER: Provider = new Provider(booleanToken, {
	useClass: BooleanUtility,
});
