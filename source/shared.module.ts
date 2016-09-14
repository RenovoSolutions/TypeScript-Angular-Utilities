import { NgModule } from '@angular/core';

import { stopEventPropagation } from './behaviors/index';

@NgModule({
	declarations: [
		stopEventPropagation.StopEventPropagation,
	],
	exports: [
		stopEventPropagation.StopEventPropagation,
	],
})
export class SharedModule { }
