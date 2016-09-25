import { NgModule, ValueProvider, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

import { observableToken, ObservableService, IObservableService } from './services/observable/observable.service';
import { UTILITY_PROVIDERS } from './services/index';

const observableFactoryProvider: ValueProvider = {
	provide: observableToken,
	useValue: {
		deps: [ErrorHandler],
		getInstance: (errorHandler: ErrorHandler): IObservableService => new ObservableService(errorHandler),
	},
};

@NgModule({
	imports: [HttpModule],
	providers: [UTILITY_PROVIDERS, observableFactoryProvider],
})
export class UtilitiesModule { }
