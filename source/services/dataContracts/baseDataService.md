## Data contract
Defines a contract with the server for a single REST resource. Contracts can come in several different types, but they all share a set of base options.

### Options

#### `endpoint`
The endpoint of the resource. Generally this should be of the form `/entity`. The rest of the url will be filled in when the contract is wired up. If no endpoint is specified, `useMock` defaults to true.

#### `interface`
The contract should provide a typescript interface representing the data model expected from the server. This can be specified as a generic type against the contract to provide strong typing.

#### `mockData (optional)`
The contract can provide a json mock representing a sample return value from the server. This can be used in place of an actual request to the server for development purposes or for unit tests.

#### `useMock (default: false)`
If true, the contract will return the json mock data instead of making a request to the server.

#### `logRequests (default: false)`
If true, the contract logs all requests to the console, whether mocked or actual. This is useful for debugging, and for using mocks in particular, since no requests will be picked up by the browser.

#### `searchParams`
Another interface that can be used to specify what search parameters can be provided with a GET request to the server.

#### `transform`
An object map specifying how to transform data going to and from the server. Each key may specify a [converters](./converters/converters.md) that can be used to apply the transformation, or a converter for the whole object may be specified. See [converters](./converters/converters.md) for details.

### Example
An example contract definition:
```
import { services } from 'typescript-angular-utilities';
import __converters = services.dataContracts.converters;

export let endpoint: string = '/user';

export interface IUser {
	username: string;
	lastLogin: Date;
}

export interface ISearchParams {
	username?: string;
	isAdmin?: string;
}

export let transform: any = {
	lastLogin: __converters.dateConverter,
};

// alternatively import from a json doc
export let mockData: ICar[] = [
	{ username: 'bobsmith', lastLogin: '2016-3-30T10:30:30' },
	{ username: 'johnjones', lastLogin: '2016-3-15T3:15:45' },
];
```
Implementation:
```
import { services } from 'typescript-angular-utilities';
import __dataContracts = services.dataContracts;

import * as user from './myContract';

export { user };

export class DataServices extends __dataContracts.ContractLibrary {
	user: __dataContracts.IDataService<user.IUser, user.ISearchParams>;

	static $inject: string[] = [__dataContracts.builderServiceName];
	constructor(baseResourceBuilder: __dataContracts.IBaseResourceBuilder) {
		super(baseResourceBuilder);
		// as yet we don't have a way to plug in the base endpoint
		let baseEndpoint: string = 'www.example.com/api';

		this.user = this.createResource<user.IUser, user.ISearchParams>({
			endpoint: baseEndpoint + user.endpoint,
			mockData: user.mockData,
			transform: user.transform,
			useMock: true,
			logRequests: true,
		});
	}
}
```
Usage:
```
import { services } from 'typescript-angular-utilities';
import __dataContracts = services.dataContracts;

import { DataServices, serviceName as dataServiceName, user } from '../data/data.service';

export class MyConsumer {
	userResource: __dataContracts.IDataService<user.IUser, user.ISearchParams>;

	static $inject: string[] = [dataServiceName];
	constructor(dataServices: DataServices) {
		this.userResource = dataServices.user;
	}

	action(search: user.ISearchParams): void {
		this.userResource.getList(search).then((users: IUser[]): void => {
			console.log(users);
		});
	}
}
```