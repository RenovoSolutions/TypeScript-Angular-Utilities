'use strict';

export interface INotifier {
	info(message: string): void;
	warning(message: string): void;
	error(message: string): void;
	success(message: string): void;
}