import { Injector } from 'angular2/core';

import { ContractLibrary } from './contractLibrary';
import { IResourceBuilder, resourceBuilderToken, RESOURCE_BUILDER_PROVIDER } from '../resourceBuilder/resourceBuilder.service';
import { DataServiceView } from '../dataService/view/dataServiceView';
import { DataService, ParentDataService, ParentSingletonDataService } from '../dataContracts.module';

interface ITestChildResources {
	childResource: DataService<number, void>;
	resourceView: DataServiceView<number, void>;
}

function testChildBuilder(resourceBuilder: IResourceBuilder): { (): ITestChildResources } {
	return (): ITestChildResources => {
		return <any>{
			childResource: resourceBuilder.createResource<number, void>({
				endpoint: '/childResource',
			}),
			resourceView: resourceBuilder.createResourceView<number, void>({
				endpoint: '/resourceView',
			}),
		};
	};
}

class TestLibrary extends ContractLibrary {
	resource1: DataService<number, void>;
	parent1: ParentDataService<number, void, ITestChildResources>;
	parentSingleton: ParentSingletonDataService<number, ITestChildResources>;

	constructor(resourceBuilder: IResourceBuilder) {
		super(resourceBuilder, 'www.example.com/api');

		this.resource1 = <any>this.createResource<number, void>({
			endpoint: '/test',
		});
		this.parent1 = <any>this.createParentResource<number, void, ITestChildResources>({
			endpoint: '/parent1',
			resourceDictionaryBuilder: testChildBuilder(resourceBuilder),
		});
		this.parentSingleton = <any>this.createParentResourceView<number, void, ITestChildResources>({
			endpoint: '/parentSingleton',
			resourceDictionaryBuilder: testChildBuilder(resourceBuilder),
		});
	}
}

describe('contractLibrary', (): void => {
	let testLibrary: TestLibrary;
	let resourceBuilder: IResourceBuilder;

	beforeEach((): void => {
		const injector: Injector = (<any>Injector).resolveAndCreate([RESOURCE_BUILDER_PROVIDER]);
		testLibrary = new TestLibrary(injector.get(resourceBuilderToken));
	});

	describe('urls', (): void => {
		it('should build the url of the resource using the base endpoint', (): void => {
			expect(testLibrary.resource1.endpoint).to.equal('/test');
			expect(testLibrary.resource1.url).to.equal('www.example.com/api/test');
		});

		it('should default to the endpoint if the builder is used directly', (): void => {
			testLibrary.resource1 = <any>resourceBuilder.createResource<number, void>({
				endpoint: '/test',
			});
			expect(testLibrary.resource1.url).to.equal('/test');
		});

		it('should build the child url from the parent', (): void => {
			expect(testLibrary.parent1.childContracts().childResource.url).to.equal('www.example.com/api/parent1/childResource');
			expect(testLibrary.parent1.childContracts().resourceView.url).to.equal('www.example.com/api/parent1/resourceView');
			expect(testLibrary.parentSingleton.childContracts().childResource.url).to.equal('www.example.com/api/parentSingleton/childResource');
			expect(testLibrary.parentSingleton.childContracts().resourceView.url).to.equal('www.example.com/api/parentSingleton/resourceView');
		});

		it('should append the id of the parent if a parent is selected', (): void => {
			expect(testLibrary.parent1.childContracts(11).childResource.url).to.equal('www.example.com/api/parent1/11/childResource');
			expect(testLibrary.parent1.childContracts(11).resourceView.url).to.equal('www.example.com/api/parent1/11/resourceView');
		});
	});
});