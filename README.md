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

* [array](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/array/array.md)
* [boolean](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/boolean/boolean.md)
* [date](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/date/date.md)
* [dataContracts] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/dataContracts/dataContracts.md)
* [errorHandler] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/errorHandler/errorHandler.md)
* [fileSize] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/fileSize/fileSize.md)
* [genericSearchFilter] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/genericSearchFilter/genericSearchFilter.md)
* [guid] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/guid/guid.md)
* [moment] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/moment/moment.md)
* [notification] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/notification/notification.md)
* [number] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/number/number.md)
* [object](https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/object/object.md)
* [observable] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/observable/observable.md)
* [parentChildBehavior] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/parentChildBehavior/parentChildBehavior.md)
* [promise] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/promise/promise.md)
* [string] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/string/string.md)
* [synchronizedRequests] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/synchronizedRequests/synchronizedRequests.md)
* [test] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/test/test.md)
* [time] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/time/time.md)
* [transform] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/transform/transform.md)
* [validation] (https://github.com/RenovoSolutions/TypeScript-Angular-Utilities/blob/master/source/services/validation/validation.md)

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

## Types
Contains common type definitions or objects.

### compareResult
Contains a simple enumeration describing less than, equal, greater than along with a primitive number comparison function.

### itemList
Can be used to build more descriptive enumerations were each entry contains a value, a machine name (or abbreviation), and a display / pretty name. Extend to build enumeration lists. IItem can also be extended to provide additional meta information on items in the list.

## Building and Testing
Please always test new builds to ensure non-breaking commits and PRs

The primary build scripts are:
### `npm run update`
Installs external libraries and dependencies. Should be run after pulling down code changes.

### `npm run build`
Compiles TypeScript files into JavaScript.

### `npm test` or `npm run test`
Runs the tests.

Use `npm run test.debug` to debug test failures.
`npm run test.tc` uses the TeamCity reporter to print out results for TeamCity.
`npm run test.full` runs the tests in multiple browsers instead of Chrome alone.

### `npm run bundle`
Bundle all of the javascript files together and put in the output folder.

### Combinations
In addition, there are some useful combination tasks:
`npm run update-build`
`npm run build-test`

To perform a full build from scratch, including `update`, `build`, `bundle`, run:
`npm run full-build`

### Watch
Several tasks can be modified with `.watch` in order to watch the file system for changes:
`npm run build.watch`
`npm run build-bundle.watch`
`npm run build-test.watch`

In general, `-` is used to indicate combined / joint tasks; `.` is used to indicate a subtask or a modification or variation of a task.
