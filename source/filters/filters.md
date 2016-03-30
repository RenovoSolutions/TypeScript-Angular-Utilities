## Filters
Specifies a generic interface for filters. Also includes an abstract class for SerializableFilters that provides more complex behavior.

### IFilter
The base filter type is just a predicate that specifies for a given item whether it should be shown or not.

#### `filter(item: TItemType): boolean`
Returns true if the item should be shown.

### IFilterWithCounts
A slightly more advanced filter that checks for a given data set how many items should be visible if the filter is applied.

#### `updateOptionCounts<TItemType>(item: TItemType[]): void`
Sets the counts of the filter and/or any possible filter states we want to check.

### ISerializableFilter
A serializable filter represents a filter where the current value can be serialized to a json object. The base implementation also allows consumers to subscribe for changes to the serialized filter value.

#### `type`
The `type` is used as the key when constructing multiple filters into a collection for making a search request against the server.

#### `serialize(): TFilterData`
Returns the json representation of the current filter value.

#### `subscribe(onValueChange: { (newValue: TFilterData): void }): Rx.Subscriber`
Subscribes to an observable stream with any changes in the filter values.

### SerializableFilter base class
The base class for serializable filters provides functionality for exposing an observable stream of filter values to the consumer. The subclass is responsible for tracking when a change occurs and pushing the change to the stream. He must also provide the filter predicate.

#### `serialize(): TFilterData`
By default, the base class returns the whole filter class as a filter value object. The consumer can override this to provide a more succinct summary of the current selection value.

#### `onChange(force: boolean = true): void`
The filter implementation should call onChange to notify for changes to the filter. The base class will then push these changes to the observable stream. By default, all calls to onChange will be pushed to the stream. If the caller specifies `force: false` then the filter will deep compare the current filter value with the last value pushed to the stream. In this case the new value is only pushed if there are changes.