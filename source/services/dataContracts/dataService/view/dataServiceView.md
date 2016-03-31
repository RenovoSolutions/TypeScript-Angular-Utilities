## Data service view
This is a special use case for a child resource that is a `view` of the parent. If a specific parent is selected, the `view` is treated as a singleton. Otherwise, it is treated as a standard resource.

See [dataService](../dataService.md) and [singletonDataService](../../singletonDataService/singletonDataService.md) for details on each resource type.

### Example
Data service view:
```
export let endpoint: string = '/settings';

export interface IUserSettings {
	theme: string;
}
```
Definition in the parent (see [parentDataService](../parent/parentDataService.md) for details on how to define a parent data service):
```
import { services } from 'typescript-angular-utilities';
import __dataContracts = services.dataContracts;

import * as settings from './settings';

export { settings };

export interface IChildResources {
	settings: __dataContracts.IDataServiceView<settings.IUserSettings, void>;
}

export function buildChildResources(baseResourceBuilder: __dataContracts.IBaseResourceBuilder): { (): IChildResources } {
	return (): IServiceEventChildResources => {
		return {
			settings: baseResourceBuilder.createResourceView<settings.IUserSettings, void>({
				endpoint: settings.endpoint,
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
	settingsResource: __dataContracts.IDataService<user.settings.IUserSettings, void>;

	static $inject: string[] = [dataServiceName];
	constructor(dataServices: DataServices) {
		// no parent is selected
		this.settingsResource = dataServices.user.childContract();
	}

	action(): void {
		this.settingsResource.getList().then((settings: user.settings.IUserSettings[]): void => {
			console.log(settings);
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
	settingsResource: __dataContracts.IDataService<user.settings.IUserSettings, void>;

	static $inject: string[] = [dataServiceName, 'userId'];
	constructor(dataServices: DataServices, userId: number) {
		// select a parent
		this.settingsResource = dataServices.user.childContract(userId).settings;
	}

	action(): void {
		this.settingsResource.get().then((settings: user.settings.IUserSettings): void => {
			console.log(settings);
		});
	}
}
```