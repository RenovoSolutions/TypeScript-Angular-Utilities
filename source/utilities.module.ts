import { NgModule, ValueProvider, ErrorHandler } from '@angular/core';
import { RLHttpModule } from 'rl-http';

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
	imports: [RLHttpModule],
	providers: [UTILITY_PROVIDERS, observableFactoryProvider],
})
export class UtilitiesModule { }
