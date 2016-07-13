import { UUID } from 'angular2-uuid';

export interface IGuidService {
	random(): string;
}

export class GuidService implements IGuidService {
	random(): string {
		return UUID.UUID();
	}
}

export const guid: GuidService = new GuidService();
