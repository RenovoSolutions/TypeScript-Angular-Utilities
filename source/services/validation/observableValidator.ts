import { Observable } from 'rxjs';
import { map, find, isFunction, values } from 'lodash';

import { IUnregisterFunction, IObservableValidator, IObservableValidationHandler } from './validationTypes';

export class ObservableValidator implements IObservableValidator {
	private validationHandlers: { [index: string]: IObservableValidationHandler } = {};
	private nextKey: number = 0;

	validate(value$?: Observable<any>): Observable<string> {
		if (!values(this.validationHandlers).length) {
			return Observable.of(null);
		}

		return Observable.combineLatest(map(this.validationHandlers, handler => this.getValidationResult(handler, value$)))
						 .map(results => find(results, x => x != null));
	}

	registerValidationHandler(handler: IObservableValidationHandler): IUnregisterFunction {
		var currentKey: number = this.nextKey;
		this.nextKey++;
		this.validationHandlers[currentKey] = handler;

		return (): void => {
			this.unregister(currentKey);
		};
	}

	private unregister(key: number): void {
		delete this.validationHandlers[key];
	}

	private isActive(handler: IObservableValidationHandler): Observable<boolean> {
		return (isFunction(handler.isActive) && (<{(): Observable<boolean>}>handler.isActive)())
			|| Observable.of(handler.isActive == null)
			|| Observable.of(handler.isActive === true);
	}

	private getValidationResult(handler: IObservableValidationHandler, value$: Observable<any>): Observable<string> {
		return this.isActive(handler)
				   .switchMap(active => active ? handler.validate(value$) : Observable.of(null));
	}
}
