## genericSearchFilter
A service for performing generic text searching against json objects. Matches the ISerializableFilter interface.

Implements [ISerializableFilter](../../filters/filters.md#ISerializableFilter).

Example usage:
```
import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

class MyConsumer {
    static $inject: string[] = [__genericSearchFilter.factoryName];
    constructor(private searchFilterFactory: __genericSearchFilter.IGenericSearchFilterFactory) { }

	filter(items: any[], search: string): any[] {
        var instance = this.searchFilterFactory.getInstance(); // builds a search filter instance
		instance.searchText = search;
		return _.filter(items, instance.filter);
    }
}
```

#### `searchText`
The current search value of the filter.

#### `minSearchLength (default: 1)`
Sets the minimum number of characters required to perform a search. If the searchText is less than the minimum, no filtering is applied.

#### `caseSensitive (default: false)`
If true, matches search results only where the casing is the same.

#### `filter(item: TItemType): boolean`
Returns true if the search text matches against any field on the item. Always returns true if the searchText is empty or below the minimum.

#### `serialize(): string`
Returns the current search value or null if it's below the minimum allowed.