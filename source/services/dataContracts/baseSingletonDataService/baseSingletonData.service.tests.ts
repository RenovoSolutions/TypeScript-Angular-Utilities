/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { IBaseSingletonDataService, IBaseSingletonDataServiceFactory, factoryName, moduleName } from './baseSingletonData.service';

import { angularFixture } from '../../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

interface ITestMock {
	prop: string;
}

describe('base singleton data service', () => {
	let baseSingletonDataService: IBaseSingletonDataService<ITestMock>;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	describe('use http', (): void => {
		let $httpBackend: angular.IHttpBackendService;
		let testUrl: string;

		beforeEach((): void => {
			let services: any = angularFixture.inject(factoryName, '$httpBackend');
			let baseSingletonDataServiceFactory: IBaseSingletonDataServiceFactory = services[factoryName];
			$httpBackend = services.$httpBackend;

			testUrl = '/api/test';
			baseSingletonDataService = baseSingletonDataServiceFactory.getInstance<ITestMock>(testUrl);
		});

		afterEach((): void => {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should make an http request to get the object', (done: MochaDone): void => {
			let id: number = 1;
			let mockItem: ITestMock = { prop: 'item' };

			$httpBackend.expectGET(testUrl).respond(200, mockItem);

			baseSingletonDataService.get().then((data: ITestMock): void => {
				expect(data).to.deep.equal(mockItem);
				done();
			});

			$httpBackend.flush();
		});

		it('should make an http request to save an existing domain object', (done: MochaDone): void => {
			let mockItem: ITestMock = { prop: 'item' };

			$httpBackend.expectPUT(testUrl, mockItem).respond(200);

			baseSingletonDataService.update(mockItem).then((): void => {
				done();
			});

			$httpBackend.flush();
		});
	});

	describe('use mock', (): void => {
		let $rootScope: angular.IRootScopeService;
		let mockItem: ITestMock;

		beforeEach((): void => {
			mockItem = { prop: 'item' };

			let services: any = angularFixture.inject(factoryName, '$rootScope');
			let baseSingletonDataServiceFactory: IBaseSingletonDataServiceFactory = services[factoryName];
			$rootScope = services.$rootScope;

			baseSingletonDataService = baseSingletonDataServiceFactory.getInstance<ITestMock>(null, mockItem, null, true);
		});

		it('should get the item', (done: MochaDone): void => {
			baseSingletonDataService.get().then((data: ITestMock): void => {
				expect(data).to.equal(mockItem);
				done();
			});

			$rootScope.$digest();
		});

		it('should update the item', (): void => {
			let updatedItem: ITestMock = { prop: 'made changes' };

			baseSingletonDataService.update(updatedItem);

			$rootScope.$digest();

			expect(mockItem.prop).to.equal('made changes');
		});
	});

	describe('transform', (): void => {
		let $rootScope: angular.IRootScopeService;
		let mockItem: ITestMock;
		let transform: any;

		beforeEach((): void => {
			mockItem = { prop: 'item' };

			let services: any = angularFixture.inject(factoryName, '$rootScope');
			let baseSingletonDataServiceFactory: IBaseSingletonDataServiceFactory = services[factoryName];
			$rootScope = services.$rootScope;

			transform = {
				fromServer: sinon.spy((rawData: ITestMock): string => {
					return rawData.prop;
				}),
				toServer: sinon.spy((data: string): ITestMock => {
					return {
						prop: data,
					};
				}),
			};

			baseSingletonDataService = baseSingletonDataServiceFactory.getInstance<ITestMock>(null, mockItem, transform, true);
		});

		it('should transform the single item', (done: MochaDone): void => {
			baseSingletonDataService.get().then((data: ITestMock): void => {
				expect(data).to.equal(mockItem.prop);
				sinon.assert.calledOnce(transform.fromServer);
				done();
			});

			$rootScope.$digest();
		});
	});
});
