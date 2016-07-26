import { RedirectService, IRedirectService } from './redirect.service';

interface IMockWindow {
	location: {
		pathname: string;
		search: string;
	};
	open: Sinon.SinonSpy;
	focus: Sinon.SinonSpy;
	history: { back: Sinon.SinonSpy };
}

describe('RedirectService', () => {
	let redirectService: IRedirectService;
	let mockWindow: IMockWindow;

	beforeEach(() => {
		mockWindow = {
			location: null,
			open: sinon.spy(() => mockWindow),
			focus: sinon.spy(),
			history: { back: sinon.spy() },
		};

		redirectService = new RedirectService(<any>mockWindow);
	});

	describe('getCurrentLocationAsParam', () => {
		it('should get location as a query string', () => {
			mockWindow.location = {
				pathname: '/path',
				search: '?search=true&Die=angularUno'
			};

			const locationAsParam: string = redirectService.getCurrentLocationAsParam();

			expect(locationAsParam).to.equal('%2Fpath%3Fsearch%3Dtrue%26Die%3DangularUno');
		});

		it('should get location without query string', () => {
			mockWindow.location = {
				pathname: '/path',
				search: null,
			};

			const locationAsParam: string = redirectService.getCurrentLocationAsParam();

			expect(locationAsParam).to.equal('%2Fpath');
		});
	});

	describe('to', () => {
		it('should redirect to the specified target', () => {
			redirectService.to('/some/path');

			sinon.assert.calledOnce(mockWindow.open);
			sinon.assert.calledWith(mockWindow.open, '/some/path', '_self');
		});

		it('should redirect to the specified target in new window', () => {
			redirectService.to('/some/path', true);

			sinon.assert.calledOnce(mockWindow.open);
			sinon.assert.calledWith(mockWindow.open, '/some/path', '_blank');

			sinon.assert.calledOnce(mockWindow.focus);
		});
	});

	describe('back', () => {
		it('should trigger back on the window history', () => {
			redirectService.back();
			sinon.assert.calledOnce(mockWindow.history.back);
		});
	});
});
