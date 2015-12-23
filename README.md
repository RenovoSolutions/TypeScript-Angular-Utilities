# TypeScript-Angular-Utilities
Contains a list of reusable TypeScript libraries, services, and general utilities. These are all defined as angular services and can be injected via the angular dependency injector.

## Behaviors
Angular directives that are applied as attributes to an element in order to modify the element's behavior.

* [stopEventPropogation](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/behaviors/stopEventPropagation/documentation.md)

## Filters
Contains Angular filters, which can be applied to bindings using the Angular pipe operator `<span>{{myMoney | currency}}</span>`

Contains a generic filter interface `IFilter`

* [isEmpty](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/filters/isEmpty/documentation.md)

* [truncate](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/filters/truncate/documentation.md)

## Services
Contains miscellaneous tools and utilities for working with objects and other useful tasks.

* [object](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/object/object.md)
* [array](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/array/array.md)

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
