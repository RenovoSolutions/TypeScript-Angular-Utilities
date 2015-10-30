/// <reference path='../../../../typings/sinon/sinon.d.ts' />

'use strict';

import * as ng from 'angular';

export interface IContractLibrary {
	// extend with custom interface specifying child resources

	flush(): void;

	mockGet(resource: any, actionName: string, data: any): Function;
}

export class ContractLibrary implements IContractLibrary {
	constructor(private $q: ng.IQService
			, private $rootScope: ng.IRootScopeService) { }

	flush(): void {
		this.$rootScope.$digest();
	}

	mockGet(resource: any, actionName: string, data: any): Function {
		let func: Function = (): any => {
			return this.$q.when(data);
		};
		resource[actionName] = func;
		return func;
	}
}
