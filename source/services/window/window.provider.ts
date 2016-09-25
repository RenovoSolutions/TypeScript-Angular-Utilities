import { ValueProvider } from '@angular/core';

export abstract class WindowWrapper { }

export const WINDOW_PROVIDER: ValueProvider = {
	provide: WindowWrapper,
	useValue: window,
};
