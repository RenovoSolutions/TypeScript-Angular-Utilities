import { SerializableFilter } from './filter';

describe('serializable filter', (): void => {
	let filter: SerializableFilter<any>;

	beforeEach((): void {
		filter = new SerializableFilter();
	});

	it('should provide a default serialize that returns the filter directly', (): void => {
		filter.type = 'myFilter';
		let serializedValue: any = filter.serialize();
		expect(serializedValue).to.be.not.empty;
		expect(serializedValue.type).to.equal('myFilter');
	});

	it('should fire an event every time onChange is called by default', (): void => {
		let onValueChange: Sinon.SinonSpy = sinon.spy();
		filter.subscribe(onValueChange);

		filter.onChange();

		sinon.assert.calledOnce(onValueChange);
	});

	it('should deep compare the new seralized value with the old one if force is set to false', (): void => {
		let obj1: any = { prop: '1234' };
		let obj2: any = { prop: '5678' };
		filter.serialize = (): any => { return obj1; };
		// set the initial value
		filter.onChange();
		let onValueChange: Sinon.SinonSpy = sinon.spy();
		filter.subscribe(onValueChange);

		filter.onChange(false);

		sinon.assert.notCalled(onValueChange);

		filter.serialize = (): any => { return obj2; };
		filter.onChange(false);

		sinon.assert.calledOnce(onValueChange);
	});
});