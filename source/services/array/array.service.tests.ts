/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='array.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.array {
	'use strict';

	import __test = rl.utilities.services.test;

	interface ITestObj {
		prop: number;
	}

	interface IKeyObj {
		key: string;
	}

	describe('arrayUtility', () => {
		var arrayUtility: IArrayUtility;

		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = __test.angularFixture.inject(serviceName);
			arrayUtility = services[serviceName];
		});

		describe('findIndexOf', (): void => {
			it('should find the index of the first item in array that matches the predicate', (): void => {
				var array: number[] = [1, 2, 3, 4, 5];

				expect(arrayUtility.findIndexOf<number>(array, (item: number): boolean => { return (item % 2) === 0; })).to.equal(1);
				expect(arrayUtility.findIndexOf<number>(array, (item: number): boolean => { return (item > 10); })).to.equal(-1);
			});
		});

		describe('remove', (): void => {
			it('should remove the specified item from the array and return the item', (): void => {
				var array: number[] = [1, 2, 3, 4, 5];

				expect(arrayUtility.remove(array, 3)).to.equal(3);
				expect(array.length).to.equal(4);
				expect(arrayUtility.remove(array, 10)).to.not.exist;
			});

			it('should remove the first item matching the predicate and return it', (): void => {
				var array: number[] = [1, 2, 3, 4, 5];

				expect(arrayUtility.remove(array, (item: number): boolean => { return (item > 3); })).to.equal(4);
				expect(array.length).to.equal(4);
				expect(arrayUtility.remove(array, (item: number): boolean => { return (item > 10); })).to.not.exist;
			});
		});

		describe('replace', (): void => {
			it('should replace an item in the array with another item', (): void => {
				var arrayWithItems: number[] = [3, 5, 7];
				arrayUtility.replace(arrayWithItems, 5, 10);

				expect(arrayWithItems[0]).to.equal(3);
				expect(arrayWithItems[1]).to.equal(10);
				expect(arrayWithItems[2]).to.equal(7);
			});

			it('should do nothing if the item to replace is not found', (): void => {
				var arrayWithItems: number[] = [4, 6, 8];
				arrayUtility.replace(arrayWithItems, 5, 10);

				expect(arrayWithItems[0]).to.equal(4);
				expect(arrayWithItems[1]).to.equal(6);
				expect(arrayWithItems[2]).to.equal(8);
			});
		});

		describe('sum', (): void => {
			it('should sum the values in an array', (): void => {
				var values: number[] = [1, 2, 3, 4, 5];
				expect(arrayUtility.sum(values)).to.equal(15);
			});

			it('should apply a transform to the values before summing them', (): void => {
				var values: ITestObj[] = [{ prop: 1 }, { prop: 4 }, { prop: 7 }];
				var transform: { (item: ITestObj): number } = (item: ITestObj): number => { return item.prop; };
				expect(arrayUtility.sum(values, transform)).to.equal(12);
			});

			it('should return 0 if there are no items to sum', (): void => {
				var values: number[] = [];
				expect(arrayUtility.sum(values)).to.equal(0);
			});
		});

		describe('toDictionary', (): void => {
			it('should convert an array to a dictionary', (): void => {
				var array: IKeyObj[] = [
					{ key: '11' },
					{ key: '12' },
					{ key: '13' },
					{ key: '14' },
					{ key: '15' },
				];

				var dictionary: { [index: string]: IKeyObj }
					= arrayUtility.toDictionary(array, (item: IKeyObj): string => { return item.key; });

				expect(dictionary['11']).to.equal(array[0]);
				expect(dictionary['12']).to.equal(array[1]);
				expect(dictionary['13']).to.equal(array[2]);
				expect(dictionary['14']).to.equal(array[3]);
				expect(dictionary['15']).to.equal(array[4]);
			});
		});
	});
}
