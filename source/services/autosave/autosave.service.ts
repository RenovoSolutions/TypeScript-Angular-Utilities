// uses typings/angular

/// <reference path='../autosaveAction/autosaveAction.service.ts' />

module rl.utilities.services.autosave {
	'use strict';

	import __autosaveAction = rl.utilities.services.autosaveAction;

	export var moduleName: string = 'rl.utilities.services.autosave';
	export var factoryName: string = 'autosaveFactory';

	export interface IAutosaveService {
		autosave(...data: any[]): boolean;
		contentForm: ng.IFormController;
	}

	class AutosaveService implements IAutosaveService {
		private hasValidator: boolean;

		constructor(private autosaveService: __autosaveAction.IAutosaveActionService
				, private save: {(...data: any[]): ng.IPromise<void>}
				, public contentForm?: ng.IFormController
				, private validate?: {(): boolean}) {
			this.hasValidator = validate != null;

			if (this.contentForm == null) {
				this.contentForm = this.nullForm();
			}
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
				this.autosaveService.trigger(this.save(...data).then((): void => {
					if (this.contentForm != null) {
						this.contentForm.$setPristine();
					}
				}));
				return true;
			} else {
				return false;
			}
		}

		private nullForm(): ng.IFormController {
			return <any>{
				$pristine: false,
				$setPristine(): void {
					return;
				},
			};
		}
	}

	export interface IAutosaveServiceFactory {
		getInstance(save: {(): ng.IPromise<void>}, contentForm?: ng.IFormController, validate?: {(): boolean}): IAutosaveService;
	}

	autosaveServiceFactory.$inject = [__autosaveAction.serviceName];
	function autosaveServiceFactory(autosaveService: __autosaveAction.IAutosaveActionService): IAutosaveServiceFactory {
		'use strict';
		return {
			getInstance(save: { (): ng.IPromise<void> }, contentForm?: ng.IFormController, validate?: { (): boolean }): IAutosaveService {
				return new AutosaveService(autosaveService, save, contentForm, validate);
			}
		};
	}

	angular.module(moduleName, [__autosaveAction.moduleName])
		.factory(factoryName, autosaveServiceFactory);
}
