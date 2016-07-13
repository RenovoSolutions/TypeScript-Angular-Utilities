import { Provider } from '@angular/core';

export abstract class WindowWrapper { }

export const WINDOW_PROVIDER: Provider = new Provider(WindowWrapper, {
	useValue: window,
});
