/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import {
	ISynchronizedRequestsService,
	ISynchronizedRequestsFactory,
	moduleName,
	factoryName,
} from './synchronizedRequests.service';

import { angularFixture } from '../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

describe('synchronizedRequests', () => {
	let synchronizedRequests: ISynchronizedRequestsService;
	let synchronizedRequestsFactory: ISynchronizedRequestsFactory;
	let $rootScope: angular.IRootScopeService;
	let $q: angular.IQService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = angularFixture.inject(factoryName, '$rootScope', '$q');
		synchronizedRequestsFactory = services[factoryName];
		$rootScope = services.$rootScope;
		$q = services.$q;
	});

	it('should accept the results from only the most recent request', (): void => {
		let firstRequestData: number[] = [1, 2];
		let secondRequestData: number[] = [3, 4];
		let firstRequest: angular.IDeferred<number[]> = $q.defer<number[]>();
		let secondRequest: angular.IDeferred<number[]> = $q.defer<number[]>();

		let callback: Sinon.SinonSpy = sinon.spy();
		let get: Sinon.SinonSpy = sinon.spy((): angular.IPromise<number[]> => { return firstRequest.promise; });

		synchronizedRequests = synchronizedRequestsFactory.getInstance(get, callback);

		synchronizedRequests.getData();

		sinon.assert.calledOnce(get);

		get = sinon.spy((): angular.IPromise<number[]> => { return secondRequest.promise; });

		synchronizedRequests.dataProvider = get;
		synchronizedRequests.getData();

		sinon.assert.calledOnce(get);

		firstRequest.resolve(firstRequestData);
		$rootScope.$digest();

		sinon.assert.notCalled(callback);

		secondRequest.resolve(secondRequestData);
		$rootScope.$digest();

		sinon.assert.calledOnce(callback);
		sinon.assert.calledWith(callback, secondRequestData);
	});
});
