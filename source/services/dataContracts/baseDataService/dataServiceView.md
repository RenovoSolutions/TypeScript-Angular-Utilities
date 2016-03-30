## Data service view
This is a special use case for a child resource that is a `view` of the parent. If a specific parent is selected, the `view` is treated as a singleton. Otherwise, it is treated as a standard resource.

See [dataService](./dataService.md) and [singletonDataService](../baseSingletonDataService/singletonDataService.md) for details on each resource type.

### Example
Data service view:
```
export let endpoint: string = '/permissions';

export interface IUserPermissions {
	financial: ICRUDPermissions;
}

export interface ICRUDPermissions {
	create: boolean;
	read: boolean;
	edit: boolean;
	delete: boolean;
}
```
Definition in the parent (see [parentDataService](../baseParentDataService/parentDataService.md) for details on how to define a parent data service):
```
import { services } from 'typescript-angular-utilities';
import __dataContracts = services.dataContracts;

import * as permissions from './permissions';

export { permissions };

export interface IChildResources {
	permissions: __dataContracts.IDataServiceView<permissions.IUserPermissions, void>;
}

export function buildChildResources(baseResourceBuilder: __dataContracts.IBaseResourceBuilder): { (): IChildResources } {
	return (): IServiceEventChildResources => {
		return {
			permissions: baseResourceBuilder.createResourceView<permissions.IUserPermissions, void>({
				endpoint: permissions.endpoint,
			}),
		};
	};
}
```
Usage (as a data service):
```
import { services } from 'typescript-angular-utilities';
import __dataContracts = services.dataContracts;

import { DataServices, serviceName as dataServiceName, user } from '../data/data.service';

export class MyConsumer {
	permissionsResource: __dataContracts.IDataService<user.permissions.IUserPermissions, void>;

	static $inject: string[] = [dataServiceName];
	constructor(dataServices: DataServices) {
		// no parent is selected
		this.permissionsResource = dataServices.user.childContract();
	}

	action(): void {
		this.permissionsResource.getList().then((permissions: user.permissions.IUserPermissions[]): void => {
			console.log(permissions);
		});
	}
}
```
Usage (as a singleton data service):
```
import { services } from 'typescript-angular-utilities';
import __dataContracts = services.dataContracts;

import { DataServices, serviceName as dataServiceName, user } from '../data/data.service';

export class MyConsumer {
	permissionsResource: __dataContracts.IDataService<user.permissions.IUserPermissions, void>;

	static $inject: string[] = [dataServiceName, 'userId'];
	constructor(dataServices: DataServices, userId: number) {
		// select a parent
		this.permissionsResource = dataServices.user.childContract(userId);
	}

	action(): void {
		this.permissionsResource.get().then((permissions: user.permissions.IUserPermissions): void => {
			console.log(permissions);
		});
	}
}
```