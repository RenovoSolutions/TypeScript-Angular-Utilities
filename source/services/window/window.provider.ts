import { Injectable, Inject, Provider, OpaqueToken } from '@angular/core';

export const windowToken: OpaqueToken = new OpaqueToken('The browser window');

export const WINDOW_PROVIDER: Provider = new Provider(windowToken, {
	useValue: window,
});
