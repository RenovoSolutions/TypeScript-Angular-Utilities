import { converterService } from './converters';

interface ITestMock {
	id?: number;
	prop?: string;
}

interface ITestMock2 {
	id?: number;
	prop1?: number;
	prop2?: number;
}

interface IComplexTestMock {
	id?: number;
	obj: ITestMock2;
}

describe('Converters', () => {
	let transform: any;
	let numberConverter: any;

	beforeEach((): void => {
		transform = {
			fromServer: sinon.spy((rawData: ITestMock): string => {
				return rawData.prop;
			}),
			toServer: sinon.spy((data: string): ITestMock => {
				return {
					prop: data,
				};
			}),
		};

		numberConverter = {
			fromServer: sinon.spy((rawData: number): number => {
				return rawData + 1;
			}),
			toServer: sinon.spy((data: number): number => {
				return data - 1;
			}),
		};
	});

	it('should transform each entry in the list', (): void => {
		let dataSet: ITestMock = [
			{ id: 1, prop: 'item1' },
			{ id: 2, prop: 'item2' },
			{ id: 3, prop: 'item3' },
		];

		let transformedData: string[] = converterService.applyTransform(dataSet, transform, false);

		expect(transformedData).to.have.length(3);
		expect(transformedData[0]).to.equal(dataSet[0].prop);
		expect(transformedData[1]).to.equal(dataSet[1].prop);
		expect(transformedData[2]).to.equal(dataSet[2].prop);
		sinon.assert.calledThrice(transform.fromServer);
	});

	it('should transform a single item', (): void => {
		let item: ITestMock = { prop: 'item1' };
		let transformedItem: string = converterService.applyTransform(item, transform, false);
		expect(transformedItem).to.equal(item.prop);
		sinon.assert.calledOnce(transform.fromServer);
	});

	it('should reverse the transformation if toServer is specified', (): void => {
		let item: string = 'item1';
		let transformedItem: ITestMock = converterService.applyTransform(item, transform, true);
		expect(transformedItem.prop).to.equal(item);
		sinon.assert.calledOnce(transform.toServer);
	});

	it('should use a an object map to transform properties', (): void => {
		let map: any = {
			prop1: numberConverter,
		};

		let item: ITestMock2 = {
			prop1: 4,
			prop2: 4,
		};

		let transformedItem: ITestMock2 = converterService.applyTransform(item, map, false);

		expect(transformedItem.prop1).to.equal(5);
		expect(transformedItem.prop2).to.equal(4);
		sinon.assert.calledOnce(numberConverter.fromServer);
	});

	it('should transform properties in reverse if toServer is specified', (): void => {
		let map: any = {
			prop1: numberConverter,
		};

		let item: ITestMock2 = {
			prop1: 5,
			prop2: 4,
		};

		let transformedItem: ITestMock2 = converterService.applyTransform(item, map, true);

		expect(transformedItem.prop1).to.equal(4);
		expect(transformedItem.prop2).to.equal(4);
		sinon.assert.calledOnce(numberConverter.toServer);
	});

	it('should recursively transform nested object properties', (): void => {
		let map: any = {
			obj: {
				prop1: numberConverter,
			},
		};

		let item: IComplexTestMock = {
			obj: {
				prop1: 4,
				prop2: 4,
			},
		};

		let transformedItem: IComplexTestMock = converterService.applyTransform(item, map, false);

		expect(transformedItem.obj.prop1).to.equal(5);
		expect(transformedItem.obj.prop2).to.equal(4);
		sinon.assert.calledOnce(numberConverter.fromServer);
	});
});
