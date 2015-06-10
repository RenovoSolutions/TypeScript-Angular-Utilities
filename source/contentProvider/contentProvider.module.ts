// uses typings/angularjs

export var name: string = 'rl21.services.contentProvider';

import { name as contentProviderName, contentProviderServiceFactory as contentProviderfactory } from './contentProvider.service';
import { name as observableModule } from '../observable/observable.module';

angular.module(name, [observableModule])
	.factory(contentProviderName, contentProviderfactory);
