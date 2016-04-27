import { IGenericSearchFilter, IGenericSearchFilterFactory, genericSearchFilterFactory } from './genericSearchFilter.service';

import { objectUtility } from '../object/object.service';
import { stringUtility } from '../string/string.service';

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
	let genericSearchFilter: IGenericSearchFilter;

	beforeEach(() => {
		const factory: IGenericSearchFilterFactory = genericSearchFilterFactory(objectUtility, stringUtility);
		genericSearchFilter = factory.getInstance();
	});

	it('should include all items if query is null or empty', (): void => {
		genericSearchFilter.searchText = null;

		let object1: ITestObject = {
			prop: 'some string',
		};

		let object2: ITestObject = {
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

		let object1: ITestObject = {
			prop: 'some string',
		};

		let object2: ITestObject = {
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
		let matchingObject1: ITestObject2 = {
			prop2: 'my string',
		};

		let matchingObject2: ITestObject2 = {
			prop1: 5,
			prop2: 'some string with my',
		};

		let objectWithoutSearchString: ITestObject2 = {
			prop1: 2,
		};

		let objectWithDifferentCase: ITestObject2 = {
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
		let lowercaseMatch: ITestObject2 = {
			prop2: 'my string',
		};

		let uppercaseMatch: ITestObject2 = {
			prop1: 2.2,
			prop2: 'MY string',
		};

		expect(genericSearchFilter.filter(lowercaseMatch)).to.be.true;
		expect(genericSearchFilter.filter(uppercaseMatch)).to.be.true;
	});

	it('should recursively search the properties of an object', (): void => {
		genericSearchFilter.searchText = 'my';
		genericSearchFilter.caseSensitive = false;
		let objectWithNestedObject: INestedTestObject = {
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

	describe('tokenized', (): void => {
		let factory: IGenericSearchFilterFactory;

		beforeEach((): void => {
			factory = genericSearchFilterFactory(objectUtility, stringUtility);
			genericSearchFilter = factory.getInstance(true);
		});

		it('should support tokenized search', (): void => {
			genericSearchFilter.searchText = 'some text';

			let object1: ITestObject = {
				prop: 'some values ended up with text',
			};

			let object2: ITestObject = {
				prop: 'some other something',
			};

			expect(genericSearchFilter.filter(object1)).to.be.true;
			expect(genericSearchFilter.filter(object2)).to.be.false;
		});

		it('should not use tokenized search by default', (): void => {
			genericSearchFilter = factory.getInstance();
			genericSearchFilter.searchText = 'some text';

			let object1: ITestObject = {
				prop: 'some values ended up with text',
			};

			expect(genericSearchFilter.filter(object1)).to.be.false;
		});
	});
});
