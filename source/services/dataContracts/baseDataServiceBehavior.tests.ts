import { Subject } from 'rxjs';

import { BaseDataServiceBehavior, ISearchResult } from './baseDataServiceBehavior';

import { arrayUtility } from '../array/array.service';
import { IHttpUtility } from '../http/http.service';

import { IMockedPromise, mock, fakeAsync, flushMicrotasks } from '../test/test.module';

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

		it('should make an http request to get a list of data', fakeAsync((): void => {
			const mockList: ITestMock[] = [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 4 },
				{ id: 5 },
			];

			const getStream: Subject<ITestMock[]> = new Subject<ITestMock[]>();;
			const mockGet = sinon.spy(() => getStream);
			mockHttp.get = mockGet;

			dataServiceBehavior.getList({
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				getMockData: null,
				params: null,
			}).then((data: ITestMock[]): void => {
				expect(data).to.have.length(5);
				expect(data[0].id).to.equal(1);
				expect(data[1].id).to.equal(2);
				expect(data[2].id).to.equal(3);
				expect(data[3].id).to.equal(4);
				expect(data[4].id).to.equal(5);
			});

			sinon.assert.calledOnce(mockGet);
			sinon.assert.calledWith(mockGet, testUrl, null);

			getStream.next(mockList);
			getStream.complete();
			flushMicrotasks();
		}));

		it('should make a POST request to search the data', fakeAsync((): void => {
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

			const postStream: Subject<any> = new Subject();
			const mockPost = sinon.spy(() => postStream);
			mockHttp.post = mockPost;

			dataServiceBehavior.search<ISearchResult<ITestMock>>({
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				getMockData: null,
				params: searchObject,
			}).then((result: ISearchResult<ITestMock>): void => {
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

			postStream.next({ dataSet: mockList });
			postStream.complete();
			flushMicrotasks();
		}));

		it('should make an http request to get a domain object', fakeAsync((): void => {
			const id: number = 1;
			const mockItem: ITestMock = { id: id };

			const getStream: Subject<ITestMock> = new Subject<ITestMock>();
			const mockGet = sinon.spy(() => getStream);
			mockHttp.get = mockGet;

			dataServiceBehavior.getItem({
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				getMockData: null,
			}).then((data: ITestMock): void => {
				expect(data).to.deep.equal(mockItem);
			});

			sinon.assert.calledOnce(mockGet);
			sinon.assert.calledWith(mockGet, testUrl);

			getStream.next(mockItem);
			getStream.complete();
			flushMicrotasks();
		}));

		it('should make an http request to create a domain object', fakeAsync((): void => {
			const mockItem: ITestMock = { id: 1 };

			const postStream: Subject<ITestMock> = new Subject<ITestMock>();
			const mockPost = sinon.spy(() => postStream);
			mockHttp.post = mockPost;

			dataServiceBehavior.create({
				domainObject: mockItem,
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				addMockData: null,
			}).then((data: ITestMock): void => {
				expect(data).to.deep.equal(mockItem);
			});

			sinon.assert.calledOnce(mockPost);
			sinon.assert.calledWith(mockPost, testUrl, mockItem);

			postStream.next(mockItem);
			postStream.complete();
			flushMicrotasks();
		}));

		it('should make an http request to save an existing domain object', fakeAsync((): void => {
			const mockItem: ITestMock = { id: 1 };

			const putStream: Subject<ITestMock> = new Subject<ITestMock>();
			const mockPut = sinon.spy(() => putStream);
			mockHttp.put = mockPut;

			dataServiceBehavior.update({
				domainObject: mockItem,
				endpoint: testUrl,
				useMock: false,
				logRequests: false,
				updateMockData: null,
			}).then((data: ITestMock): void => {
				expect(data).to.deep.equal(mockItem);
			});

			sinon.assert.calledOnce(mockPut);
			sinon.assert.calledWith(mockPut, testUrl, mockItem);

			putStream.next(mockItem);
			putStream.complete();
			flushMicrotasks();
		}));

		it('should make an http request to delete an existing domain object', fakeAsync((): void => {
			const mockItem: ITestMock = { id: 1 };

			const deleteStream: Subject<void> = new Subject<void>();
			const mockDelete = sinon.spy(() => deleteStream);
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

			deleteStream.next(null);
			deleteStream.complete();
			flushMicrotasks();
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

		it('should get the mocked data set', (done: MochaDone): void => {
			dataServiceBehavior.getList({
				useMock: true,
				getMockData(): ITestMock[] { return dataSet; },
				endpoint: null,
				logRequests: false,
				params: null,
			}).then((data: ITestMock[]): void => {
				expect(data).to.have.length(3);
				expect(data[0]).to.equal(dataSet[0]);
				expect(data[1]).to.equal(dataSet[1]);
				expect(data[2]).to.equal(dataSet[2]);
				done();
			});
		});

		it('should get the mocked data set wrapped in a dataSet property', (done: MochaDone): void => {
			dataServiceBehavior.search<any>({
				useMock: true,
				getMockData(): ITestMock[] { return dataSet; },
				endpoint: null,
				logRequests: false,
				params: null,
			}).then((result: ISearchResult<ITestMock>): void => {
				let data: ITestMock[] = result.dataSet;
				expect(data).to.have.length(3);
				expect(data[0]).to.equal(dataSet[0]);
				expect(data[1]).to.equal(dataSet[1]);
				expect(data[2]).to.equal(dataSet[2]);
				done();
			});
		});

		it('should get an item from the mocked data set', (done: MochaDone): void => {
			dataServiceBehavior.getItem({
				useMock: true,
				getMockData(): ITestMock { return dataSet[1]; },
				endpoint: null,
				logRequests: false,
			}).then((data: ITestMock): void => {
				expect(data).to.equal(dataSet[1]);
				done();
			});
		});

		it('should create an item and call the add callback to add it to the mock data set', (done: MochaDone): void => {
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
			}).then((data: ITestMock): void => {
				expect(data).to.equal(newItem);
				done();
			});

			sinon.assert.calledOnce(addSpy);
			sinon.assert.calledWith(addSpy, newItem);
			expect(dataSet[3]).to.equal(newItem);
		});

		it('should update an item', (done: MochaDone): void => {
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
			}).then((data: ITestMock): void => {
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
