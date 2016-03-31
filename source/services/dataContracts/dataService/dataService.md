## Data service
This is the base use case for defining a new contract. Simple resources support basic getList, getDetail, create, update, and delete requests.

### Options

#### `useDeepSearch (default: false)`
If true, `getList` will make a POST request to send the search params along with the request body. The return data will be expected to be wrapped in a return object, as specified by generic typing

`endpoint`, `interface`, `mockData`, `useMock`, `logRequests`, `searchParams`, `transform`.

See [dataContract](../baseDataService.md) for details on the base options.

### Interface
The following functions are available for consumers of the data service.

#### `getList(params?: TSearchParams): angular.IPromise<TDataType[]>`
Makes a GET request against the base endpoint with optional search params appended to the query string. If `useDeepSearch` is specified, use a POST request instead. The return signature is typed with `TReturnType` to accomodate indlucing other data, such as a `count`.

#### `getDetail(id: number): angular.IPromise<TDataType>`
Makes a GET request against `/endpoint/:id` to get a single item.

#### `create(domainObject: TDataType): angular.IPromise<TDataType>`
Makes a POST request against the base endpoint to create a new item. Returns the new item after creation.

#### `update(domainObject: TDataType): angular.IPromise<TDataType>`
Makes a PUT request against `/endpoint/:id` to update an existing item. Returns the updated item.

#### `delete(domainObject: TDataType): angular.IPromise<void>`
Makes a DELETE request against `/endpoint/:id` to delete an existing item.

#### `version(versionNumber: number): DataService`
Returns a clone of the data service with the version number injected into the url as `/v{{versionNumber}}` directly after the first `/api`.
