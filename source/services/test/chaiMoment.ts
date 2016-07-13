import * as moment from 'moment';
import * as Chai from 'chai';

import { defaultFormats } from '../date/dateTimeFormatStrings';

let chai: Chai.ChaiStatic = (<any>window).chai;

if (chai) {
	chai.Assertion.addMethod('sameMoment', equalMoment);
	chai.Assertion.addMethod('equalMoment', equalMoment);

	chai.Assertion.addMethod('beforeMoment', function(expected, granularity) {
		var obj = this._obj
		var objMoment = moment(obj)
		var expectedMoment = moment(expected)
		this.assert(
			objMoment.isBefore(expectedMoment, granularity)
			, 'expected ' + objMoment.format(defaultFormats.dateTimeFormat + ' z') + ' to be before ' + expectedMoment.format(defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : '')
			, 'expected ' + objMoment.format(defaultFormats.dateTimeFormat + ' z') + ' not to be before ' + expectedMoment.format(defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : '')
			, expected
			, obj
			, true
		)
	});

	chai.Assertion.addMethod('afterMoment', function(expected, granularity) {
		var obj = this._obj
		var objMoment = moment(obj)
		var expectedMoment = moment(expected)
		this.assert(
			objMoment.isAfter(expectedMoment, granularity)
			, 'expected ' + objMoment.format(defaultFormats.dateTimeFormat + ' z') + ' to be after ' + expectedMoment.format(defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : '')
			, 'expected ' + objMoment.format(defaultFormats.dateTimeFormat + ' z') + ' not to be after ' + expectedMoment.format(defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : '')
			, expected
			, obj
			, true
		)
	});
}

function equalMoment(expected, granularity) {
	var obj = this._obj
	var objMoment = moment(obj)
	var expectedMoment = moment(expected)
	this.assert(
		objMoment.isSame(expectedMoment, granularity)
		, 'expected ' + objMoment.format(defaultFormats.dateTimeFormat + ' z') + ' not to be the same as ' + expectedMoment.format(defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : '')
		, 'expected ' + objMoment.format(defaultFormats.dateTimeFormat + ' z') + ' to be the same as ' + expectedMoment.format(defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : '')
		, expected
		, obj
		, true
	)
}