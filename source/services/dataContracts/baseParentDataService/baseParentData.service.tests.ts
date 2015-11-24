/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { IBaseDataService } from '../baseDataService/baseData.service';
import { IBaseDataServiceView } from '../baseDataService/baseDataServiceView';
import { IBaseParentDataService } from './baseParentData.service';
import { IBaseResourceBuilder, moduleName, serviceName } from '../baseResourceBuilder/baseResourceBuilder.service';

import { angularFixture } from '../../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

import * as _ from 'lodash';

interface ITestResourceDictionaryType {
	testView: IBaseDataServiceView<ITestMock, void>;
	test: IBaseDataService<ITestMock, void>;
}

interface ITestMock {
	id: number;
	prop: string;
}

describe('base parent data service', () => {
	let baseParentDataService: IBaseParentDataService<any, void, ITestResourceDictionaryType>;
	let baseResourceBuilder: IBaseResourceBuilder;
	let $rootScope: angular.IRootScopeService;
	let dataSet: ITestMock[];
	let dataService: IBaseDataService<ITestMock, void>;
	let dataServiceView: IBaseDataServiceView<ITestMock, void>;

	beforeEach((): void => {
		angular.mock.module(moduleName);

		dataSet = [
			{ id: 1, prop: 'item1' },
			{ id: 2, prop: 'item2' },
			{ id: 3, prop: 'item3' },
		];

		let services: any = angularFixture.inject(serviceName, '$rootScope');
		baseResourceBuilder = services[serviceName];
		$rootScope = services.$rootScope;

		dataService = baseResourceBuilder.createResource<ITestMock, void>({
			mockData: dataSet,
			useMock: true,
		});
		dataServiceView = baseResourceBuilder.createResourceView<ITestMock, void>({
			mockData: dataSet,
			useMock: true,
		});

		baseParentDataService = baseResourceBuilder.createParentResource<any, void, ITestResourceDictionaryType>({
			resourceDictionaryBuilder(): ITestResourceDictionaryType {
				return {
					testView: dataServiceView,
					test: dataService,
				};
			},
		});
	});

	describe('viewAsSingleton', (): void => {
		let children: ITestResourceDictionaryType;

		beforeEach((): void => {
			children = baseParentDataService.childContracts(1);
		});

		it('should wrap the child getDetail function and provide the id', (done: MochaDone): void => {
			sinon.spy(dataServiceView, 'getDetail');
			(<any>children.testView).get().then((item: ITestMock): void => {
				expect(item).to.equal(dataSet[0]);
				done();
			});
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataServiceView.getDetail);
			sinon.assert.calledWith(<Sinon.SinonSpy>dataServiceView.getDetail, 1);
			$rootScope.$digest();
		});

		it('should expose the child update function', (): void => {
			sinon.spy(dataServiceView, 'update');
			(<any>children.testView).update(dataSet[0]);
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataServiceView.update);
			sinon.assert.calledWith(<Sinon.SinonSpy>dataServiceView.update, dataSet[0]);
		});

		it('should disable getList, getDetail, and create', (): void => {
			expect(children.testView.getList).to.not.exist;
			expect(children.testView.getDetail).to.not.exist;
			expect(children.testView.create).to.not.exist;
		});

		it('should leave standard data services untouched', (): void => {
			expect(_.isFunction(children.test.getList)).to.be.true;
			expect(_.isFunction(children.test.getDetail)).to.be.true;
			expect(_.isFunction(children.test.create)).to.be.true;
			expect(_.isFunction(children.test.update)).to.be.true;
			expect((<any>children.test).get).to.not.exist;
		});
	});
});
