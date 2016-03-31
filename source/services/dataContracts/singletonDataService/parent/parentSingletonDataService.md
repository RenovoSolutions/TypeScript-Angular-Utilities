## Parent Singleton Data service
Specifies a data contract that points to a single object on the server that is part of a hierarchy.

Extends [singletonDataService](../singletonDataService.md).

### Options

`IChildResources`, `resourceDictionaryBuilder`

See [parentDataService](../../dataService/parent/parentDataService.md) for details on the parent options.

`endpoint`, `interface`, `useMock`, `logRequests`, `searchParams`, `transform`.

See [dataContract](../../baseDataService.md) for details on the base options.

### Interface
The following functions are available for consumers of the parent singleton data service.

`childContracts`. See [parentDataService](../../dataService/parent/parentDataService.md).

`get`, `update`, `version`.

See [singletonDataService](../singletonDataService.md) for details on the base options.
