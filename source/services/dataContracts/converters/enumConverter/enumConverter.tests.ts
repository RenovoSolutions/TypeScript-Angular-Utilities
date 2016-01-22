/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { EnumConverter, IConverter } from './enumConverter';
import { ItemList, IItem } from '../../../../types/itemList';

class TestEnum extends ItemList {
	type1: IItem = {
		value: 0,
		name: 'type1',
		display: 'Type 1',
	};
	type2: IItem = {
		value: 1,
		name: 'type2',
		display: 'Type 2',
	};

	constructor() {
		super();

		super.setItems([
			this.type1,
			this.type2,
		]);
	}
}
let testEnum = new TestEnum();
let enumConverter: IConverter<IItem> = new EnumConverter(testEnum);

describe('enumConverter', (): void => {
	it('should get the enum type for the specified value', (): void => {
		expect(enumConverter.fromServer(0)).to.equal(testEnum.type1);
		expect(enumConverter.fromServer(1)).to.equal(testEnum.type2);
	});

	it('should get the value of the enum type', (): void => {
		expect(enumConverter.toServer(testEnum.type1)).to.equal(0);
		expect(enumConverter.toServer(testEnum.type2)).to.equal(1);
	});

	it('should ')
});
