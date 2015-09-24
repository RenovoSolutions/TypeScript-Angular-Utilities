'use strict';

import * as ng from 'angular';

export var moduleName: string = 'rl.utilities.services.autosaveAction';
export var serviceName: string = 'autosaveAction';

export interface IAutosaveActionService {
	trigger(promise: ng.IPromise<any>): void;
	saving: boolean;
	complete: boolean;
	successful: boolean;
}

class AutosaveActionService implements IAutosaveActionService {
	static $inject: string[] = ['$timeout'];
	constructor(private $timeout: ng.ITimeoutService) {}

	private completeMessageDuration: number = 1000;

	private _saving: boolean;
	private _complete: boolean;
	private _successful: boolean;

	get saving(): boolean {
		return this._saving;
	}

	get complete(): boolean {
		return this._complete;
	}

	get successful(): boolean {
		return this._successful;
	}

	trigger(promise: ng.IPromise<any>): any {
		this._saving = true;
		return promise.then(this.autosaveSuccessful)
					.catch(this.autosaveFailed);
	}

	private autosaveSuccessful: { (data: any): any } = (data: any): any => {
		return this.resolveAutosave(data, true);
	}

	private autosaveFailed: { (data: any): any } = (data: any): any => {
		return this.resolveAutosave(data, false);
	}

	private resolveAutosave: { (data: any, success: boolean): any } = (data: any, success: boolean): any => {
		this._saving = false;
		this._complete = true;
		this._successful = success;

		this.$timeout((): void => {
			this._complete = false;
		}, this.completeMessageDuration);

		return data;
	}
}

ng.module(moduleName, [])
	.service(serviceName, AutosaveActionService);
