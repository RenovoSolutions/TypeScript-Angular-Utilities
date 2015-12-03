# TypeScript-Angular-Utilities
Contains a list of reusable TypeScript libraries, services, and general utilities. These are all defined as angular services and can be injected via the angular dependency injector.

## Behaviors
Angular directives that are applied as attributes to an element in order to modify the element's behavior.
### stopEventPropogation
Absorbs the passed in DOM event so that it will not propogate outside of the current element. Generally useful for restricting click events within an element so that the click events on parent elements are not triggered.
```
<div class="my-parent-div" click="doSomething()">
  <button class="child-button" click="doSomethingDifferent()" stop-event-propogation="click">Click me</button>
</div>
```
## Filters
* Contains Angular filters, which can be applied to bindings using the Angular pipe operator `<span>{{myMoney | currency}}</span>`
* Contains a generic filter interface `IFilter`

### isEmpty
Tests the provided value to see if it is null or empty using the [object](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/README.md#object) utility to call isNullOrEmpty on the value. Returns true if the item is empty. If you specify `isEmpty:false`, returns true for non-empty values.
```
<span ng-if="myArray | isEmpty:false">
  My array has values!
</span>
```

### truncate
Converts the input value to a string using `.toString()` and then limits the length of the string to the truncate length. Can optionally add an ellipses to the end (...).
```
<span>{{myString | truncate:10:true}}</span>
```

## Services
### object
Contains generic utilities for operations on any object.
Contains the following methods:

#### `isNullOrEmpty(object: any): boolean`
Returns true if the object is null.
Returns true if the object is an empty array.
Returns true if the object is NaN.
Returns true if the object is an empty string.

####`isNullOrWhitespace(object: any): boolean`
If the object is a string, first trims it then passes the object into isNullOrEmpty().

####`areEqual(obj1: any, obj2: any): boolean`
Recursively compares all of the properties on the two objects and returns true if they are equal.

####`toString(object: any) string`
Converts any object to a string.

####`valueOrDefault(value: any, defaultValue: any): any`
If the value is not null, returns it, otherwise returns the default value.

### Injecting a service
```
import { services } from 'typescript-angular-utilities';
import objectNamespace = services.object;

export class MyController {
  static $inject: string[] = [objectNamespace.serviceName];
  constructor(private objectService: objectNamespace.IObjectUtility): void {
  }
  
  ...
  
  private testForEmpty(): boolean {
    return this.objectService.isNullOrEmpty(this.someValue);
  }
}

angular.module('moduleName', [objectNamespace.moduleName])
  .controller('controllerName', MyController);
```

## Setup
Clone the repository into your working directory.

Node must be installed.

Install the karma client:
`npm install karma -g`

Install the typescript compiler:
`npm install typescript -g`

Navigate to the root of the repo in a cmd prompt and run:

* `npm run update`

## Building and Testing
Please always test new builds to ensure non-breaking commits and PRs

To build: `npm run build`

To test: `npm test`
To debug tests: `npm run test.debug`
To run tests against additional browsers: `npm run test.full`
