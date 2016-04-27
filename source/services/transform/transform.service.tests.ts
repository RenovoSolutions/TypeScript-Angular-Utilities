import { TransformService, ITransformService } from './transform.service';

describe('transform', (): void => {
	let valueTransform: Sinon.SinonSpy;
	let transform: ITransformService;

	beforeEach((): void => {
		transform = new TransformService();
		valueTransform = sinon.spy((item: any): number => { return item.value; });
	});

	it('should call the transform if a function is provided', (): void => {
		let item: any = { value: 4 };
		expect(transform.getValue(item, valueTransform)).to.equal(4);
	});

	it('should use the transform as a key selector if a string is provided', (): void => {
		let item: any = { value: 4 };
		expect(transform.getValue(item, 'value')).to.equal(4);
	});

	it('should return null if the item is null', (): void => {
		expect(transform.getValue(null, 'value')).to.be.null;
		expect(transform.getValue(null, valueTransform)).to.be.null;
	});

	it('should return the item if no transform is provided', (): void => {
		let item: any = { value: 4 };
		expect(transform.getValue(item, null)).to.equal(item);
	});
});