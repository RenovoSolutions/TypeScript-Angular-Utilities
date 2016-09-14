import { NgModule } from '@angular/core';

import { stopEventPropagation } from './behaviors/index';
import { isEmpty, truncate } from './filters/index';

@NgModule({
	declarations: [
		stopEventPropagation.StopEventPropagation,
		isEmpty.IsEmptyPipe,
		truncate.TruncatePipe,
	],
	exports: [
		stopEventPropagation.StopEventPropagation,
		isEmpty.IsEmptyPipe,
		truncate.TruncatePipe,
	],
})
export class SharedModule { }
