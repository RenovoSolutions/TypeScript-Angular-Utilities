import { Injector, ReflectiveInjector } from '@angular/core';
import { loggerToken, LOGGER_PROVIDER, ILogger } from './logger.service';

describe('logger', () => {
	let logger: ILogger;

	beforeEach(() => {
		const injector: Injector = ReflectiveInjector.resolveAndCreate([LOGGER_PROVIDER]);

		logger = injector.get(loggerToken);
	});

	it('should log to the console', (): void => {
		const originalLog = console.log;
		const logSpy: Sinon.SinonSpy = sinon.spy();
		console.log = logSpy;

		logger.log('message');
		sinon.assert.calledOnce(logSpy);
		sinon.assert.calledWith(logSpy, 'message');

		console.log = originalLog;
	});
});
