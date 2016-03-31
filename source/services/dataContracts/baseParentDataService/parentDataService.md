## Parent Data service
Specifies a data contract that points to a resource that is part of a hierarchy.

Extends [dataService](../baseDataService/dataService.md).

### Options

#### `IChildResources`
An interface that specifies the data model of the children. This provides strong typing for accessing child resources.

#### `resourceDictionaryBuilder`
A function that tells the resourceBuilder how to build up the children of the parent resource.

`endpoint`, `interface`, `useMock`, `logRequests`, `searchParams`, `transform`.

See [dataContract](../baseDataService.md) for details on the base options.

### Interface
The following functions are available for consumers of the parent data service.

`getList`, `getDetail`, `create`, `update`, `delete`, `version`.

See [dataService](../baseDataService/dataService.md) for details on the base options.

#### `childContracts(id?: number): TResourceDictionaryType`
Returns the children of the data service. If an id is provided, the children are scoped to a single parent object.

##### **Handling urls**
Unlike the base library itself, parent data services handle the details of building up the url of the children. The format of the child url depends on whether a parent was selected by passing an id to the `childContracts()` function, or the child is scoped against the whole parent resource. If a parent is selected, the url is constructed as `/parentUrl/:id/childEndpoint`. Otherwise the url is constructed as `/parentUrl/childEndpoint`.

Example:
For this example, the parent is a user resource, with endpoint `/user` appended to a base url of `www.example.com/api`. The child is a settings resource with endpoint `/settings`.

With no parent selected:
```
this.settingsResource = dataServices.user.childContracts().settings;
```
The url of the settings resource in this case is `www.example.com/api/user/settings`.

With parent selected:
```
this.settingsResource = dataServices.user.childContracts(11).settings;
```
The url of the settings resource in this case is `www.example.com/api/user/11/settings`.

##### **Use cases**
There are two main use cases for child resources. The first is where the parent has a one-to-many relationship with the child. In this case, the child resource is a fully qualified rest resource whether it is scoped against a single parent, or the parent resource as a whole. In the other case, the child resource is a subset or `view` of the parent resource. In this case, if the the resource is scoped against a single parent, the child resource is treated as a singleton.

Example:
The parent is a `user` resource, with a child resource representing `settings` for that user.

With no parent selected:
```
this.settingsResource = dataServices.user.childContracts().settings;

// settings is treated as a standard data service
this.settingsResource.getList();
this.settingsResource.getDetail(11);
this.settingsResource.create(object);
this.settingsResource.update(object);
this.settingsResource.delete(object);
this.settingsResource.version(2);
```

With parent selected:
```
this.settingsResource = dataServices.user.childContracts(11).settings;

// settings is treated as a singleton data service
this.settingsResource.get();
this.settingsResource.update(object);
this.settingsResource.version(2);
```
Note that in this case a single settings entry may be accessed either via:
```
dataServices.user.childContracts().settings.getDetail(11)
// url www.example.com/api/user/settings/11
```
Or:
```
dataServices.user.childContracts(11).settings.get()
// url www.example.com/api/users/11/settings
```
You should verify that the API supports both url forms, and if not, be careful to only use the form that is supported by the API.

See [dataServiceView](../baseDataService/dataServiceView.md) for details on how to define a `view`.