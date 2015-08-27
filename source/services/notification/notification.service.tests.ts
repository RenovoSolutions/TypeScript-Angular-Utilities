/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='notification.service.ts' />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.notification {
	'use strict';

	import __test = rl.utilities.services.test;

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
			angular.mock.module(moduleName);

			testNotifier = {
				info: sinon.spy(),
				warning: sinon.spy(),
				error: sinon.spy(),
				success: sinon.spy(),
			};

			var services: any = __test.angularFixture.inject(serviceName + 'Provider');
			var notificationProvider: INotificationServiceProvider = services[serviceName + 'Provider'];
			notificationProvider.setNotifier(testNotifier);
			notification = notificationProvider.$get();
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
}
