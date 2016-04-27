import { Injectable, Inject, Provider, OpaqueToken } from 'angular2/core';

export interface IRedirectService {
	getCurrentLocationAsParam(): string;
	to(target: string, newTab?: boolean): void;
}

export const windowToken: OpaqueToken = new OpaqueToken('The browser window');

export const WINDOW_PROVIDER: Provider = new Provider(windowToken, {
	useValue: window,
});

// This sevice implementation is browser specific and will NOT work for server side rendering!!!!

@Injectable()
export class RedirectService implements IRedirectService {
	private window: Window;

	constructor(@Inject(windowToken) window: Window) {
		this.window = window;
	}

	getCurrentLocationAsParam(): string {
		const baseUrl: string = this.window.location.pathname;
		const queryString: string = this.window.location.search || '';
		return encodeURIComponent(baseUrl + queryString);
	}

	to(target: string, newTab?: boolean): void {
		if (!newTab) {
			this.window.open(target);
		} else {
			const win: Window = this.window.open(target, '_blank');
			win.focus();
		}
	}
}

export const redirectToken: OpaqueToken = new OpaqueToken('A service for redirecting to a new page');

export const REDIRECT_PROVIDER: Provider = new Provider(redirectToken, {
	useClass: RedirectService,
});
