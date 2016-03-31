## Resource builder
A service for building data services using data contract definitions. Used in conjunction with a ContractList class.

Example usage:
```
import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __dataContracts = services.dataContracts;

class DataServices extends __dataContracts.ContractLibrary {
	resource: __dataContracts.IDataService<any, void>;

	static $inject: string[] = [__dataContracts.builderServiceName];
    constructor(baseResourceBuilder: __dataContracts.IBaseResourceBuilder) {
		super(baseResourceBuilder);

		this.resource = baseResourceBuilder.createResource<any, void>({

		});
	}
}
```

See [contractLibrary](./contractLibrary.md) for details on the contract library base class.

### Options

See [dataContract](../baseDataService.md) for details on options for data contracts.

#### `createResource(options: IBaseResourceParams): IDataService`
Build a standard [dataService](../baseDataService/dataService.md).

#### `createResourceView(options: IBaseResourceParams): IDataServiceView`
Build a [dataServiceView](../baseDataService/dataServiceView.md).

#### `createParentResource(options: IParentResourceParams): IParentDataService`
Build a [parentDataService](../baseParentDataService/parentDataService.md).

#### `createParentResourceView(options: IParentResourceParams): IParentDataService`
Build a [parentDataServiceView](../baseDataService/parentDataServiceView.md).

#### `createSingletonResource(options: ISingletonResourceParams): IParentDataService`
Build a [singletonDataService](../baseSingletonDataService/singletonDataService.md).

#### `createParentSingletonResource(options: IParentSingletonResourceParams): IParentDataService`
Build a [parentSingletonDataService](../baseParentSingletonDataService/parentSingletonDataService.md).
