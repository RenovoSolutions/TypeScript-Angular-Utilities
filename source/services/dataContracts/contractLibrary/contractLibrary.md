## Contract library
A base class that aids in building up resources into a library of data services. A base class that provides tooling for mocking data contracts for unit testing.

See [resourceBuilder](../resourceBuilder/resourceBuilder.md) for example usage.

### Interface

#### `baseEndpoint`
Configures the base url of the contract library. If a base endpoint is set, the library will handle setting the full url of its resources by default.

`createResource`, `createResourceView`, `createParentResource`, `createParentResourceView`, `createSingletonResource`, `createParentSingletonResource`.

See [resourceBuilder](../resourceBuilder/resourceBuilder.md) for details on the options. If the resources are build up through the contract library, the library will automatically handle building the url of the resource based on the base url that is provided for the contract library.

### Testing
The following functions are available for building mocks against the contract library.

#### `mockGet`
`mockGet(resource: any, data: any): Sinon.SinonSpy`<br/>
`mockGetList(resource: any, data[]: any): Sinon.SinonSpy`<br/>
`mockGetDetail(resource: any, data: any): Sinon.SinonSpy`<br/>
Mock the various get actions available for data services and singleton data services. Returns a spy. The mocked function returns the specified data.

#### `mockChild(parent: any, mockCallback: { (children: any): void }): void`
Wraps the parentDataService `childContracts()` function with an interceptor that allows us to modify the child contracts that are returned. This can be used to substitute in a mock for one of the children.

#### `createMock`
`createMock(resource?: any): IDataServiceMock`<br/>
`createMockParent(resource?: any): IParentDataServiceMock`<br/>
`createMockSingleton(resource?: any): ISingletonDataServiceMock`<br/>
Wraps the specified resource with functions for mocking functions directly against the resource. See [dataServiceMock](#dataservicemock), [parentDataServiceMock](#parentdataservicemock), or [singletonDataServiceMock](#singletondataservicemock) for details.

### dataServiceMock

`mockGetList(data[]: any): Sinon.SinonSpy`<br/>
`mockGetDetail(data: any): Sinon.SinonSpy`<br/>
See [`mockGet`](#mockget). Uses the resource instance so no resource must be specified.

#### `mockWrite`
`mockUpdate(): Sinon.SinonSpy`<br/>
`mockCreate(): Sinon.SinonSpy`<br/>
Mocks the update` and `create` actions with a function that returns the data provided to it. Returns a spy.

### parentDataServiceMock

Extends [dataServiceMock](#dataservicemock) with the ability to mock children.

#### `mockChild(mockCallback: { (children: any): void }): void`
See [`mockChild`](mockchildparent-any-mockcallback-children-any-void-void). Uses the resource instance so no parent must be specified.

### singletonDataServiceMock

#### `mockGet(data: any): Sinon.SinonSpy`
See [`mockGet`](#mockget). Uses the resource instance so no resource must be specified.

#### `mockUpdate(): Sinon.SinonSpy`
See [`mockWrite`](#mockwrite).