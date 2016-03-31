## Parent Data service view
Specifies a data contract is a `view` of another resource and also has its own children.

Extends [dataServiceView](./dataServiceView.md).

### Options

`IChildResources`, `resourceDictionaryBuilder`

See [parentDataService](../parent/parentDataService.md) for details on the parent options.

`endpoint`, `interface`, `useMock`, `logRequests`, `searchParams`, `transform`.

See [dataContract](../baseDataService.md) for details on the base options.

### Interface
The following functions are available for consumers of the parent singleton data service.

`childContracts`. See [parentDataService](../parent/parentDataService.md).

`getList`, `getDetail`, `create`, `update`, `delete`, `version`.

See [dataService](../dataService.md) for details on the base options.

#### `Handling children`
Using a parent data service view adds a little bit of complexity when defining children, since the parent itself could be a singleton or a full resource based on whether a grandparent is selected. If the child is a full resource (where the parent has a one-to-many relationship with it) we can still treat it as before. However, if the child is itself a `view`, then we have to handle it a little different. The main thing to remember here is that if a grandparent is selected, when the parent is converted to a singleton the child is likewise converted. Thus the child `view` will be treated as a singleton in either case of whether a grandparent or a direct parent is selected.

Example:
In this example, `user` is a parent resource. The user resource has a child `view` called `settings` that is a parent resource view. Settings has it's own child settings called `privacy`, which refers specifically to the user's privacy settings.

With no parent selected:
```
this.privacyResource = dataServices.user.childContracts().settings.childContract().privacy;

// privacy is treated as a standard data service
this.privacyResource.getList();
this.privacyResource.getDetail(11);
this.privacyResource.create(object);
this.privacyResource.update(object);
this.privacyResource.delete(object);
this.privacyResource.version(2);
```

With parent selected:
```
this.privacyResource = dataServices.user.childContracts().settings.childContracts(11).privacy;

// privacy is treated as a singleton data service
this.privacyResource.get();
this.privacyResource.update(object);
this.privacyResource.version(2);
```

With grandparent selected:
```
this.privacyResource = dataServices.user.childContracts(11).settings.childContracts().privacy;

// privacy is treated as a singleton data service
this.privacyResource.get();
this.privacyResource.update(object);
this.privacyResource.version(2);
```
Note that in this case there are three possible urls that could be generated for getting the privacy settings:
`www.example.com/api/user/settings/privacy/11`,<br/>
`www.example.com/api/user/settings/11/privacy`, and<br/>
`www.example.com/api/user/11/settings/privacy`<br/>
You should verify that the API supports all url forms, or be careful to only use the form that is supported by the api.

See [parentDataService](../parent/parentDataService.md#usecases) for using a `view` against a standard parent resource.<br/>
See [dataServiceView](./dataServiceView.md) for details on how to define a `view`.