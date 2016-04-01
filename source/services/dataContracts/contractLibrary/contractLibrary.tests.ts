import { ContractLibrary } from './contractLibrary';
import { IBaseResourceBuilder, serviceName as resourceBuilderService } from '../resourceBuilder/resourceBuilder.service';
import { DataService } from '../dataService/data.service'

import { moduleName } from '../dataContracts.module';

import { angularFixture } from '../../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

class TestLibrary extends ContractLibrary {
	resource1: DataService<number, void>;

	constructor(resourceBuilder: IBaseResourceBuilder) {
		super(resourceBuilder, 'www.example.com/api');

		this.resource1 = <any>this.createResource<number, void>({
			endpoint: '/test',
		});
	}
}

describe('contractLibrary', (): void => {
	let testLibrary: TestLibrary;

	beforeEach((): void => {
		angular.mock.module(moduleName);

		let services: any = angularFixture.inject(resourceBuilderService);
		testLibrary = new TestLibrary(services[resourceBuilderService]);
	});

	it('should build the url of the resource using the base endpoint', (): void => {
		expect(testLibrary.resource1.endpoint).to.equal('www.example.com/api/test');
	});
});