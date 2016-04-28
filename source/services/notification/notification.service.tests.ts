import {  INotificationService, NotificationService } from './notification.service';


interface IMockWindow {
	alert:  Sinon.SinonSpy;
}

interface IMockLogger {
	log:  Sinon.SinonSpy;
}

describe('notification', () => {
	let notification: INotificationService;
	let mockWindow: IMockWindow;
	let mockLogger: IMockLogger;

	beforeEach(() => {
		mockWindow = {
			alert: sinon.spy(),
		};

		mockLogger = {
			log: sinon.spy(),
		};

		notification = new NotificationService(<any>mockWindow, mockLogger);
	});

	it('should call notifier to show an info notification', (): void => {
		notification.info('message');
		sinon.assert.calledOnce(mockWindow.alert);
		sinon.assert.calledWith(mockWindow.alert, 'message');
		sinon.assert.calledOnce(mockLogger.log);
		sinon.assert.calledWith(mockLogger.log, 'message');
	});

	it('should call notifier to show a warning notification', (): void => {
		notification.warning('message');
		sinon.assert.calledOnce(mockWindow.alert);
		sinon.assert.calledWith(mockWindow.alert, 'message');
		sinon.assert.calledOnce(mockLogger.log);
		sinon.assert.calledWith(mockLogger.log, 'message');
	});

	it('should call notifier to show an error notification', (): void => {
		notification.error('message');
		sinon.assert.calledOnce(mockWindow.alert);
		sinon.assert.calledWith(mockWindow.alert, 'message');
		sinon.assert.calledOnce(mockLogger.log);
		sinon.assert.calledWith(mockLogger.log, 'message');
	});

	it('should call notifier to show a success notification', (): void => {
		notification.success('message');
		sinon.assert.calledOnce(mockWindow.alert);
		sinon.assert.calledWith(mockWindow.alert, 'message');
		sinon.assert.calledOnce(mockLogger.log);
		sinon.assert.calledWith(mockLogger.log, 'message');
	});
});
