'use strict';

export interface IDataContractsHelper {
	versionEndpoint(endpoint: string, versionNumber: number): string;
}

class DataContractsHelper implements IDataContractsHelper {
	versionEndpoint(endpoint: string, versionNumber: number): string {
		let versionExpression: RegEx = /v[0-9]+/;
		let endpointFragments: string[];

		let searchResult = endpoint.search(versionExpression);
		if (searchResult !== -1) {
			endpointFragments = endpoint.split(versionExpression);
		} else {
			endpointFragments = endpoint.split('api');
			endpointFragments[0] += 'api/';
		}

		return endpointFragments.join('v' + versionNumber);
	}
}

export let helper: IDataContractsHelper = new DataContractsHelper();