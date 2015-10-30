// /// <reference path='../../../../typings/sinon/sinon.d.ts' />

'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { IBaseResourceBuilder } from './baseResourceBuilder.service';

export interface IContractLibrary {
	// extend with custom interface specifying child resources

	flush(): void;

	mockGet(resource: any, data: any): Sinon.SinonSpy;
	mockGetList(resource: any, data: any): Sinon.SinonSpy;
	mockGetDetail(resource: any, data: any): Sinon.SinonSpy;
}

export interface ILibraryServices {
	$q: ng.IQService;
	$rootScope: ng.IRootScopeService;
}

export class ContractLibrary implements IContractLibrary {
	private $q: ng.IQService;
	private $rootScope: ng.IRootScopeService;

	constructor(builder: IBaseResourceBuilder) {
		let services: ILibraryServices = builder.getLibraryServices();
		this.$q = services.$q;
		this.$rootScope = services.$rootScope;
	}

	flush(): void {
		this.$rootScope.$digest();
	}

	mockGet(resource: any, data: any): Sinon.SinonSpy {
		return this.baseMockGet(resource, 'get', data);
	}

	mockGetList(resource: any, data: any): Sinon.SinonSpy {
		return this.baseMockGet(resource, 'getList', data);
	}

	mockGetDetail(resource: any, data: any): Sinon.SinonSpy {
		return this.baseMockGet(resource, 'getDetail', data);
	}

	private baseMockGet(resource: any, actionName: string, data: any): Sinon.SinonSpy {
		let sinonInstance: Sinon.SinonStatic = sinon || <any>{ spy: (func: any): any => { return func; } };
		let func: Sinon.SinonSpy = sinonInstance.spy((): any => {
			return this.$q.when(data);
		});
		resource[actionName] = func;
		return func;
	}
}
