import { IGenericSearchFilter, IGenericSearchFilterFactory, moduleName, factoryName } from './genericSearchFilter.service';

import { angularFixture } from '../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

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
		var services: any = angularFixture.inject(factoryName);
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

	it('should include all items if search length is less than minimum', (): void => {
		genericSearchFilter.searchText = 'som';
		genericSearchFilter.minSearchLength = 4;

		var object1: ITestObject = {
			prop: 'some string',
		};

		var object2: ITestObject = {
			prop: 'another value',
		};

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

	describe('serialize', (): void => {
		it('should return the search if the length is greater than or equal to the minimum search length', (): void => {
			genericSearchFilter.searchText = '1234';
			genericSearchFilter.minSearchLength = 4;
			expect(genericSearchFilter.serialize()).to.equal('1234');
		});

		it('should return an empty string if the length is less than the minimum', (): void => {
			genericSearchFilter.searchText = '123';
			genericSearchFilter.minSearchLength = 4;
			expect(genericSearchFilter.serialize()).to.be.null;
		});

		it('should return an empty string if the search is null', (): void => {
			genericSearchFilter.searchText = null;
			expect(genericSearchFilter.serialize()).to.be.null;
		});
	});

	describe('observable', (): void => {
		it('should subscribe to changes to the serialized value', (): void => {
			let valueChangeSpy: Sinon.SinonSpy = sinon.spy();
			genericSearchFilter.searchText = null;
			genericSearchFilter.minSearchLength = 4;

			genericSearchFilter.subscribe(valueChangeSpy);

			genericSearchFilter.searchText = '1234';

			sinon.assert.calledOnce(valueChangeSpy);
			sinon.assert.calledWith(valueChangeSpy, '1234');

			genericSearchFilter.searchText = null;

			sinon.assert.calledTwice(valueChangeSpy);
			sinon.assert.calledWith(valueChangeSpy, null);
		});
	});
});
