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
});
