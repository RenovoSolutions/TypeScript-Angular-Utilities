'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import {
	moduleName as observableModuleName,
	serviceName as observableServiceName,
	IUregisterFunction,
	IObservableService,
	IObservableServiceFactory,
} from '../observable/observable.service';

export var moduleName: string = 'rl.utilities.services.contentProvider';
export var serviceName: string = 'contentProviderFactory';

export interface IContentProviderService {
	setContent(content: ng.IAugmentedJQuery): void;
	setTranscludeContent(transcludeFunction: ng.ITranscludeFunction): void;
	getContent(selector?: string): ng.IAugmentedJQuery;
	register(action: {(newText: ng.IAugmentedJQuery): void}, selector?: string): IUnregisterFunction;
}

class ContentProviderService implements IContentProviderService {
	constructor(observableFactory: IObservableServiceFactory) {
		this.observable = observableFactory.getInstance();
	}

	private observable: IObservableService;
	private content: ng.IAugmentedJQuery;

	setContent(content: ng.IAugmentedJQuery): void {
		this.content = content;
		this.observable.fire('contentChanged');
	}

	setTranscludeContent: {(transcludeFunction: ng.ITranscludeFunction): void} = (transcludeFunction: ng.ITranscludeFunction): void => {
		if (_.isFunction(transcludeFunction)) {
			transcludeFunction((clone: ng.IAugmentedJQuery): void => {
				this.setContent(clone);
			});
		} else {
			this.setContent(null);
		}
	}

	register(action: {(newContent: ng.IAugmentedJQuery): void}, selector?: string): IUnregisterFunction {
		if (this.content != null) {
			action(this.getContent(selector));
		}

		return this.observable.register((): void => {
			action(this.getContent(selector));
		}, 'contentChanged');
	}

	getContent(selector?: string): ng.IAugmentedJQuery {
		if (selector != null) {
			return this.content.filter(selector);
		}

		return this.content;
	}
}

export interface IContentProviderServiceFactory {
	getInstance(): IContentProviderService;
}

contentProviderServiceFactory.$inject = [observableFactoryName];
function contentProviderServiceFactory(observableFactory: IObservableServiceFactory): IContentProviderServiceFactory {
	'use strict';

	return {
		getInstance(): IContentProviderService {
			return new ContentProviderService(observableFactory);
		}
	};
}

ng.module(moduleName, [observableModuleName])
	.factory(serviceName, contentProviderServiceFactory);
