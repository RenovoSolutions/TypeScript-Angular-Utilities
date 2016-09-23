import { Subject } from 'rxjs';

import { BaseDataServiceBehavior, ISearchResult } from './baseDataServiceBehavior';

import { arrayUtility } from '../array/array.service';
import { IHttpUtility } from '../http/http.service';

import { IMockedRequest, mock, rlFakeAsync } from '../test/index';

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

describe('base data service behavior', () => {
	let dataServiceBehavior: BaseDataServiceBehavior<ITestMock>;
	let mockHttp: IHttpUtility;

	beforeEach(() => {
		mockHttp = <any>{
			get: null,
			put: null,
			post: null,
			delete: null,
		};
	});

	describe('use http', (): void => {
		let testUrl: string;

		beforeEach((): void => {
			testUrl = '/api/test';

			dataServiceBehavior = new BaseDataServiceBehavior<ITestMock>(mockHttp, null);
		});

		it('should make an http request to get a list of data', rlFakeAsync((): void => {
			const mockList: ITestMock[] = [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 4 },
				{ id: 5 },
			];

			const mockGet: IMockedRequest<ITestMock[]> = mock.request(mockList);
			mockHttp.get = mockGet;

			dataServiceBehavior.getList({
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				getMockData: null,
				params: null,
			}).subscribe((data: ITestMock[]): void => {
				expect(data).to.have.length(5);
				expect(data[0].id).to.equal(1);
				expect(data[1].id).to.equal(2);
				expect(data[2].id).to.equal(3);
				expect(data[3].id).to.equal(4);
				expect(data[4].id).to.equal(5);
			});

			sinon.assert.calledOnce(mockGet);
			sinon.assert.calledWith(mockGet, testUrl, null);

			mockGet.flush();
		}));

		it('should make a POST request to search the data', rlFakeAsync((): void => {
			const mockList: ITestMock[] = [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 4 },
				{ id: 5 },
			];

			const searchObject: ISearchResult<ITestMock> = {
				dataSet: mockList,
			};

			const mockPost: IMockedRequest<ISearchResult<ITestMock>> = mock.request({ dataSet: mockList });
			mockHttp.post = mockPost;

			dataServiceBehavior.search<ISearchResult<ITestMock>>({
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				getMockData: null,
				params: searchObject,
			}).subscribe((result: ISearchResult<ITestMock>): void => {
				let data: ITestMock[] = result.dataSet;
				expect(data).to.have.length(5);
				expect(data[0].id).to.equal(1);
				expect(data[1].id).to.equal(2);
				expect(data[2].id).to.equal(3);
				expect(data[3].id).to.equal(4);
				expect(data[4].id).to.equal(5);
			});

			sinon.assert.calledOnce(mockPost);
			sinon.assert.calledWith(mockPost, testUrl, searchObject);

			mockPost.flush();
		}));

		it('should make an http request to get a domain object', rlFakeAsync((): void => {
			const id: number = 1;
			const mockItem: ITestMock = { id: id };

			const mockGet: IMockedRequest<ITestMock> = mock.request(mockItem);
			mockHttp.get = mockGet;

			dataServiceBehavior.getItem({
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				getMockData: null,
			}).subscribe((data: ITestMock): void => {
				expect(data).to.deep.equal(mockItem);
			});

			sinon.assert.calledOnce(mockGet);
			sinon.assert.calledWith(mockGet, testUrl);

			mockGet.flush();
		}));

		it('should make an http request to create a domain object', rlFakeAsync((): void => {
			const mockItem: ITestMock = { id: 1 };

			const mockPost: IMockedRequest<ITestMock> = mock.request(mockItem);
			mockHttp.post = mockPost;

			dataServiceBehavior.create({
				domainObject: mockItem,
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				addMockData: null,
			}).subscribe((data: ITestMock): void => {
				expect(data).to.deep.equal(mockItem);
			});

			sinon.assert.calledOnce(mockPost);
			sinon.assert.calledWith(mockPost, testUrl, mockItem);

			mockPost.flush();
		}));

		it('should make an http request to save an existing domain object', rlFakeAsync((): void => {
			const mockItem: ITestMock = { id: 1 };

			const mockPut: IMockedRequest<ITestMock> = mock.request(mockItem);
			mockHttp.put = mockPut;

			dataServiceBehavior.update({
				domainObject: mockItem,
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				updateMockData: null,
			}).subscribe((data: ITestMock): void => {
				expect(data).to.deep.equal(mockItem);
			});

			sinon.assert.calledOnce(mockPut);
			sinon.assert.calledWith(mockPut, testUrl, mockItem);

			mockPut.flush();
		}));

		it('should make an http request to delete an existing domain object', rlFakeAsync((): void => {
			const mockItem: ITestMock = { id: 1 };

			const mockDelete: IMockedRequest<void> = mock.request();
			mockHttp.delete = mockDelete;

			dataServiceBehavior.delete({
				domainObject: mockItem,
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				removeMockData: null,
			});

			sinon.assert.calledOnce(mockDelete);
			sinon.assert.calledWith(mockDelete, testUrl);

			mockDelete.flush();
		}));
	});

	describe('use mock', (): void => {
		let dataSet: ITestMock[];

		beforeEach((): void => {
			dataSet = [
				{ id: 1, prop: 'item1' },
				{ id: 2, prop: 'item2' },
				{ id: 3, prop: 'item3' },
			];

			dataServiceBehavior = new BaseDataServiceBehavior<ITestMock>(mockHttp, null);
		});

		it('should get the mocked data set', done => {
			dataServiceBehavior.getList({
				useMock: true,
				getMockData(): ITestMock[] { return dataSet; },
				endpoint: null,
				logRequests: false,
				params: null,
			}).subscribe((data: ITestMock[]): void => {
				expect(data).to.have.length(3);
				expect(data[0]).to.equal(dataSet[0]);
				expect(data[1]).to.equal(dataSet[1]);
				expect(data[2]).to.equal(dataSet[2]);
				done();
			});
		});

		it('should get the mocked data set wrapped in a dataSet property', done => {
			dataServiceBehavior.search<any>({
				useMock: true,
				getMockData(): ITestMock[] { return dataSet; },
				endpoint: null,
				logRequests: false,
				params: null,
			}).subscribe((result: ISearchResult<ITestMock>): void => {
				let data: ITestMock[] = result.dataSet;
				expect(data).to.have.length(3);
				expect(data[0]).to.equal(dataSet[0]);
				expect(data[1]).to.equal(dataSet[1]);
				expect(data[2]).to.equal(dataSet[2]);
				done();
			});
		});

		it('should get an item from the mocked data set', done => {
			dataServiceBehavior.getItem({
				useMock: true,
				getMockData(): ITestMock { return dataSet[1]; },
				endpoint: null,
				logRequests: false,
			}).subscribe((data: ITestMock): void => {
				expect(data).to.equal(dataSet[1]);
				done();
			});
		});

		it('should create an item and call the add callback to add it to the mock data set', done => {
			let newItem: ITestMock = { id: null, prop: 'item4' };
			let addSpy: Sinon.SinonSpy = sinon.spy((item: ITestMock): void => {
				dataSet.push(item);
			});

			dataServiceBehavior.create({
				domainObject: newItem,
				useMock: true,
				addMockData: addSpy,
				endpoint: null,
				logRequests: false,
			}).subscribe((data: ITestMock): void => {
				expect(data).to.equal(newItem);
				done();
			});

			sinon.assert.calledOnce(addSpy);
			sinon.assert.calledWith(addSpy, newItem);
			expect(dataSet[3]).to.equal(newItem);
		});

		it('should update an item', done => {
			let updatedItem: ITestMock = { id: 2, prop: 'made changes' };
			let updateSpy: Sinon.SinonSpy = sinon.spy((item: ITestMock): void => {
				dataSet[1] = item;
			});

			dataServiceBehavior.update({
				domainObject: updatedItem,
				useMock: true,
				updateMockData: updateSpy,
				endpoint: null,
				logRequests: false,
			}).subscribe((data: ITestMock): void => {
				expect(data).to.equal(updatedItem);
				done();
			});

			sinon.assert.calledOnce(updateSpy);
			sinon.assert.calledWith(updateSpy, updatedItem);
			expect(dataSet[1]).to.equal(updatedItem);
		});

		it('should delete an item', (): void => {
			let removedItem: ITestMock = dataSet[1];
			let removeSpy: Sinon.SinonSpy = sinon.spy((item: ITestMock): void => {
				arrayUtility.remove(dataSet, item);
			});

			dataServiceBehavior.delete({
				domainObject: removedItem,
				useMock: true,
				removeMockData: removeSpy,
				endpoint: null,
				logRequests: false,
			});

			sinon.assert.calledOnce(removeSpy);
			sinon.assert.calledWith(removeSpy, removedItem);
			expect(dataSet).to.have.length(2);
			expect(dataSet[0].id).to.equal(1);
			expect(dataSet[1].id).to.equal(3);
		});
	});
});
