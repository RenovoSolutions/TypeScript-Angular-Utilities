import { searchUtility } from './search.service';

interface ITestObject {
	prop: string;
}

interface ITestObject2 {
	prop1?: number;
	prop2?: string;
}

interface INestedTestObject {
	prop?: string;
	nestedObject: ITestObject2;
}

describe('search utility', () => {
	it('should return true for all items if search is null or empty', (): void => {
		let object1: ITestObject = {
			prop: 'some string',
		};

		let object2: ITestObject = {
			prop: 'another value',
		};

		expect(searchUtility.search(object1, null)).to.be.true;
		expect(searchUtility.search(object2, null)).to.be.true;
		expect(searchUtility.search(object1, '')).to.be.true;
		expect(searchUtility.search(object2, '')).to.be.true;
	});

	it('should search the actual data values if they arent objects', (): void => {
		expect(searchUtility.search(1, '2')).to.be.false;
		expect(searchUtility.search(2, '2')).to.be.true;
		expect(searchUtility.search(3, '2')).to.be.false;
		expect(searchUtility.search(4, '2')).to.be.false;
		expect(searchUtility.search(5, '2')).to.be.false;
	});

	it('should include items that contain the search string', (): void => {
		let searchText: string = 'my';
		let caseSensitive: boolean = true;

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

		expect(searchUtility.search(matchingObject1, searchText, caseSensitive)).to.be.true;
		expect(searchUtility.search(objectWithoutSearchString, searchText, caseSensitive)).to.be.false;
		expect(searchUtility.search(matchingObject2, searchText, caseSensitive)).to.be.true;
		expect(searchUtility.search(objectWithDifferentCase, searchText, caseSensitive)).to.be.false;
	});

	it('should include items that contain the search string, case insensitive', (): void => {
		let searchText: string = 'my';
		let caseInsensitive: boolean = false;
		let lowercaseMatch: ITestObject2 = {
			prop2: 'my string',
		};

		let uppercaseMatch: ITestObject2 = {
			prop1: 2.2,
			prop2: 'MY string',
		};

		expect(searchUtility.search(lowercaseMatch, searchText, caseInsensitive)).to.be.true;
		expect(searchUtility.search(uppercaseMatch, searchText, caseInsensitive)).to.be.true;
	});

	it('should recursively search the properties of an object', (): void => {
		let searchText: string = 'my';
		let caseInsensitive: boolean = false;
		let objectWithNestedObject: INestedTestObject = {
			nestedObject: {
				prop2: 'my string',
			},
		};

		expect(searchUtility.search(objectWithNestedObject, searchText, caseInsensitive)).to.be.true;
	});

	describe('tokenized', (): void => {
		it('should match against objects where each token appears at least once', (): void => {
			let searchText: string = 'some text';

			let object1: ITestObject = {
				prop: 'some values ended up with text',
			};

			let objectWithNesting: INestedTestObject = {
				prop: 'some',
				nestedObject: {
					prop2: 'with text',
				},
			};

			let object2: ITestObject = {
				prop: 'some other something',
			};

			expect(searchUtility.tokenizedSearch(object1, searchText)).to.be.true;
			expect(searchUtility.tokenizedSearch(objectWithNesting, searchText)).to.be.true;
			expect(searchUtility.tokenizedSearch(object2, searchText)).to.be.false;
		});

		it('should handle a null search', (): void => {
			let object: ITestObject = {
				prop: 'some values ended up with text',
			};
			expect(searchUtility.tokenizedSearch(object, null)).to.be.true;
		});
	});
});
