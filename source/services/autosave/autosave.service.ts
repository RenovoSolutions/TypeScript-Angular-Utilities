'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import {
	moduleName as autosaveActionModuleName,
	serviceName as autosaveActionServiceName,
	IAutosaveActionService,
} from '../autosaveAction/autosaveAction.service';

export var moduleName: string = 'rl.utilities.services.autosave';
export var factoryName: string = 'autosaveFactory';

export interface IAutosaveService {
	autosave(...data: any[]): boolean;
	contentForm: angular.IFormController;
	setChangeListener?: { (callback: {(): void}): IClearChangeListener };
}

export interface IAutosaveServiceOptions {
	save: { (...data: any[]): angular.IPromise<void> };
	validate?: { (): boolean };
	contentForm?: angular.IFormController;
	debounceDuration?: number;
	setChangeListener?: { (callback: IChangeListener): IClearChangeListener };
	triggers?: string;
}

export interface IChangeListener {
	(): void;
}

export interface IClearChangeListener {
	(): void;
}

class AutosaveService implements IAutosaveService {
	private hasValidator: boolean;
	private debounceDuration: number = 1000;
	private timer: angular.IPromise<void>;
	setChangeListener: { (callback: IChangeListener): IClearChangeListener };
	clearChangeListener: IClearChangeListener;
	contentForm: angular.IFormController;
	save: { (...data: any[]): angular.IPromise<void> };
	validate: { (): boolean };

	constructor($rootScope: angular.IRootScopeService
			, private $timeout: angular.ITimeoutService
			, private autosaveService: IAutosaveActionService
			, options: IAutosaveServiceOptions) {
		this.hasValidator = options.validate != null;

		this.contentForm = options.contentForm || this.nullForm();
		this.save = options.save;
		this.validate = options.validate;

		this.initChangeListeners(options);

		$rootScope.$watch((): boolean => { return this.contentForm.$dirty; }, (value: boolean) => {
			if (value) {
				this.setTimer();

				this.clearChangeListener = this.setChangeListener((): void => {
					$timeout.cancel(this.timer);
					this.setTimer();
				});
			}
		});
	}

	autosave: { (...data: any[]): boolean } = (...data: any[]): boolean => {
		if (this.contentForm.$pristine) {
			return true;
		}

		var valid: boolean = true;
		if (this.hasValidator) {
			valid = this.validate();
			if (valid === undefined) {
				valid = true;
			}
		}

		if (valid) {
			var promise: angular.IPromise<void> = this.save(...data);

			if (!_.isUndefined(promise)) {
				this.autosaveService.trigger(promise.then((): void => {
					if (this.contentForm != null) {
						this.contentForm.$setPristine();
					}
				}));
			}

			return true;
		} else {
			return false;
		}
	}

	private initTriggers(triggers: string): void {
		let triggerList: string[] = triggers.split(' ');
	}

	private setTimer(): void {
		this.timer = this.$timeout((): void => {
			this.clearChangeListener();
			this.autosave();
		}, this.debounceDuration);
	}

	private nullForm(): angular.IFormController {
		return <any>{
			$pristine: false,
			$dirty: true,
			$setPristine(): void {
				return;
			},
		};
	}

	private initChangeListeners(options: IAutosaveServiceOptions): void {
		this.setChangeListener = options.setChangeListener || this.nullSetListener;
		this.clearChangeListener = this.nullClearListener;
	}

	private nullSetListener(): IClearChangeListener {
		console.log('No change listener available');
		return this.nullClearListener;
	}

	private nullClearListener(): void {
		console.log('No change listener register');
	}
}

export interface IAutosaveServiceFactory {
	getInstance(options: IAutosaveServiceOptions): IAutosaveService;
}

autosaveServiceFactory.$inject = ['$rootScope', '$timeout', autosaveActionServiceName];
function autosaveServiceFactory($rootScope: angular.IRootScopeService
							, $timeout: angular.ITimeoutService
							, autosaveService: IAutosaveActionService): IAutosaveServiceFactory {
	'use strict';
	return {
		getInstance(options: IAutosaveServiceOptions): IAutosaveService {
			return new AutosaveService($rootScope, $timeout, autosaveService, options);
		}
	};
}

angular.module(moduleName, [autosaveActionModuleName])
	.factory(factoryName, autosaveServiceFactory);
