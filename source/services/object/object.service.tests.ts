/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { IObjectUtility, moduleName, serviceName } from './object.service';

import { angularFixture } from '../../services/test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

describe('objectUtility', () => {
	var objectUtility: IObjectUtility;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = angularFixture.inject(serviceName);
		objectUtility = services[serviceName];
	});

	describe('isNullOrEmpty', (): void => {
		it('should return true when null', (): void => {
			expect(objectUtility.isNullOrEmpty(null)).to.be.true;
		});

		it('should return true when empty', (): void => {
			expect(objectUtility.isNullOrEmpty('')).to.be.true;
		});

		it('should return false when string has contents', (): void => {
			expect(objectUtility.isNullOrEmpty('random string')).to.be.false;
		});

		it('should return true for null or empty arrays', (): void => {
			expect(objectUtility.isNullOrEmpty(null)).to.be.true;
			expect(objectUtility.isNullOrEmpty([])).to.be.true;
			expect(objectUtility.isNullOrEmpty([1, 2, 3])).to.be.false;
		});

		it('should return true if number type is not a number', (): void => {
			expect(objectUtility.isNullOrEmpty(Number.NaN)).to.be.true;
			expect(objectUtility.isNullOrEmpty(5)).to.be.false;
		});
	});

	describe('isNullOrWhitespace', (): void => {
		it('should return true for empty whitespace strings', (): void => {
			expect(objectUtility.isNullOrWhitespace('   ')).to.be.true;
		});

		it('should handle null and empty objects like isNullOrEmpty', (): void => {
			expect(objectUtility.isNullOrWhitespace(null)).to.equal(objectUtility.isNullOrEmpty(null));
			expect(objectUtility.isNullOrWhitespace([])).to.equal(objectUtility.isNullOrEmpty([]));
			expect(objectUtility.isNullOrWhitespace({})).to.equal(objectUtility.isNullOrEmpty({}));
			expect(objectUtility.isNullOrWhitespace('')).to.equal(objectUtility.isNullOrEmpty(''));
			expect(objectUtility.isNullOrWhitespace('random string')).to.equal(objectUtility.isNullOrEmpty('random string'));
		});
	});

	describe('areEqual', (): void => {
		it('should return true if two primitives are equal', (): void => {
			var string1: string = 'abc';
			var string2: string = 'abc';
			var num1: number = 1;
			var num2: number = 1;
			expect(objectUtility.areEqual(string1, string2)).to.be.true;
			expect(objectUtility.areEqual(num1, num2)).to.be.true;
		});

		it('should return false if two objects are not of the same type', (): void => {
			var string: string = 'abc';
			var num: number = 1;
			var obj: any = {};
			var array: any[] = [];
			expect(objectUtility.areEqual(string, num)).to.be.false;
			expect(objectUtility.areEqual(string, obj)).to.be.false;
			expect(objectUtility.areEqual(string, array)).to.be.false;
			expect(objectUtility.areEqual(num, obj)).to.be.false;
			expect(objectUtility.areEqual(num, array)).to.be.false;
			//obj and array are considered the same type
		});

		it('should return false if one object is valid and the other is null', (): void => {
			var obj: any = { '1': 1, '2': 2 };
			expect(objectUtility.areEqual(obj, null)).to.be.false;
		});

		it('should return false these objects are not equal', ():void => {
			let object1 = {
				name: 'objectName',
				date: new Date('1/1/1901')
			};
			let object2 = {
				name: 'objectName',
				date:new Date('1/1/1901')
			}

			expect(objectUtility.areEqual(object1, object2)).to.be.true;

			object2.date = new Date('1/2/1901');
			expect(objectUtility.areEqual(object1, object2)).to.be.false;
		});

		it('should return false if arrays have different lengths', (): void => {
			var array1: number[] = [1, 2, 3, 4, 5];
			var array2: number[] = [1, 2, 3];
			expect(objectUtility.areEqual(array1, array2)).to.be.false;
		});

		it('should compare arrays by element if they are the same length', (): void => {
			var array: number[] = [1, 2, 3, 4, 5];
			var similarArray: number[] = [1, 2, 3, 4, 5];
			var differentArray: number[] = [5, 4, 3, 2, 1];
			expect(objectUtility.areEqual(array, similarArray)).to.be.true;
			expect(objectUtility.areEqual(array, differentArray)).to.be.false;
		});

		it('should use the keys from the first object to compare properties', (): void => {
			var object: any = {
				'1': 1,
				'2': 2,
				'3': 3,
			};
			var similarObject: any = {
				'2': 2,
				'3': 3,
				'1': 1,
			};
			var differentObject: any = {
				'1': 1,
				'two': 2,
				'3': 3,
			};
			expect(objectUtility.areEqual(object, similarObject)).to.be.true;
			expect(objectUtility.areEqual(object, differentObject)).to.be.false;
		});

		it('should return false if object 2 has the properties of object 1 with additional properties', (): void => {
			var object1: any = {
				'1': 1,
				'2': 2,
				'3': 3,
			};
			var object2: any = {
				'1': 1,
				'2': 2,
				'3': 3,
				'4': 4,
				'5': 5,
			};
			expect(objectUtility.areEqual(object1, object2)).to.be.false;
		});

		it('should recursively compare nested objects', (): void => {
			var object: any = {
				nestedObj: {
					'1': 1,
					'2': 2,
				},
				nestedArray: [1, 2, 3],
				'3': 3,
			};
			var similarObject: any = {
				nestedObj: {
					'1': 1,
					'2': 2,
				},
				nestedArray: [1, 2, 3],
				'3': 3,
			};
			var differentObject1: any = {
				nestedObj: {
					'one': 1,
					'two': 2,
				},
				nestedArray: [1, 2, 3],
				'3': 3,
			};
			var differentObject2: any = {
				nestedObj: {
					'1': 1,
					'2': 2,
				},
				nestedArray: [1, 2, 3, 4, 5],
				'3': 3,
			};
			expect(objectUtility.areEqual(object, similarObject)).to.be.true;
			expect(objectUtility.areEqual(object, differentObject1)).to.be.false;
			expect(objectUtility.areEqual(object, differentObject2)).to.be.false;
		});
	});

	describe('toString', (): void => {
		it('should turn numbers into strings', (): void => {
			expect(objectUtility.toString(5)).to.equal('5');
			expect(objectUtility.toString(2.5)).to.equal('2.5');
		});

		it('should turn booleans into strings', (): void => {
			expect(objectUtility.toString(false)).to.equal('false');
			expect(objectUtility.toString(true)).to.equal('true');
		});

		it('should turn undefined and null into strings', (): void => {
			expect(objectUtility.toString(undefined)).to.equal('undefined');
			expect(objectUtility.toString(null)).to.equal('null');
		});
	});

	describe('valueOrDefault', (): void => {
		it('should return the value if it is defined', (): void => {
			var someObject: any = { existingProperty: 'value' };
			expect(objectUtility.valueOrDefault(someObject.existingProperty, 'default')).to.equal('value');
		});

		it('should return the default if the value is not defined', (): void => {
			var someObject: any = { nullProperty: null };
			expect(objectUtility.valueOrDefault(someObject.nullProperty, 'default')).to.equal('default');
			expect(objectUtility.valueOrDefault(someObject.missingProperty, 'default')).to.equal('default');
		});
	});
});
