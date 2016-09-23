import * as _ from 'lodash';

import { IDataService } from '../data.service';
import { IDataServiceView } from '../view/dataServiceView';
import { IParentDataService } from './parentData.service';
import { IResourceBuilder, ResourceBuilder } from '../../resourceBuilder/resourceBuilder.service';

interface ITestResourceDictionaryType {
	testView: IDataServiceView<ITestMock, void>;
	test: IDataService<ITestMock, void>;
}

interface ITestMock {
	id: number;
	prop: string;
}

describe('parent data service', () => {
	let parentDataService: IParentDataService<any, void, ITestResourceDictionaryType>;
	let resourceBuilder: IResourceBuilder;
	let dataSet: ITestMock[];
	let dataService: IDataService<ITestMock, void>;
	let dataServiceView: IDataServiceView<ITestMock, void>;

	beforeEach((): void => {
		dataSet = [
			{ id: 1, prop: 'item1' },
			{ id: 2, prop: 'item2' },
			{ id: 3, prop: 'item3' },
		];

		resourceBuilder = new ResourceBuilder(<any>{}, <any>{});

		dataService = resourceBuilder.createResource<ITestMock, void>({
			mockData: dataSet,
			useMock: true,
		});
		dataServiceView = resourceBuilder.createResourceView<ITestMock, void>({
			mockData: dataSet,
			useMock: true,
		});

		parentDataService = resourceBuilder.createParentResource<any, void, ITestResourceDictionaryType>({
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
			children = parentDataService.childContracts(1);
		});

		it('should expose a get function', (done: MochaDone): void => {
			(<any>children.testView).get().subscribe((item: ITestMock): void => {
				expect(item).to.equal(dataSet[0]);
				done();
			});
		});

		it('should expose an update function and return the result of the update', (done: MochaDone): void => {
			(<any>children.testView).update(dataSet[0]).subscribe((item: ITestMock): void => {
				expect(item).to.equal(dataSet[0]);
				done();
			});
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
