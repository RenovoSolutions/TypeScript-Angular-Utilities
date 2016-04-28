import { IBooleanUtility, BooleanUtility } from './boolean.service';

describe('booleanUtility', () => {
	var booleanUtility: IBooleanUtility;

	beforeEach(() => {
		booleanUtility = new BooleanUtility();
	});

	describe('toBool', (): void => {
		it('should convert null and undefined to false', (): void => {
			expect(booleanUtility.toBool(null)).to.be.false;
			expect(booleanUtility.toBool(undefined)).to.be.false;
		});

		it('should leave bool values unchanged', (): void => {
			expect(booleanUtility.toBool(false)).to.be.false;
			expect(booleanUtility.toBool(true)).to.be.true;
		});
	});
});
