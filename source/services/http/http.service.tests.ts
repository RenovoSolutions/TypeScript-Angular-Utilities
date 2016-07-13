import { Subject } from 'rxjs';

import { objectUtility } from '../object/object.service';
import { HttpUtility } from './http.service';

interface IMockHttp {
	get: Sinon.SinonSpy;
	post: Sinon.SinonSpy;
	put: Sinon.SinonSpy;
	delete: Sinon.SinonSpy;
}

interface IMockInterceptor {
	handleSuccess: Sinon.SinonSpy;
	handleError: Sinon.SinonSpy;
}

describe('HttpUtility', (): void => {
	let http: HttpUtility;
	let mockHttpImplementation: IMockHttp;
	let interceptor: IMockInterceptor;

	beforeEach((): void => {
		mockHttpImplementation = {
			get: sinon.spy(() => new Subject()),
			post: sinon.spy(() => new Subject()),
			put: sinon.spy(() => new Subject()),
			delete: sinon.spy(() => new Subject()),
		};

		interceptor = {
			handleSuccess: sinon.spy(value => value),
			handleError: sinon.spy(error => error),
		};

		http = new HttpUtility(<any>mockHttpImplementation, objectUtility, interceptor);
	});

	it('should default to an empty string for null or undefined parameters', (): void => {
		const params: any = {
			nullParam: null,
			undefinedParam: undefined,
		};

		http.get('/test', params);

		sinon.assert.calledOnce(mockHttpImplementation.get);
		const args: any = mockHttpImplementation.get.firstCall.args;
		expect(args[0]).to.equal('/test');
		expect(args[1].search.toString()).to.equal('nullParam=&undefinedParam=');
	});

	it('should parse the response from json', (): void => {
		const putStream: Subject<any> = new Subject();
		const response: any = {
			_body: 'content',
			json: sinon.spy(),
		};
		mockHttpImplementation.put = sinon.spy(() => putStream);

		http.put('/test', {}).subscribe();
		putStream.next(response);

		sinon.assert.calledOnce(response.json);
	});

	it('should not try to parse if the response is empty', (): void => {
		const putStream: Subject<any> = new Subject();
		const response: any = {
			_body: '',
			json: sinon.spy(),
		};
		mockHttpImplementation.put = sinon.spy(() => putStream);

		http.put('/test', {}).subscribe();
		putStream.next(response);

		sinon.assert.notCalled(response.json);
	});
});