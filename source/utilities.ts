// uses angularjs

export var name: string = 'rl.utilities';

import * as array from './array/array.module';
import * as contentProvider from './contentProvider/contentProvider.module';
import * as date from './date/date.module';
import * as jquery from './jquery/jquery.module';
import * as number from './number/number.module';
import * as object from './object/object.module';
import * as observable from './observable/observable.module';
import * as parentChildBehavior from './parentChildBehavior/parentChildBehavior.module';
import * as promise from './promise/promise.module';
import * as truncate from './truncate/truncate.module';

angular.module(name, [
	array.name,
	contentProvider.name,
	date.name,
	jquery.name,
	number.name,
	object.name,
	observable.name,
	parentChildBehavior.name,
	promise.name,
	truncate.name,
]);

export {
	array,
	contentProvider,
	date,
	jquery,
	number,
	object,
	observable,
	parentChildBehavior,
	promise,
	truncate
};