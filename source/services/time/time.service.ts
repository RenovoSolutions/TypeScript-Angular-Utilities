'use strict';

import * as angular from 'angular';
import * as moment from 'moment';

import { CompareResult } from '../../types/compareResult';
import { defaultFormats } from '../date/date.module';

export var moduleName: string = 'rl.utilities.services.time';
export var serviceName: string = 'timeUtility';

export interface ITimeUtility {
	compareTimes(time1: string, time2: string): CompareResult;
}

export class TimeUtility {
	compareTimes(time1: string, time2: string): CompareResult {
		let format: string = defaultFormats.timeFormat;

		let start: moment.Moment = moment(time1, format);
		let end: moment.Moment = moment(time2, format);

		if (start.hours() == end.hours()
			&& start.minutes() == end.minutes()) {
			return CompareResult.equal;
		} else if (start.hours() >= end.hours()
				&& start.minutes() >= end.minutes()) {
			return CompareResult.greater;
		} else {
			return CompareResult.less;
		}
	}
}

export let timeUtility: ITimeUtility = new TimeUtility();

angular.module(moduleName, [])
	.service(serviceName, TimeUtility);
