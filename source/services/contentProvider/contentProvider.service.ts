// uses typings/angularjs
// uses typings/jquery
// uses typings/lodash

/// <reference path='../observable/observable.service.ts' />

module rl.utilities.contentProvider {
	'use strict';

	export var moduleName: string = 'rl21.services.contentProvider';
	export var serviceName: string = 'contentProviderFactory';

	export interface IContentProviderService {
		setContent(content: JQuery): void;
		setTranscludeContent(transcludeFunction: angular.ITranscludeFunction): void;
		getContent(selector?: string): JQuery;
		register(action: {(newText: JQuery): void}, selector?: string): observable.IUnregisterFunction;
	}

	class ContentProviderService implements IContentProviderService {
		constructor(observableFactory: observable.IObservableServiceFactory) {
			this.observable = observableFactory.getInstance();
		}

		private observable: observable.IObservableService;
		private content: JQuery;

		setContent(content: JQuery): void {
			this.content = content;
			this.observable.fire('contentChanged');
		}

		setTranscludeContent: {(transcludeFunction: angular.ITranscludeFunction): void} = (transcludeFunction: ng.ITranscludeFunction): void => {
			if (_.isFunction(transcludeFunction)) {
				transcludeFunction((clone: JQuery): void => {
					this.setContent(clone);
				});
			} else {
				this.setContent(null);
			}
		}

		register(action: {(newContent: JQuery): void}, selector?: string): observable.IUnregisterFunction {
			if (this.content != null) {
				action(this.getContent(selector));
			}

			return this.observable.register((): void => {
				action(this.getContent(selector));
			}, 'contentChanged');
		}

		getContent(selector?: string): JQuery {
			if (selector != null) {
				return this.content.filter(selector);
			}

			return this.content;
		}
	}

	export interface IContentProviderServiceFactory {
		getInstance(): IContentProviderService;
	}

	contentProviderServiceFactory.$inject = [observable.serviceName];
	function contentProviderServiceFactory(observableFactory: observable.IObservableServiceFactory): IContentProviderServiceFactory {
		'use strict';

		return {
			getInstance(): IContentProviderService {
				return new ContentProviderService(observableFactory);
			}
		};
	}

	angular.module(moduleName, [observable.moduleName])
		.factory(serviceName, contentProviderServiceFactory);
}
