export interface IDataContractsHelper {
	versionEndpoint(endpoint: string, versionNumber: number): string;
}

class DataContractsHelper implements IDataContractsHelper {
	versionEndpoint(endpoint: string, versionNumber: number): string {
		let versionExpression: RegExp = /\/v\d+\//;
		let apiExpression: RegExp = /\/api\//;

		let versionString: string = 'v' + versionNumber;

		let searchResult = endpoint.search(versionExpression);
		if (searchResult !== -1) {
			return endpoint.replace(versionExpression, '/' + versionString + '/');
		} else {
			return endpoint.replace(apiExpression, '/api/' + versionString + '/');
		}
	}
}

export let helper: IDataContractsHelper = new DataContractsHelper();