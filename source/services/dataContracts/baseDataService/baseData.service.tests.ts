/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { IBaseDataService, IBaseDataServiceFactory, IBaseDomainObject, factoryName, moduleName } from './baseData.service';

import { angularFixture } from '../../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

interface ITestMock {
	id: number;
	prop: string;
}

describe('base data service', () => {
	let baseDataService: IBaseDataService<IBaseDomainObject, void>;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	describe('use http', (): void => {
		let $httpBackend: angular.IHttpBackendService;
		let testUrl: string;

		beforeEach((): void => {
			let services: any = angularFixture.inject(factoryName, '$httpBackend');
			let baseDataServiceFactory: IBaseDataServiceFactory = services[factoryName];
			$httpBackend = services.$httpBackend;

			testUrl = '/api/test';
			baseDataService = baseDataServiceFactory.getInstance<IBaseDomainObject, void>(testUrl);
		});

		afterEach((): void => {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should make an http request to get a list of data', (done: MochaDone): void => {
			let mockList: IBaseDomainObject[] = [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 4 },
				{ id: 5 },
			];

			$httpBackend.expectGET(testUrl).respond(200, mockList);

			baseDataService.getList().then((data: IBaseDomainObject[]): void => {
				expect(data).to.have.length(5);
				expect(data[0].id).to.equal(1);
				expect(data[1].id).to.equal(2);
				expect(data[2].id).to.equal(3);
				expect(data[3].id).to.equal(4);
				expect(data[4].id).to.equal(5);
				done();
			});

			$httpBackend.flush();
		});

		it('should make an http request to get a domain object', (done: MochaDone): void => {
			let id: number = 1;
			let mockItem: IBaseDomainObject = { id: id };

			$httpBackend.expectGET(testUrl + '/' + id).respond(200, mockItem);

			baseDataService.getDetail(id).then((data: IBaseDomainObject): void => {
				expect(data.id).to.equal(id);
				done();
			});

			$httpBackend.flush();
		});

		it('should make an http request to create a domain object', (done: MochaDone): void => {
			let mockItem: IBaseDomainObject = { id: 1 };

			$httpBackend.expectPOST(testUrl, mockItem).respond(200, mockItem);

			baseDataService.create(mockItem).then((data: IBaseDomainObject): void => {
				expect(data.id).to.equal(1);
				done();
			});

			$httpBackend.flush();
		});

		it('should make an http request to save an existing domain object', (done: MochaDone): void => {
			let mockItem: IBaseDomainObject = { id: 1 };

			$httpBackend.expectPUT(testUrl + '/' + mockItem.id, mockItem).respond(200);

			baseDataService.update(mockItem).then((): void => {
				done();
			});

			$httpBackend.flush();
		});

		it('should make an http request to delete an existing domain object', (done: MochaDone): void => {
			let mockItem: IBaseDomainObject = { id: 1 };

			$httpBackend.expectDELETE(testUrl + '/' + mockItem.id).respond(200);

			baseDataService.delete(mockItem).then((): void => {
				done();
			});

			$httpBackend.flush();
		});
	});

	describe('use mock', (): void => {
		let $rootScope: angular.IRootScopeService;
		let dataSet: ITestMock[];

		beforeEach((): void => {
			dataSet = [
				{ id: 1, prop: 'item1' },
				{ id: 2, prop: 'item2' },
				{ id: 3, prop: 'item3' },
			];

			let services: any = angularFixture.inject(factoryName, '$rootScope');
			let baseDataServiceFactory: IBaseDataServiceFactory = services[factoryName];
			$rootScope = services.$rootScope;

			baseDataService = baseDataServiceFactory.getInstance<ITestMock, void>(null, dataSet, null, true);
		});

		it('should get the mocked data set', (done: MochaDone): void => {
			baseDataService.getList().then((data: ITestMock[]): void => {
				expect(data).to.have.length(3);
				expect(data[0]).to.equal(dataSet[0]);
				expect(data[1]).to.equal(dataSet[1]);
				expect(data[2]).to.equal(dataSet[2]);
				done();
			});

			$rootScope.$digest();
		});

		it('should get an item by id', (done: MochaDone): void => {
			baseDataService.getDetail(2).then((data: ITestMock): void => {
				expect(data).to.equal(dataSet[1]);
				done();
			});

			$rootScope.$digest();
		});

		it('should create an item and assign an id to it', (done: MochaDone): void => {
			let newItem: ITestMock = { id: null, prop: 'item4' };

			baseDataService.create(newItem).then((data: ITestMock): void => {
				expect(data.prop).to.equal(newItem.prop);
				expect(data.id).to.equal(4);
				done();
			});

			$rootScope.$digest();

			expect(dataSet[3].prop).to.equal(newItem.prop);
			expect(dataSet[3].id).to.equal(4);
		});

		it('should update an item', (): void => {
			let updatedItem: ITestMock = { id: 2, prop: 'made changes' };

			baseDataService.update(updatedItem);

			$rootScope.$digest();

			expect(dataSet[1].prop).to.equal('made changes');
		});

		it('should delete an item', (): void => {
			baseDataService.delete(dataSet[1]);

			$rootScope.$digest();

			expect(dataSet).to.have.length(2);
			expect(dataSet[0].id).to.equal(1);
			expect(dataSet[1].id).to.equal(3);
		});
	});

	describe('transform', (): void => {
		let $rootScope: angular.IRootScopeService;
		let dataSet: ITestMock[];
		let transform: Sinon.SinonSpy;

		beforeEach((): void => {
			dataSet = [
				{ id: 1, prop: 'item1' },
				{ id: 2, prop: 'item2' },
				{ id: 3, prop: 'item3' },
			];

			let services: any = angularFixture.inject(factoryName, '$rootScope');
			let baseDataServiceFactory: IBaseDataServiceFactory = services[factoryName];
			$rootScope = services.$rootScope;

			transform = sinon.spy((rawData: ITestMock): string => {
				return rawData.prop;
			});

			baseDataService = baseDataServiceFactory.getInstance<ITestMock, void>(null, dataSet, transform, true);
		});

		it('should transform each entry in the list', (done: MochaDone): void => {
			baseDataService.getList().then((data: ITestMock[]): void => {
				expect(data).to.have.length(3);
				expect(data[0]).to.equal(dataSet[0].prop);
				expect(data[1]).to.equal(dataSet[1].prop);
				expect(data[2]).to.equal(dataSet[2].prop);
				sinon.assert.calledThrice(transform);
				done();
			});

			$rootScope.$digest();
		});

		it('should transform the single item', (done: MochaDone): void => {
			baseDataService.getDetail(2).then((data: ITestMock): void => {
				expect(data).to.equal(dataSet[1].prop);
				sinon.assert.calledOnce(transform);
				done();
			});

			$rootScope.$digest();
		});
	});
});
