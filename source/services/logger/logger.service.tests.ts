import { ILogger, Logger } from './logger.service';

describe('logger', () => {
	let logger: ILogger;

	beforeEach(() => {
		logger = new Logger();
	});

	it('should log to the console', (): void => {
		const originalLog = console.log;
		const logSpy: sinon.SinonSpy = sinon.spy();
		console.log = logSpy;

		logger.log('message');
		sinon.assert.calledOnce(logSpy);
		sinon.assert.calledWith(logSpy, 'message');

		console.log = originalLog;
	});
});
