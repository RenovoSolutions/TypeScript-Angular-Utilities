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
}

class AutosaveService implements IAutosaveService {
	private hasValidator: boolean;

	constructor(private autosaveService: IAutosaveActionService
			, private save: {(...data: any[]): angular.IPromise<void>}
			, public contentForm?: angular.IFormController
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

	private nullForm(): angular.IFormController {
		return <any>{
			$pristine: false,
			$setPristine(): void {
				return;
			},
		};
	}
}

export interface IAutosaveServiceFactory {
	getInstance(save: {(): angular.IPromise<void>}, contentForm?: angular.IFormController, validate?: {(): boolean}): IAutosaveService;
}

autosaveServiceFactory.$inject = [autosaveActionServiceName];
function autosaveServiceFactory(autosaveService: IAutosaveActionService): IAutosaveServiceFactory {
	'use strict';
	return {
		getInstance(save: { (): angular.IPromise<void> }, contentForm?: angular.IFormController, validate?: { (): boolean }): IAutosaveService {
			return new AutosaveService(autosaveService, save, contentForm, validate);
		}
	};
}

angular.module(moduleName, [autosaveActionModuleName])
	.factory(factoryName, autosaveServiceFactory);
