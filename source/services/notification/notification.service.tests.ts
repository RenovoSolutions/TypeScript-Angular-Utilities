import { INotificationServiceProvider, INotificationService, INotifier, moduleName, serviceName } from './notification.service';

import { angularFixture } from '../test/angularFixture';

import * as angular from 'angular';
import 'angular-mocks';

interface ITestNotifier extends INotifier {
	info: Sinon.SinonSpy;
	warning: Sinon.SinonSpy;
	error: Sinon.SinonSpy;
	success: Sinon.SinonSpy;
}

describe('notification', () => {
	var notification: INotificationService;
	var testNotifier: ITestNotifier;

	beforeEach(() => {
		testNotifier = {
			info: sinon.spy(),
			warning: sinon.spy(),
			error: sinon.spy(),
			success: sinon.spy(),
		};

		angular.mock.module(moduleName, (notificationProvider: INotificationServiceProvider): void => {
			notificationProvider.setNotifier(testNotifier);
		});

		var services: any = angularFixture.inject(serviceName);
		notification = services[serviceName];
	});

	it('should call notifier to show an info notification', (): void => {
		notification.info('message');
		sinon.assert.calledOnce(testNotifier.info);
	});

	it('should call notifier to show a warning notification', (): void => {
		notification.warning('message');
		sinon.assert.calledOnce(testNotifier.warning);
	});

	it('should call notifier to show an error notification', (): void => {
		notification.error('message');
		sinon.assert.calledOnce(testNotifier.error);
	});

	it('should call notifier to show a success notification', (): void => {
		notification.success('message');
		sinon.assert.calledOnce(testNotifier.success);
	});
});
