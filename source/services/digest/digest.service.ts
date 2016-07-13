import { Injectable } from '@angular/core';
import * as angular from 'angular';

export interface IDigestService {
	runDigestCycle(): void;
}

@Injectable()
export class DigestService implements IDigestService {
	private $applyAsync: Function = null;

	/*
	*  TODO: Remove when ng1 is dead
	*/
	runDigestCycle(): void {
		if (this.$applyAsync == null) {
			let elem: ng.IAugmentedJQuery = angular.element($(".ng-scope"));
			let scope: ng.IScope = elem && elem.scope();

			this.$applyAsync = scope && scope.$root && scope.$root.$applyAsync;

			if (this.$applyAsync == null) {
				console.error('Scope not found!')
				return;
			}
		}
		this.$applyAsync();
	}
}