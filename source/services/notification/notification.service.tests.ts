import {  INotificationService, NotificationService } from './notification.service';


interface IMockWindow {
	alert:  Sinon.SinonSpy;
}
describe('notification', () => {
	let notification: INotificationService;
	let mockWindow: IMockWindow;

	beforeEach(() => {
		mockWindow = {
			alert: sinon.spy(),
		};

		notification = new NotificationService(<any>mockWindow);
	});

	it('should call notifier to show an info notification', (): void => {
		notification.info('message');
		sinon.assert.calledOnce(mockWindow.alert);
	});

	it('should call notifier to show a warning notification', (): void => {
		notification.warning('message');
		sinon.assert.calledOnce(mockWindow.alert);
	});

	it('should call notifier to show an error notification', (): void => {
		notification.error('message');
		sinon.assert.calledOnce(mockWindow.alert);
	});

	it('should call notifier to show a success notification', (): void => {
		notification.success('message');
		sinon.assert.calledOnce(mockWindow.alert);
	});
});
