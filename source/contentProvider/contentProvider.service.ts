// uses typings/jquery
// uses typings/angular
// uses typings/lodash

'use strict';

import * as __observable from '../observable/observable.service';

export var name: string = 'contentProviderFactory';

export interface IContentProviderService {
	setContent(content: JQuery): void;
	setTranscludeContent(transcludeFunction: angular.ITranscludeFunction): void;
	getContent(selector?: string): JQuery;
	register(action: {(newText: JQuery): void}, selector?: string): __observable.IUnregisterFunction;
}

export class ContentProviderService implements IContentProviderService {
	constructor(observableFactory: __observable.IObservableServiceFactory) {
		this.observable = observableFactory.getInstance();
	}

	private observable: __observable.IObservableService;
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

	register(action: {(newContent: JQuery): void}, selector?: string): __observable.IUnregisterFunction {
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

contentProviderServiceFactory.$inject = [__observable.name];
export function contentProviderServiceFactory(observableFactory: __observable.IObservableServiceFactory): IContentProviderServiceFactory {
	'use strict';

	return {
		getInstance(): IContentProviderService {
			return new ContentProviderService(observableFactory);
		}
	};
}
