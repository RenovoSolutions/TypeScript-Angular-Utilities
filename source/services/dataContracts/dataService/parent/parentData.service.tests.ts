import { IBaseDataService } from '../data.service';
import { IBaseDataServiceView } from '../view/dataServiceView';
import { IBaseParentDataService } from './parentData.service';
import { IBaseResourceBuilder, moduleName, serviceName } from '../../resourceBuilder/resourceBuilder.service';

import { angularFixture } from '../../../test/angularFixture';

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

describe('parent data service', () => {
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

		it('should expose a get function', (done: MochaDone): void => {
			(<any>children.testView).get().then((item: ITestMock): void => {
				expect(item).to.equal(dataSet[0]);
				done();
			});
			$rootScope.$digest();
		});

		it('should expose an update function and return the result of the update', (done: MochaDone): void => {
			(<any>children.testView).update(dataSet[0]).then((item: ITestMock): void => {
				expect(item).to.equal(dataSet[0]);
				done();
			});
			$rootScope.$digest();
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
