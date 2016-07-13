import { ResourceBuilder } from './resourceBuilder/resourceBuilder.service';
import { DataServiceFactory } from './dataService/data.service';
import { SingletonDataServiceFactory } from './singletonDataService/singletonData.service';

import * as converters from './converters/converters';
import * as mocks from './contractLibrary/dataServiceMocks';

export * from './contractLibrary/contractLibrary';
export * from './dataService/data.service';
export * from './dataService/view/dataServiceView';
export * from './dataService/parent/parentData.service';
export * from './singletonDataService/singletonData.service';
export * from './singletonDataService/parent/parentSingletonData.service';
export * from './resourceBuilder/resourceBuilder.service';
export { converters, mocks };

export const DATA_CONTRACT_PROVIDERS: any[] = [
	ResourceBuilder,
	DataServiceFactory,
	SingletonDataServiceFactory,
];
