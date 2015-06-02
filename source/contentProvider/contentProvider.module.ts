export var name: string = 'rl21.services.contentProvider';

import contentProvider = require('./contentProvider.service');
import observable = require('../observable/observable.module');

angular.module(name, [observable.name])
	.factory('contentProviderFactory', contentProvider.contentProviderServiceFactory);
