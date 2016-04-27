import { RedirectService, IRedirectService } from './redirect.service';

interface IMockWindow {
	location: {
		pathname: string;
		search: string;
	};
	open: Function;
	focus: Function;
}

describe('RedirectService', () => {
	let redirectService: IRedirectService;
	let mockWindow: any;

	beforeEach(() => {
		mockWindow = {
			location: null,
			open: sinon.spy(() => mockWindow),
			focus: sinon.spy(),
		};

		redirectService = new RedirectService(mockWindow);
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
			sinon.assert.calledWith(mockWindow.open, '/some/path');
		});

		it('should redirect to the specified target in new window', () => {
			redirectService.to('/some/path', true);

			sinon.assert.calledOnce(mockWindow.open);
			sinon.assert.calledWith(mockWindow.open, '/some/path', '_blank');

			sinon.assert.calledOnce(mockWindow.focus);
		});
	});
});
