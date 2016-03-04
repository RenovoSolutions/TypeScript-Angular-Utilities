import { transform } from './transform.service';

describe('transform', (): void => {
	it('should call the transform if a function is provided', (): void => {
		let func: Sinon.SinonSpy = sinon.spy((item: any): number => { return item.value; });
		let item: any = { value: 4 };

		expect(transform.getValue(item, func)).to.equal(4);
	});

	it('should use the transform as a key selector if a string is provided', (): void => {
		let item: any = { value: 4 };
		expect(transform.getValue(item, 'value')).to.equal(4);
	});
});