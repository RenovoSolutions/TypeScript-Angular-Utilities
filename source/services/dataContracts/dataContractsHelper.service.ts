'use strict';

export interface IDataContractsHelper {
	versionEndpoint(endpoint: string, versionNumber: number): string;
}

class DataContractsHelper implements IDataContractsHelper {
	versionEndpoint(endpoint: string, versionNumber: number): string {
		let endpointFragments: string[] = endpoint.split('api');
		return endpointFragments.join('api/v' + versionNumber);
	}
}

export let helper: IDataContractsHelper = new DataContractsHelper();