import { Injectable } from '@angular/core';
import { WindowWrapper } from '../window/window.provider';

export interface IRedirectService {
	getCurrentLocationAsParam(): string;
	to(target: string, newTab?: boolean): void;
}


// This sevice implementation is browser specific and will NOT work for server side rendering!!!!

@Injectable()
export class RedirectService implements IRedirectService {
	private window: Window;

	constructor(window: WindowWrapper) {
		this.window = <any>window;
	}

	getCurrentLocationAsParam(): string {
		const baseUrl: string = this.window.location.pathname;
		const queryString: string = this.window.location.search || '';
		return encodeURIComponent(baseUrl + queryString);
	}

	to(target: string, newTab?: boolean): void {
		if (!newTab) {
			this.window.open(target, '_self');
		} else {
			const win: Window = this.window.open(target, '_blank');
			win.focus();
		}
	}
}
