## Singleton Data service
Specifies a data contract that points to a single object on the server. Supports get and update requests.

### Options

#### `mockData`
`mockData` functions the same as the default `mockData` option except that only a single object is provided.

`endpoint`, `interface`, `useMock`, `logRequests`, `searchParams`, `transform`.

See [dataContract](../baseDataService.md) for details on the base options.

### Interface
The following functions are available for consumers of the singleton data service.

#### `get(): angular.IPromise<TDataType>`
Makes a GET request against the base endpoint.

#### `update(domainObject: TDataType): angular.IPromise<TDataType>`
Makes a PUT request against the base endpoint to update the item. Returns the updated item.

#### `version(versionNumber: number): SingletonDataService`
Returns a clone of the data service with the version number injected into the url as `/v{{versionNumber}}` directly after the first `/api`.
