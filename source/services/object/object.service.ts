import { Inject, Injectable, OpaqueToken, Provider } from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';

import {
	IArrayUtility,
	arrayToken,
	arrayUtility,
} from '../array/array.service';

import {
	IDateUtility,
	dateToken,
	dateUtility,
} from '../date/date.module';

export interface IObjectUtility {
	isNullOrEmpty(object: any[]): boolean;
	isNullOrEmpty(object: number): boolean;
	isNullOrEmpty(object: string): boolean;
	isNullOrEmpty(object: any): boolean;
	isNullOrWhitespace(object: any[]): boolean;
	isNullOrWhitespace(object: number): boolean;
	isNullOrWhitespace(object: string): boolean;
	isNullOrWhitespace(object: any): boolean;
	areEqual(obj1: any, obj2: any): boolean;
	toString(object: any): string;
	valueOrDefault(value: any, defaultValue: any): any;
	propertyNameToString(propertyFunction: () => any): string;

}

@Injectable()
export class ObjectUtility implements IObjectUtility {
	private array: IArrayUtility;
	private dateUtility: IDateUtility;

	constructor(@Inject(arrayToken) array: IArrayUtility, @Inject(dateToken) dateUtility: IDateUtility) {
		this.array = array;
		this.dateUtility = dateUtility;
	}

	isNullOrEmpty(object: any): boolean {
		if (object == null) {
			return true;
		} else if (_.isArray(object)) {
			return _.some(object) === false;
		} else if (_.isNumber(object)) {
			return _.isNaN(object);
		} else {
			return object === '';
		}
	}

	isNullOrWhitespace(object: any): boolean {
		if (_.isString(object)) {
			object = (<string>object).trim();
		}

		return this.isNullOrEmpty(object);
	}

	areEqual(obj1: any, obj2: any): boolean {
		var type1: string = typeof obj1;
		var type2: string = typeof obj2;

		if (obj1 == null && obj2 == null) {
			return true;
		} else if (obj1 == null || obj2 == null) {
			return false;
		}

		if (type1 !== type2) {
			return false;
		} else if (obj1 instanceof Array) {
			if (obj1.length !== obj2.length) {
				return false;
			}

			for (var i: number = 0; i < obj1.length; i++) {
				if (this.areEqual(obj1[i], obj2[i]) === false) {
					return false;
				}
			}
		} else if (this.areDates(obj1, obj2)) {
			return this.dateUtility.sameDateTime(obj1, obj2);
		} else if (type1 === 'object') {
			//init an object with the keys from obj2
			var keys2: string[] = _.keys(obj2);
			_.forIn(obj1, (value: any, key: string): boolean => {
				if (_.has(obj2, key)) {
					//compare value against the value with the same key in obj2, then remove the key
					if (this.areEqual(value, obj2[key]) === false) {
						return false;
					} else {
						this.array.remove(keys2, key);
					}
				} else {
					return false;
				}
			});
			//if there are still keys left in keys2, we know they are not equal (obj2 has more properties)
			if (_.some(keys2)) {
				return false;
			}
		} else {
			//if types are primitive, do a simple comparison
			return obj1 === obj2;
		}

		return true;
	}

	private areDates(obj1: any, obj2: any): boolean {
		if ((_.isDate(obj1) && _.isDate(obj2))
			|| (moment.isMoment(obj1) && moment.isMoment(obj2))) {
			return true;
		}

		return false;
	}

	toString(object: any): string {
		return object + '';
	}

	valueOrDefault(value: any, defaultValue: any): any {
		if (value != null) {
			return value;
		} else {
			return defaultValue;
		}
	}

	propertyNameToString(propertyFunction: () => any): string {
		let stringValue = propertyFunction.toString();
		let regExpLiteral = /\.([^\.;]+);?\s*\}$/;
		let propertyName =  regExpLiteral.exec(stringValue)[1];
		return propertyName;
	}
}

export let objectUtility: IObjectUtility = new ObjectUtility(arrayUtility, dateUtility);

export const objectToken: OpaqueToken = new OpaqueToken('A utility for working with objects');

export const OBJECT_PROVIDER: Provider = new Provider(objectToken, {
	useClass: ObjectUtility,
});
