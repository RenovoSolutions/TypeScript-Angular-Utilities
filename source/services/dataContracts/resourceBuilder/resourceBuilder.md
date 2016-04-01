## Resource builder
A service for building data services using data contract definitions. Used in conjunction with a ContractList class. This is primarily used to build functionality into the ContractLibrary base class. It's advisable to use the base class instance when building resources, as this will provide the ability to automatically build in the base url.

Example usage:
```
import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __dataContracts = services.dataContracts;

class DataServices extends __dataContracts.ContractLibrary {
	resource1: __dataContracts.IDataService<any, void>;
	resource2: __dataContracts.IDataService<any, void>;

	static $inject: string[] = [__dataContracts.builderServiceName];
    constructor(baseResourceBuilder: __dataContracts.IBaseResourceBuilder) {
		super(baseResourceBuilder, 'www.example.com/api');

		// using the builder directly
		this.resource1 = baseResourceBuilder.createResource<any, void>({
			// base url has to be specified by hand
			endpoint: 'www.example.com/api' + '/test',
		});

		// using the base class - recommended
		this.resource2 = this.createResource<any, void>({
			// base url is injected automatically
			endpoint: '/test',
		});
	}
}
```

See [contractLibrary](../contractLibrary/contractLibrary.md) for details on the contract library base class.

### Options

See [dataContract](../baseDataService.md) for details on options for data contracts.

#### `createResource(options: IBaseResourceParams): IDataService`
Build a standard [dataService](../dataService/dataService.md).

#### `createResourceView(options: IBaseResourceParams): IDataServiceView`
Build a [dataServiceView](../dataService/view/dataServiceView.md).

#### `createParentResource(options: IParentResourceParams): IParentDataService`
Build a [parentDataService](../dataService/parent/parentDataService.md).

#### `createParentResourceView(options: IParentResourceParams): IParentDataService`
Build a [parentDataServiceView](../dataService/view/parentDataServiceView.md).

#### `createSingletonResource(options: ISingletonResourceParams): IParentDataService`
Build a [singletonDataService](../singletonDataService/singletonDataService.md).

#### `createParentSingletonResource(options: IParentSingletonResourceParams): IParentDataService`
Build a [parentSingletonDataService](../singletonDataService/parent/parentSingletonDataService.md).
