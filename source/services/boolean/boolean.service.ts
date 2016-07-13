export interface IBooleanUtility {
	toBool(object: any): boolean;
}

export class BooleanUtility implements IBooleanUtility {
	toBool(object: any): boolean {
		return !!object;
	}
}
