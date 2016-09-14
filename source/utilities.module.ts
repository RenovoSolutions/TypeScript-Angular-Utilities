import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { UTILITY_PROVIDERS } from './services/index';

@NgModule({
	imports: [HttpModule],
	providers: [UTILITY_PROVIDERS],
})
export class UtilitiesModule { }
