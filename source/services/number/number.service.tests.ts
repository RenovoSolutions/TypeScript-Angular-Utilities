import { INumberUtility, NumberUtility } from './number.service';

describe('numberUtility', () => {
	var numberUtility: INumberUtility;

	beforeEach(() => {
		numberUtility = new NumberUtility();
	});

	describe('preciseRound', (): void => {
		it('should round 6 to 6', (): void => {
			var roundedNum: number = numberUtility.preciseRound(6, 2);
			expect(roundedNum).to.equal(6);
		});

		it('should round 1.275 to 1.28', (): void => {
			var roundedNum: number = numberUtility.preciseRound(1.275, 2);
			expect(roundedNum).to.equal(1.28);
		});

		it('should round 1.274 to 1.27', (): void => {
			var roundedNum: number = numberUtility.preciseRound(1.274, 2);
			expect(roundedNum).to.equal(1.27);
		});

		it('should round 1.55555555555555555555 to 1.5555555555555555556', (): void => {
			// 20 5's. This is the max precision precise_round is valid for
			var roundedNum: number = numberUtility.preciseRound(1.55555555555555555555, 19);
			expect(roundedNum).to.equal(1.5555555555555555556);
		});

		it('should round 1.999999999999999999999 to 2', (): void => {
			var roundedNum: number = numberUtility.preciseRound(1.999999999999999999999, 20); // 21 9's
			expect(roundedNum).to.equal(2);
		});

		it('should not round 1.111111111111111111111', (): void => {
			var roundedNum: number = numberUtility.preciseRound(1.111111111111111111111, 20); // 21 1's
			expect(roundedNum).to.equal(1.11111111111111111111);	// trimmed 1 from the end
		});
	});

	describe('roundToStep', (): void => {
		it('should round to the nearest 5', (): void => {
			expect(numberUtility.roundToStep(4, 5)).to.equal(5);
			expect(numberUtility.roundToStep(23, 5)).to.equal(25);
			expect(numberUtility.roundToStep(22, 5)).to.equal(20);
		});

		it('should round to a 365 divisible value', (): void => {
			expect(numberUtility.roundToStep(366, 3.65)).to.equal(365);
			expect(numberUtility.roundToStep(367, 3.65)).to.equal(368.65);
			expect(numberUtility.roundToStep(125, 3.65)).to.equal(124.10);
			expect(numberUtility.roundToStep(250, 3.65)).to.equal(248.20);
			expect(numberUtility.roundToStep(10.95, 3.65)).to.equal(10.95);
		});
	});
});
