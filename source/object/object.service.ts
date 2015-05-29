/// <reference path="../../typings/lodash/lodash.d.ts" />

'use strict';

export var name: string = 'objectUtility';

export interface IObjectUtility {
	isNullOrEmpty(object: any[]): boolean;
	isNullOrEmpty(object: number): boolean;
	isNullOrEmpty(object: string): boolean;
	isNullOrEmpty(object: any): boolean;
	isNullOrWhitespace(object: any[]): boolean;
	isNullOrWhitespace(object: number): boolean;
	isNullOrWhitespace(object: string): boolean;
	isNullOrWhitespace(object: any): boolean;
}

export class ObjectUtility implements IObjectUtility {
	isNullOrEmpty(object: any): boolean {
		if (object == null) {
			return true;
		} else if (_.isArray(object)) {
			return _.any(object) === false;
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
}
