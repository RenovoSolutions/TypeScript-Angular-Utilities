/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='genericSearchFilter.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.genericSearchFilter {
	'use strict';

	interface ITestObject {
		prop: string;
	}

	interface ITestObject2 {
		prop1?: number;
		prop2?: string;
	}

	interface INestedTestObject {
		nestedObject: ITestObject2;
	}

	describe('genericSearchFilter', () => {
		var genericSearchFilter: IGenericSearchFilter;

		beforeEach(() => {
			angular.mock.module(moduleName);
			var services: any = test.angularFixture.inject(factoryName);
			var genericSearchFilterFactory: IGenericSearchFilterFactory = services[factoryName];
			genericSearchFilter = genericSearchFilterFactory.getInstance();
		});

		it('should include all items if query is null or empty', (): void => {
			genericSearchFilter.searchText = null;

			var object1: ITestObject = {
				prop: 'some string',
			};

			var object2: ITestObject = {
				prop: 'another value',
			};

			expect(genericSearchFilter.filter(object1)).to.be.true;
			expect(genericSearchFilter.filter(object2)).to.be.true;

			genericSearchFilter.searchText = '';
			expect(genericSearchFilter.filter(object1)).to.be.true;
			expect(genericSearchFilter.filter(object2)).to.be.true;
		});

		it('should search the actual data values if they arent objects', (): void => {
			genericSearchFilter.searchText = '2';

			expect(genericSearchFilter.filter(1)).to.be.false;
			expect(genericSearchFilter.filter(2)).to.be.true;
			expect(genericSearchFilter.filter(3)).to.be.false;
			expect(genericSearchFilter.filter(4)).to.be.false;
			expect(genericSearchFilter.filter(5)).to.be.false;
		});

		it('should include items that contain the search string', (): void => {
			genericSearchFilter.searchText = 'my';
			genericSearchFilter.caseSensitive = true;
			var matchingObject1: ITestObject2 = {
				prop2: 'my string',
			};

			var matchingObject2: ITestObject2 = {
				prop1: 5,
				prop2: 'some string with my',
			};

			var objectWithoutSearchString: ITestObject2 = {
				prop1: 2,
			};

			var objectWithDifferentCase: ITestObject2 = {
				prop1: 5,
				prop2: 'MY string',
			};

			expect(genericSearchFilter.filter(matchingObject1)).to.be.true;
			expect(genericSearchFilter.filter(objectWithoutSearchString)).to.be.false;
			expect(genericSearchFilter.filter(matchingObject2)).to.be.true;
			expect(genericSearchFilter.filter(objectWithDifferentCase)).to.be.false;
		});

		it('should include items that contain the search string, case insensitive', (): void => {
			genericSearchFilter.searchText = 'my';
			genericSearchFilter.caseSensitive = false;
			var lowercaseMatch: ITestObject2 = {
				prop2: 'my string',
			};

			var uppercaseMatch: ITestObject2 = {
				prop1: 2.2,
				prop2: 'MY string',
			};

			expect(genericSearchFilter.filter(lowercaseMatch)).to.be.true;
			expect(genericSearchFilter.filter(uppercaseMatch)).to.be.true;
		});

		it('should recursively search the properties of an object', (): void => {
			genericSearchFilter.searchText = 'my';
			genericSearchFilter.caseSensitive = false;
			var objectWithNestedObject: INestedTestObject = {
				nestedObject: {
					prop2: 'my string',
				},
			};

			expect(genericSearchFilter.filter(objectWithNestedObject)).to.be.true;
		});
	});
}
