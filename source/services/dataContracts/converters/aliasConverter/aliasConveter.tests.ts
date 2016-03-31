import { AliasConverter } from './aliasConverter';

describe('aliasConverter', (): void => {
	let aliasConverter: AliasConverter<string>;

	beforeEach((): void => {
		aliasConverter = new AliasConverter<string>('propValue');
	});

	it('should get the property from the parent context using the specified property name', (): void => {
		let parent: any = { propValue: 'value' };
		expect(aliasConverter.fromServer(undefined, parent)).to.equal('value');
	});

	it('should set the value on the parent context using the specified property name', (): void => {
		let parent: any = {};
		aliasConverter.toServer('value', parent);
		expect(parent.propValue).to.equal('value');
	});

	it('should return null if alias property doesnt exist on the parent', (): void => {
		let parent: any = {};
		expect(aliasConverter.fromServer(undefined, parent)).to.be.null;
	});

	it('should apply another converter to the aliased property', (): void => {
		let testConverter: any = {
			fromServer: sinon.spy(),
			toServer: sinon.spy(),
		};

		aliasConverter = new AliasConverter<string>('propValue', testConverter);

		let parent: any = { propValue: 'value' };

		aliasConverter.fromServer(undefined, parent);

		sinon.assert.calledOnce(testConverter.fromServer);
		sinon.assert.calledWith(testConverter.fromServer, 'value');

		aliasConverter.toServer('value', parent);

		sinon.assert.calledOnce(testConverter.toServer);
		sinon.assert.calledWith(testConverter.toServer, 'value');
	});
});
