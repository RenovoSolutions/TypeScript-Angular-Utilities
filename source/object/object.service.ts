// uses typings/angularjs
// uses typings/lodash

module rl.utilities.object {
	'use strict';
	
	export var moduleName: string = 'rl.utilities.object';
	export var serviceName: string = 'objectUtility';
	
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
	
	angular.module(moduleName, [])
		.service(serviceName, ObjectUtility);
}